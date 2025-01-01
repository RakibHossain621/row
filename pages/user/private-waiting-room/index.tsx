import React, { PureComponent } from 'react';
import Header from 'next/head';
import {
  Button, Checkbox, message, Layout
} from 'antd';
import Router from 'next/router';
import { IPerformer } from 'src/interfaces';
import { performerService, utilsService, streamService } from 'src/services';
import { connect } from 'react-redux';
import Link from 'next/link';
import { getStreamConversationSuccess, resetStreamMessage } from '@redux/stream-chat/actions';
import { updateBalance } from '@redux/user/actions';
import { SocketContext, Event } from 'src/socket';
import nextCookie from 'next-cookies';
import { getResponseError } from '@lib/utils';
import { cancelPrivateRequest } from '@redux/streaming/actions';
import PerformerGridCard from '@components/performer/grid-card';

import './index.less';
import HomePageHeader from '@layouts/home-page-header';

const EVENT = {
  MODEL_JOIN_ROOM: 'MODEL_JOIN_ROOM',
  JOIN_ROOM: 'JOIN_ROOM'
};

interface IProps {
  username: string;
  performer: IPerformer;
  currentUser: IPerformer;
  getStreamConversationSuccess: Function;
  activeConversation: any;
  cancelPrivateRequest: Function;
}

interface IStates {
  isAccept: boolean;
  sessionId: string;
  confirmed: boolean;
}

class UserWaitingRoom extends PureComponent<IProps, IStates> {
  static authenticate = true;

  private socket;

  static async getInitialProps({ ctx }) {
    try {
      const { query } = ctx;
      if (process.browser && query.performer) {
        return {
          performer: JSON.parse(query.performer)
        };
      }
      const countries = await utilsService.countriesList();

      const { token } = nextCookie(ctx);
      const headers = { Authorization: token };
      const resp = await performerService.findOne(query.username, headers);
      const performer: IPerformer = resp.data;
      if (!performer.isSubscribed) {
        throw new Error();
      }
      return {
        performer,
        countries: countries?.data || []
      };
    } catch (e) {
      if (process.browser) {
        return Router.push('/');
      }

      ctx.res.writeHead && ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end && ctx.res.end();
      return {};
    }
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      isAccept: false,
      sessionId: '',
      confirmed: false
    };
  }

  async handleTabChange(currentTab) {
    Router.push({ pathname: '/live-now', query: { tab: currentTab } });
  }

  async handleModelJoinRoom({ conversationId, performerId }) {
    const { activeConversation, performer } = this.props;
    if (performerId === performer._id) {
      message.success('Model joined the room!');
      const { sessionId } = this.state;
      if (activeConversation?.data?._id && activeConversation.data._id === conversationId && sessionId) {
        Router.push(
          {
            pathname: '/stream/privatechat',
            query: { performer: JSON.stringify(performer), sessionId }
          },
          `/stream/privatechat/${performer.username}`
        );
      }
    }
  }

  async accept() {
    const { performer, getStreamConversationSuccess: dispatchGetStreamConversationSuccess, currentUser } = this.props;
    try {
      if (currentUser.rubyBalance < performer.privateChatPrice * 5) {
        message.error('You have an insufficient ruby balance. Please top up.', 10);
        Router.push('/ruby-package');
        return false;
      }
      const resp = await streamService.requestPrivateChat(performer._id);
      const { sessionId, conversation } = resp.data;
      message.success(`${performer.username} is getting ready and will be starting soon`);
      this.socket = this.context;
      this.socket.emit(EVENT.JOIN_ROOM, {
        conversationId: conversation._id
      });
      this.setState({
        sessionId,
        isAccept: true
      });
      dispatchGetStreamConversationSuccess({
        data: conversation
      });
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
    }
    return true;
  }

  async cancelPrivateRequest() {
    try {
      const { cancelPrivateRequest: handleCancel, activeConversation } = this.props;
      const resp = await streamService.cancelPrivateChat(activeConversation?.data._id);
      if (resp.success) {
        this.setState({ isAccept: false }, () => {
          handleCancel(activeConversation?.data?._id);
          Router.push(
            {
              pathname: '/live-now',
              query: {
                tab: 'private'
              }
            },
            '/live-now'
          );
        });
      }
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
    }
  }

  render() {
    const { performer, currentUser } = this.props;
    const { isAccept, confirmed } = this.state;

    return (
      <Layout className="model-live-waiting-room">
        <Header>
          <title>PrivateWaitingRoom</title>
        </Header>
        <Event event={EVENT.MODEL_JOIN_ROOM} handler={this.handleModelJoinRoom.bind(this)} />
        <div className="main-container">
          <HomePageHeader
            tabs={[
              {
                key: 'public',
                tab: 'Free Public Live Streamers'
              },
              {
                key: 'private',
                tab: 'Private 1 on 1'
              }
            ]}
            handleTabChange={(val) => this.handleTabChange(val)}
          />
          <div className="page-heading header-title">
            <span>
              Private Video Date with:
            </span>
          </div>
          <div className="avatar-wrappers">
            <PerformerGridCard
              modelNumber={0}
              performer={performer}
              pathname="/model/profile"
              as={`/${performer?.username || performer?._id}`}
              showButtonFollow
              getPerformerList={() => { }}
              showModelNumber
            />
          </div>
          {!performer.privateChat && (
          <div className="text-center">
            {performer?.name || performer?.username}
            {' '}
            is no longer available for Private Chat.
            {' '}
            See availble models
            {' '}
            <Link
              href={{
                pathname: '/live-now',
                query: { tab: 'private' }
              }}
            >
              here
            </Link>
            <br />
          </div>
          )}
          {performer.privateChat ? (
            <div className="private-bottom">
              <div className="private-text">
                This Private Room Fee will be automatically deducted from your
                <br />
                account at the beginning of each minute.
              </div>
              <div className="text-center">
                <span>
                  Private Room Fee
                </span>
                <span className="price">
                  (
                  {performer.privateChatPrice}
                  )
                </span>
                <span>
                  <img alt="" width={30} height={30} className="privateImg" src="/static/gem.png" />
                  {' '}
                  per minute
                </span>
                <span>
                  5 Minute Minimum
                </span>
              </div>
              <div className="private-waiting-room">
                {!isAccept ? (
                  <Button className="btnAccept" disabled={!confirmed || currentUser._id === performer._id} onClick={this.accept.bind(this)}>
                    Accept
                  </Button>
                ) : (
                  <Button className="btnAccept" onClick={this.cancelPrivateRequest.bind(this)}>
                    Cancel
                  </Button>
                )}
              </div>
              <div className="private-waiting-room">
                <a href="/page/terms-of-use" target="_blank">
                  <span>Terms and Conditions </span>
                </a>
                <Checkbox
                  defaultChecked={confirmed}
                  onChange={() => this.setState({ confirmed: !confirmed })}
                >
                  Continue
                </Checkbox>
              </div>
            </div>
          ) : null}
        </div>
      </Layout>
    );
  }
}

UserWaitingRoom.contextType = SocketContext;

const mapStateToProps = (state) => ({
  currentUser: state.user.current,
  activeConversation: state.streamMessage.activeConversation
});
const mapDispatchs = {
  getStreamConversationSuccess,
  resetStreamMessage,
  updateBalance,
  cancelPrivateRequest
};
export default connect(mapStateToProps, mapDispatchs)(UserWaitingRoom);
