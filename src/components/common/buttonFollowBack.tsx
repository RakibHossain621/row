import { PureComponent } from 'react';
import { followService } from 'src/services';
import './layout/content-sidebar-layout.less';
import { Button, message } from 'antd';
import { onFollow } from '@redux/performer/actions';
import { connect } from 'react-redux';
import { UserAddOutlined, UserDeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { IPerformer } from '@interfaces/performer';

interface IProps {
  isFollow: boolean;
  targetId: string;
  sourceId: string;
  getPerformerList: Function;
  onFollow: Function;
  isHideOnClick: boolean;
  performer : IPerformer;

}

class ButtonFollowBack extends PureComponent<IProps> {
  state = {
    status: false,
    loading: false

  };

  componentDidMount() {
    const { isFollow } = this.props;
    if (isFollow || isFollow === undefined) {
      this.setState({
        status: true
      });
    }
  }

  // componentDidUpdate(prevProps: IProps) {
  //   const { isFollow } = this.props;
  //   if (prevProps.isFollow !== isFollow) this.setState({ status: isFollow });
  // }

  handleFollow = async () => {
    const { status } = this.state;
    const {
      targetId, sourceId, onFollow: dispatchOnFollow, getPerformerList
    } = this.props;
    try {
      if (status) {
        if (!window.confirm('Are you sure you want to unfollow this person?')) {
          return;
        }
        await this.setState({ loading: true });
        await followService.delete(targetId);
        this.setState({
          status: false
        });

        dispatchOnFollow && dispatchOnFollow({
          action: 'delete',
          performerId: targetId
        });
      } else {
        await this.setState({ loading: true });
        await followService.create({
          targetId,
          sourceId
        });
        this.setState({
          status: true
        });
        dispatchOnFollow && dispatchOnFollow({
          action: 'create',
          performerId: targetId
        });
        getPerformerList();
      }
    } catch (e) {
      const err = await e;
      message.error(err.message || 'error occured, please try again later');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { status, loading } = this.state;
    const { isHideOnClick, performer } = this.props;

    return (
      <div>

        {performer

          ? (
            <div className="btnStatus">
              {status ? (
                <Button className={(performer.gender === 'female') ? 'follow-female' : 'follow'} icon={<UserDeleteOutlined />} loading={loading} onClick={this.handleFollow} hidden={isHideOnClick}>
                  {/* <Icon component={() => (<img src="./static/beforefollow.svg" alt="beforefollow" />)} /> */}
                  <span style={{ marginLeft: 3 }}>Unfollow</span>
                </Button>
              )
                : (
                  <Button className={(performer.gender === 'female') ? 'follow-female' : 'follow'} icon={<UserAddOutlined />} loading={loading} onClick={this.handleFollow}>
                    <span style={{ marginLeft: 3 }}>Follow Back</span>
                  </Button>
                )}

            </div>
          )
          : (
            <div className="btnStatus">
              {status ? (
                <Button className="follow-back-notification" icon={<UserDeleteOutlined />} loading={loading} onClick={this.handleFollow} hidden={isHideOnClick}>
                  {/* <Icon component={() => (<img src="./static/beforefollow.svg" alt="beforefollow" />)} /> */}
                  <span style={{ marginLeft: 2 }}>Unfollow</span>
                </Button>
              )
                : (
                  <Button className="follow-back-notification" icon={<PlusOutlined className="render-icon" />} loading={loading} onClick={this.handleFollow}>
                    <span style={{ marginLeft: 2 }}>Follow Back</span>
                  </Button>
                )}

            </div>
          )}
      </div>
    );
  }
}

const mapDispatch = {
  onFollow
};

export default connect(null, mapDispatch)(ButtonFollowBack);
