import {
  Row, Checkbox, Button, Carousel, Image, message, Col
} from 'antd';
import { PureComponent } from 'react';
import { giftService } from '@services/index';
import './index.less';
import { tokenTransctionService, performerService } from 'src/services';
import { IPerformer } from '@interfaces/performer';
import { connect } from 'react-redux';
import { updateBalance } from '@redux/user/actions';
import { ROLE_PERMISSIONS } from 'src/constants';

interface IProps {
  performerId: string
  conversationId: string
  saveFavorite: Function
  favorGift: any
  currentUser: IPerformer
  updateBalance: Function;
  sessionId:string
  sessionEarningId: string;
  streamType : string

}
class GiftPage extends PureComponent<IProps> {
  state = {
    loading: false,
    list: [] as any,
    token: 0,
    giftFavorite: {} as any,
    isConfirm: true,
    isSave: false,
    giftID: '',
    selectedId: null,
    hasRole: false,
    filter: {
      sortBy: 'tokens',
      sort: 'asc'
    }

  };

  async componentDidMount() {
    this.checkRole();
    this.search();
  }

  checkRole= async () => {
    try {
      const resp = await performerService.checkRole(ROLE_PERMISSIONS.ROLE_FAN_PAYING);
      this.setState({ hasRole: resp.data });
    } catch (e) {
      const error = await e;
      message.error(error.message || 'Something went wrong, please try again later');
    }
  }

  handleSendGift = async (giftId: string) => {
    const {
      conversationId, performerId, saveFavorite, sessionId, sessionEarningId, streamType
    } = this.props;
    const { giftFavorite, isConfirm } = this.state;
    const { updateBalance: dispatchUpdateBalance } = this.props;
    if (isConfirm) {
      try {
        await tokenTransctionService.sendGift(performerId, {
          giftId, conversationId, streamType, sessionId, sessionEarningId
        });
        message.success('Send gift success');
        dispatchUpdateBalance({
          token: giftFavorite.tokens * -1,
          type: 'ruby-balance'
        });
        if (giftFavorite._id) {
          saveFavorite(giftFavorite);
        }
      } catch (e) {
        const error = await e;
        error.message[0] === 'giftId should not be empty' ? message.error('Please select a gift') : message.error(error.message);
      }
    } else {
      message.error('Please confirm before send gift !! ');
    }
  }

  cbChange = () => {
    const { isConfirm } = this.state;
    this.setState({
      isConfirm: !isConfirm
    });
  }

  saveAsFavorite = () => {
    const { isSave, giftFavorite } = this.state;

    const { saveFavorite } = this.props;
    this.setState({
      isSave: !isSave

    });
    if (!isSave) { saveFavorite(giftFavorite); }
  }

  async search() {
    const { filter } = this.state;
    const { favorGift } = this.props;

    try {
      const resp = await giftService.search({ ...filter });
      this.setState({
        list: resp.data.data
      });
      favorGift && this.setState({
        token: favorGift.tokens,
        giftID: favorGift._id,

        isSave: false,
        selectedId: favorGift._id
      });
    } catch (e) {
      const error = await e;
      message.error(error.message || 'Something went wrong, please try again later');
    }
  }

  render() {
    const {
      list, loading, token, isConfirm, giftID, selectedId, hasRole
    } = this.state;
    const settings = {
      dots: true,
      speed: 400,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true
    };

    return (
      <div className="giftbox">
        <Carousel infinite={false} {...settings}>
          {!loading && list.length > 0 && list.map((g) => (
            <div>
              <Image
                key={g._id}
                preview={false}
                src={`${g?.image.url || '/static/gem.png'}`}
                fallback="/static/gem.png"
                className={selectedId === g._id ? 'imgCarousel active' : 'imgCarousel'}
                onClick={() => this.setState({
                  token: g.tokens,
                  giftID: g._id,
                  giftFavorite: g,
                  isSave: false,
                  selectedId: g._id
                })}
              />
              <div>
                <div className="tokenCarousel">{g?.tokens}</div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="flex justify-between items-center bg-[#F7F7F7] p-5">
          <div className=''>
            <Checkbox
              className='flex items-center'
              defaultChecked={isConfirm}
              onChange={this.cbChange}
            >
              <p className='mt-1'>Confirm purchase</p>
            </Checkbox>
            {hasRole && (
              <div className="token">
                <p>{token || 0}</p>
                <Image preview={false} src="/static/gem.png" className="iconDiamond" />
              </div>
            )}
          </div>
          <div>
            <Button className="text-black p-5 pt-2 pb-2 w-32 flex items-center justify-center rounded-full" onClick={() => this.handleSendGift(giftID)}>
              Send gift
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchs = {

  updateBalance
};

export default connect(null, mapDispatchs)(GiftPage);
