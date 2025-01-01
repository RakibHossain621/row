/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Layout, Row, Checkbox, message, Image
} from 'antd';
import { PureComponent } from 'react';
import { tokenTransctionService } from 'src/services';
import { connect } from 'react-redux';
import { updateBalance } from '@redux/user/actions';

interface IProps {

  performerId: string
  conversationId: string
  favorGift: any
  updateBalance : Function;
  sessionId:string;
  streamType : string;

}
class FavoriteGift extends PureComponent<IProps> {
  state = {
    isConfirm: true
  };

  onChange = () => {
    const { isConfirm } = this.state;
    this.setState({
      isConfirm: !isConfirm
    });
  }

  handleSendGift = async (giftId: string) => {
    const {
      conversationId, performerId, favorGift, updateBalance: dispatchUpdateBalance, sessionId, streamType
    } = this.props;
    const { isConfirm } = this.state;

    if (isConfirm) {
      try {
        await tokenTransctionService.sendGift(performerId, {
          giftId, conversationId, streamType, sessionId
        });
        message.success('Send gift success');
        dispatchUpdateBalance({
          token: favorGift.tokens * -1,
          type: 'ruby-balance'
        });
      } catch (e) {
        const error = await e;

        error.message === 'giftId should not be empty' ? message.error('Please select a gift') : message.error(error.message);
      }
    } else {
      message.error('Please confirm before send gift !! ');
    }
  }

  render() {
    const { isConfirm } = this.state;
    const { favorGift } = this.props;
    const sendGift = this.handleSendGift.bind(this);

    return (
      <Layout>
        <div className="favoriteBox">
          <Row>
            {favorGift && (
            <Image
              key={favorGift._id}
              preview={false}
              src={`${favorGift?.image?.url || '/static/gem.png'}`}
              fallback="/static/gem.png"
              className="iconFavorite"
              onClick={() => sendGift(favorGift?._id)}
            />
            ) }
          </Row>
        </div>
      </Layout>
    );
  }
}
const mapDispatchs = {

  updateBalance
};

export default connect(null, mapDispatchs)(FavoriteGift);
