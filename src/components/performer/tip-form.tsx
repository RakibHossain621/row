import { PureComponent } from 'react';
import {
  InputNumber, Button, Avatar, Checkbox
} from 'antd';
import { TickIcon } from 'src/icons';
import { IPerformer } from '@interfaces/index';
import './performer.less';
import { connect } from 'react-redux';

interface IProps {
  performer: IPerformer;
  onFinish(price: any, isConfirm :boolean): Function;
  submiting: boolean;
  currentUser: IPerformer;
}

class TipPerformerForm extends PureComponent<IProps> {
  state = {
    price: 10,
    isConfirm: false
  }

  onChangeValue(price) {
    this.setState({ price });
  }

  onChange = () => {
    const { isConfirm } = this.state;
    this.setState({
      isConfirm: !isConfirm
    });
  }

  render() {
    const {
      onFinish, submiting = false, performer, currentUser
    } = this.props;
    const { price, isConfirm } = this.state;
    return (
      <>
        <div className="confirm-subscription-form">
          <div className="top-content">
            <span>
              All donations contribute to my
              {' '}
              <br />
              <a href="/model?tab=model&filter=earningCurrentMonth">Most Supported</a>
              {' '}
              ranking.
            </span>
          </div>
          <div className="text-help">
            <span>Help me get to the top</span>
          </div>
          <div className="text-center">
            <Avatar src={performer?.avatar || '/static/no-avatar.png'} />
            <p>
              {performer?.name || performer?.username || 'N/A'}
              {' '}
              {performer?.verifiedAccount && <TickIcon className="primary-color" />}
            </p>
          </div>
          <div className="tip-grps">
            <div>
              <img src="/static/gem.png" width="20px" alt="gem-ico" />
              <Button type={price === 10 ? 'primary' : 'default'} onClick={() => this.onChangeValue(10)}>
                10
              </Button>
            </div>
            <div>
              <img src="/static/gem.png" width="20px" alt="gem-ico" />
              <Button type={price === 20 ? 'primary' : 'default'} onClick={() => this.onChangeValue(20)}>
                20
              </Button>
            </div>
            <div>
              <img src="/static/gem.png" width="20px" alt="gem-ico" />
              <Button type={price === 50 ? 'primary' : 'default'} onClick={() => this.onChangeValue(50)}>
                50
              </Button>
            </div>
            <div>
              <img src="/static/gem.png" width="20px" alt="gem-ico" />
              <Button type={price === 100 ? 'primary' : 'default'} onClick={() => this.onChangeValue(100)}>
                100
              </Button>
            </div>
            <div>
              <img src="/static/gem.png" width="20px" alt="gem-ico" />
              <Button type={price === 200 ? 'primary' : 'default'} onClick={() => this.onChangeValue(200)}>
                200
              </Button>
            </div>
            <div>
              <img src="/static/gem.png" width="20px" alt="gem-ico" />
              <Button type={price === 500 ? 'primary' : 'default'} onClick={() => this.onChangeValue(500)}>
                500
              </Button>
            </div>
            <div>
              <img src="/static/gem.png" width="20px" alt="gem-ico" />
              <Button type={price === 1000 ? 'primary' : 'default'} onClick={() => this.onChangeValue(1000)}>
                1000
              </Button>
            </div>
          </div>
          <div className="info-body">
            <div style={{ textAlign: 'center' }}>
              <p>Enter your tip amount in ruby</p>
              <InputNumber min={1} precision={0} onChange={this.onChangeValue.bind(this)} value={price} />
            </div>
          </div>
          <Button type="primary" loading={submiting} onClick={() => onFinish(price, isConfirm)}>SEND TIP</Button>
          <div style={{ padding: '10px' }}>
            <Checkbox defaultChecked={isConfirm} onChange={this.onChange}>Confirm</Checkbox>
          </div>
        </div>
        <div className="footer-content">
          Available
          {' '}
          <img src="/static/gem.png" width="20px" alt="gem-ico" />
          <span className="user-ruby">{Math.round(currentUser?.rubyBalance)}</span>
        </div>
      </>
    );
  }
}

const mapStates = (state: any) => ({
  currentUser: { ...state.user.current }
});

const mapDispatch = {};
export default connect(mapStates, mapDispatch)(TipPerformerForm);
