import {
  Layout, Button, Image, message
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { performerService, streamService } from 'src/services';
import Head from 'next/head';
import { EditOutlined } from '@ant-design/icons';
import { TickIcon } from 'src/icons';

import { IPerformer, IUser, IUIConfig } from 'src/interfaces';
import Link from 'next/link';
import Error from 'next/error';
import '@components/performer/performer.less';
import './index.less';
import ButtonFollow from '@components/common/buttonFollow';
import { getResponseError } from '@lib/utils';
import { getStreamConversationSuccess } from '@redux/stream-chat/actions';
import { SocketContext, Event } from 'src/socket';
import Router from 'next/router';

interface IProps {
  ui: IUIConfig;
  error: any;
  currentUser: IUser;
  performer: IPerformer;
  getStreamConversationSuccess: Function;
  activeConversation: any;
}

class UserAcceptRoom extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  private socket;

  state = {
    sessionId: ''
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    try {
      const [performer] = await Promise.all([
        performerService.findOne(query.username, {
          Authorization: ctx.token || ''
        })
      ]);
      return {
        performer: performer?.data
      };
    } catch (e) {
      const error = await Promise.resolve(e);
      return { error };
    }
  }

  async componentDidMount() {
    this.sendRequest();
  }

  async handleModelJoinRoom({ conversationId }) {
    message.success('Model joined the room!');
    const { activeConversation, performer } = this.props;
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

  async sendRequest() {
    const { performer, getStreamConversationSuccess: dispatchGetStreamConversationSuccess } = this.props;

    try {
      const resp = await streamService.requestPrivateChat(performer._id);
      const { sessionId, conversation } = resp.data;
      message.success('Private request has been sent!');
      this.socket = this.context;
      this.socket.emit('JOIN_ROOM', {
        conversationId: conversation._id
      });
      this.setState({
        sessionId
      });
      dispatchGetStreamConversationSuccess({
        data: conversation
      });
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
    }
  }

  render() {
    const {
      error, performer, ui, currentUser
    } = this.props;
    if (error) {
      return <Error statusCode={error?.statusCode || 404} title={error?.message || "Sorry, we can't find this page"} />;
    }

    return (
      <Layout>
        <Head>
          <title>{`${ui?.siteName} | Accepted Room`}</title>
        </Head>
        <Event event="MODEL_JOIN_ROOM" handler={this.handleModelJoinRoom.bind(this)} />
        <div className="main-container">
          <div
            className="top-profile"
            style={{ backgroundImage: `url('${performer?.cover || '/static/banner-image.jpg'}')` }}
          >
            <div className="bg-2nd">
              <div className="top-banner" />
            </div>
          </div>
        </div>
        <div className="main-profile">
          <div className="main-container">
            <div className="fl-col">
              <Image
                alt="main-avt"
                src={performer?.avatar || '/static/no-avatar.png'}
                fallback="/static/no-avatar.png"
              />
              {currentUser?._id !== performer?._id && (
                <span className={performer?.isOnline > 0 ? 'online-status' : 'online-status off'} />
              )}
              <div className="m-user-name">
                <h4>
                  {performer?.name || 'N/A'}
                  &nbsp;
                  {performer?.verifiedAccount && <TickIcon />}
                  &nbsp;
                  {performer?.live > 0 && currentUser?._id !== performer?._id && (
                    <a aria-hidden className="live-status">
                      Live
                    </a>
                  )}
                  {currentUser?._id === performer?._id && (
                    <Link href="/model/account">
                      <a href="/model/account">
                        <EditOutlined className="primary-color" />
                      </a>
                    </Link>
                  )}
                </h4>
                <h5 style={{ textTransform: 'none' }}>
                  @
                  {performer?.username || 'n/a'}
                </h5>
              </div>
              <div className="m-user-name" />
              {!currentUser.isPerformer && (
                <ButtonFollow
                  performer={performer}
                  isHideOnClick
                  targetId={performer._id}
                  sourceId={currentUser._id}
                  isFollow={performer.isFollowed}
                  getPerformerList={() => {}}
                />
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }} />

        <div className="notify-section-accept">
          <p>
            Waiting for you to Join
            {' '}
            <br />
            {' '}
            seconds remaining
          </p>
          <div>
            <Image
              width={50}
              height={50}
              className="avatar"
              src={currentUser?.avatar ? currentUser.avatar : '/static/no-avatar.png'}
              fallback="/static/no-avatar.png"
              alt=""
            />
            {' '}
            <span className="display-name">{currentUser?.username}</span>
          </div>
        </div>
        <div className="private-text">
          The Auto tip for this private video chat room will automatically deducted from your account at the beginning
          of each minute. 5 minute is minimum
        </div>

        <div className="text-center">
          Auto tip (
          <span className="price">{performer.privateChatPrice}</span>
          )
          {' '}
          <img alt="" width={30} height={30} className="privateImg" src="/static/gem.png" />
          {' '}
          per minute
        </div>
        <Button className="privateAcp">Cancel</Button>
        <div className="private-text">
          {performer.username}
          {' '}
          just decided to take a break
        </div>
      </Layout>
    );
  }
}

UserAcceptRoom.contextType = SocketContext;

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  privateRequest: { ...state.streaming.privateRequest },
  currentUser: { ...state.user.current },
  activeConversation: state.streamMessage.activeConversation
});

const mapDispatchs = {
  getStreamConversationSuccess
};
export default connect(mapStates, mapDispatchs)(UserAcceptRoom);
