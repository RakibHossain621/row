/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { followService } from 'src/services';
import { message } from 'antd';
import { onFollow } from '@redux/performer/actions';
import { connect } from 'react-redux';
import { IPerformer } from '@interfaces/performer';
import { AppButton } from '@components/ui/shared/AppButton';
import { updateCurrentUser } from '@redux/user/actions';
import { NextRouter } from 'next/router';
import { withRouter } from 'next/router';


interface IProps {
  isFollow: boolean;
  targetId: string;
  sourceId: string;
  updateCurrentUser: Function;
  getPerformerList: Function;
  isHideOnClick: boolean;
  title?: any;
  user:IPerformer;
  performer: IPerformer;
  onFollow: Function;
  updateFollower? : Function,
  isTrending?: boolean,
  router:NextRouter
}

class ButtonFollow extends PureComponent<IProps> {
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

  handleFollow = async () => {
    const { status } = this.state;
    const {
      targetId,
      sourceId,
      getPerformerList,
      onFollow: dispatchOnFollow,
      updateFollower,
      updateCurrentUser,
      user
    } = this.props;
    try {
      if (status) {
        if (!window.confirm('Are you sure you want to unfollow this person?')) {
          return;
        }
        const stats = { ...user?.stats, totalFollowing: user?.stats.totalFollowing - 1}
        updateCurrentUser({ ...user, stats });
        await this.setState({ loading: true });
        await followService.delete(targetId);
        this.setState({
          status: false
        });
        updateFollower && updateFollower(-1);
        dispatchOnFollow
          && dispatchOnFollow({
            action: 'delete',
            performerId: targetId
          });
      } else {
        await this.setState({ loading: true });
        const stats = { ...user?.stats, totalFollowing: user?.stats.totalFollowing + 1}
        updateCurrentUser({ ...user, stats });
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
        updateFollower && updateFollower(1);

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
    const {
      isFollow, title, performer, sourceId, targetId, isTrending, router
    } = this.props;

   
    if(router.pathname !=='/model' && status){
      return null
    }

    return (
      <>
        {isFollow ? (
          <>
            {isTrending ? 
              <AppButton
                className={`w-full rounded-full bg-transparent text-white border border-white py-1 px-2 hover:bg-black/90 hover:border-black/90`}
                loading={loading}
                size='sm'
                onClick={this.handleFollow}
              >
                <span>Unfollow</span>
              </AppButton>
            :
              <AppButton
                className={`rounded-t-none w-full rounded-b-lg ${ performer.gender === 'male' ? 'bg-blue-900' : ''}`}
                loading={loading}
                onClick={this.handleFollow}
              >
                <span>Unfollow</span>
              </AppButton>
            }
          </>
        ) : (
          <>
            {isTrending ? 
              <AppButton
                className={`w-full rounded-full bg-transparent text-white border border-white py-1 px-2 hover:bg-black/90`}
                size='sm'
                loading={loading}
                onClick={this.handleFollow}
              >
                <span>{title || 'Follow'}</span>
              </AppButton>
            :
              <AppButton
                className={`rounded-t-none w-full rounded-b-lg ${ performer.gender === 'male' ? 'bg-blue-900' : ''}`}
                loading={loading}
                onClick={this.handleFollow}
              >
                <span>{title || 'Follow'}</span>
              </AppButton>
            }
          </>
        )}
      </>
    );
  }
}

const mapState = (state: any) => ({
  user: { ...state.user.current }
});

const mapDispatch = {
  onFollow,
  updateCurrentUser
};

export default withRouter(connect(mapState, mapDispatch)(ButtonFollow));
