import React, { PureComponent } from 'react';
import Header from 'next/head';
import {
  Row, Col, message, List, Button
} from 'antd';
import Router from 'next/router';
import { IPerformer, IUser } from 'src/interfaces';
import {
  performerService, streamService, tokenTransctionService
} from 'src/services';
import { connect } from 'react-redux';
import { getStreamConversationSuccess, resetStreamMessage } from '@redux/stream-chat/actions';
import { updateBalance } from '@redux/user/actions';
import { SocketContext, Event } from 'src/socket';
import nextCookie from 'next-cookies';
import ChatBox from '@components/stream-chat/chat-box';
import { getResponseError } from '@lib/utils';
import PrivatePublisher from 'src/components/streaming/webrtc/privatechat/publisher';
import PrivateSubscriber from 'src/components/streaming/webrtc/privatechat/subscriber';
// import './index.less';

// eslint-disable-next-line no-shadow
enum EVENT {
  JOINED_THE_ROOM = 'JOINED_THE_ROOM',
  JOIN_ROOM = 'JOIN_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',
  STREAM_INFORMATION_CHANGED = 'private-stream/streamInformationChanged',
  MODEL_JOIN_ROOM = 'MODEL_JOIN_ROOM',
  SEND_PAID_TOKEN = 'SEND_PAID_TOKEN'
}

const STREAM_JOINED = 'private-stream/streamJoined';
const STREAM_LEAVED = 'private-stream/streamLeaved';
const JOINED_THE_ROOM = 'JOINED_THE_ROOM';

const ListItem = ({ description, title }: any) => (
  <List.Item>
    <Row style={{ width: '100%' }}>
      <Col className="light-text" sm={{ span: 6 }} xs={{ span: 12 }}>
        {title}
      </Col>
      <Col style={{ fontWeight: 'bold' }} sm={{ span: 18 }} xs={{ span: 12 }}>
        {description}
      </Col>
    </Row>
  </List.Item>
);

interface IProps {
  username: string;
  performer: IPerformer;
  user: IUser;
  getStreamConversationSuccess: Function;
  activeConversation: any;
  resetStreamMessage: Function;
  updateBalance: Function;
}

interface IStates {
  roomJoined: boolean;
  processing: boolean;
  total: number;
  members: IUser[];
  callTime: number;
  paidToken: number;
  sessionId : string;
}

class UserPrivateChat extends PureComponent<IProps, IStates> {
  static authenticate = true;

  private publisherRef;

  private subscriberRef;

  private publisherRef2;

  private subscriberRef2;

  private streamId: string;

  private streamList: Array<string> = [];

  private interval: NodeJS.Timeout;

  private socket;

  static async getInitialProps({ ctx }) {
    try {
      const { query } = ctx;
      if (process.browser && query.performer) {
        return {
          performer: JSON.parse(query.performer)
        };
      }

      const { token } = nextCookie(ctx);
      const headers = { Authorization: token };
      const resp = await performerService.findOne(query.username, headers);
      const performer: IPerformer = resp.data;
      if (!performer.isSubscribed) {
        throw new Error();
      }

      return {
        performer
      };
    } catch (e) {
      // const err = await Promise.resolve(e);
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
      processing: false,
      roomJoined: false,
      total: 0,
      callTime: 0,
      paidToken: 0,
      sessionId: '',
      members: []
    };
  }

  componentDidMount() {
    this.publisherRef = React.createRef();
    this.subscriberRef = React.createRef();
    this.socket = this.context;
    window.addEventListener('beforeunload', this.onbeforeunload);
    Router.events.on('routeChangeStart', this.onbeforeunload);
  }

  componentDidUpdate(prevProps: IProps) {
    const { activeConversation } = this.props;
    if (activeConversation?.data?._id && activeConversation !== prevProps.activeConversation) {
      this.initSocketEvent();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    Router.events.off('routeChangeStart', this.onbeforeunload);
  }

  handler({ total, members, conversationId }) {
    const { activeConversation } = this.props;
    if (activeConversation?.data?._id && activeConversation.data._id === conversationId) {
      this.setState({ total, members });
    }
  }

  async handleModelJoinRoom({ conversationId }) {
    message.success('Model joined the room!');
    const { activeConversation, performer, user } = this.props;
    if (activeConversation?.data?._id && activeConversation.data._id === conversationId) {
      // const socket = this.context;
      this.interval = setInterval(() => {
        const { callTime } = this.state;
        if (user.rubyBalance < performer.privateChatPrice) {
          message.warn('Your balance is not enough token.');
          setTimeout(() => window.location.reload(), 10 * 1000);
          return;
        }

        this.setState({ callTime: callTime + 1 });
        this.sendPaidToken(conversationId);
      }, 60 * 1000);
    }
  }

  setStreamRefPublisher = (dataFunc) => {
    this.publisherRef2 = dataFunc;
  };

  setStreamRefSubscriber = (dataFunc) => {
    this.subscriberRef2 = dataFunc;
  };

  onbeforeunload = () => {
    this.leaveSession();
  };

  leaveSession() {
    const { activeConversation, resetStreamMessage: dispatchResetStreamMessage } = this.props;
    dispatchResetStreamMessage();
    this.socket.off(JOINED_THE_ROOM);
    this.socket.off(STREAM_JOINED);
    this.socket.off(STREAM_LEAVED);
    if (this.socket && activeConversation && activeConversation.data) {
      this.socket.emit(EVENT.LEAVE_ROOM, {
        conversationId: activeConversation.data._id
      });
    }

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.setState({
      processing: false,
      roomJoined: false,
      paidToken: 0,
      callTime: 0,
      total: 0,
      members: []
    });
  }

  async sendRequest() {
    const { performer, getStreamConversationSuccess: dispatchGetStreamConversationSuccess } = this.props;
    try {
      this.setState({ processing: true });
      const resp = await streamService.requestPrivateChat(performer._id);
      const { sessionId, conversation } = resp.data;
      this.setState({ sessionId });
      const socket = this.context;
      message.success('Private request has been sent!');
      if (this.publisherRef.current?.start) this.publisherRef.current.start(conversation._id, sessionId);
      else this.publisherRef2.start(conversation._id, sessionId);

      socket.emit(EVENT.JOIN_ROOM, {
        conversationId: conversation._id
      });
      dispatchGetStreamConversationSuccess({
        data: conversation
      });
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
    } finally {
      this.setState({ processing: false });
    }
  }

  roomJoinedHandler({ total, members, conversationId }) {
    const { activeConversation } = this.props;
    if (activeConversation?.data?._id && conversationId === activeConversation.data._id) {
      this.setState({
        total,
        members,
        roomJoined: true,
        callTime: 0
      });
    }
  }

  leave() {
    if (this.publisherRef.current?.stop) this.publisherRef.current.stop();
    else this.publisherRef2.stop();

    if (this.subscriberRef.current.stop) this.subscriberRef.current.stop();
    else this.subscriberRef2.stop();

    setTimeout(() => {
      window.location.href = '/';
    }, 10 * 1000);
  }

  async sendPaidToken(conversationId: string) {
    try {
      const { performer, updateBalance: dispatchUpdateBalance } = this.props;
      const { paidToken, sessionId } = this.state;
      await tokenTransctionService.sendPaidToken(conversationId, { sessionId });
      const newState = { paidToken: paidToken + performer.privateChatPrice };
      this.setState(newState);
      dispatchUpdateBalance({ token: performer.privateChatPrice * -1, type: 'ruby-balance' });
    } catch (err) {
      const error = await Promise.resolve(err);
      if (error.statusCode === 400) {
        message.error('Your wallets do not enough, please buy more.');
        clearInterval(this.interval);
        this.leave();
      }
    }
  }

  initSocketEvent() {
    this.socket = this.context;
    this.socket.on(JOINED_THE_ROOM, ({ streamId, streamList, conversationId }) => {
      const { activeConversation } = this.props;
      if (conversationId !== activeConversation.data._id) return;

      this.streamId = streamId;
      this.streamList = streamList;
      if (this.publisherRef.current.publish) this.publisherRef.current.publish(streamId);
      else this.publisherRef2.publish(streamId);
    });
    this.socket.on(STREAM_JOINED, (data: { streamId: string }) => {
      if (this.streamId !== data.streamId) {
        // settings.optionForPrivate === 'webrtc' ? this.setState({ newAvailableStreams: [...newAvailableStreams, data.streamId] }) : this.subscribeHLS(data.streamId);
        if (this.subscriberRef.current.play) this.subscriberRef.current.play(data.streamId);
        else this.subscriberRef2.current.play(data.streamId);
      }
    });
    this.socket.on(STREAM_LEAVED, (data: { streamId: string }) => {
      this.streamList = this.streamList.filter((id) => id !== data.streamId);
      message.error('Private call has ended.');
      window.setTimeout(() => {
        Router.push('/');
      }, 10 * 1000);
    });
  }

  render() {
    const { performer } = this.props;
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      processing, total, members, roomJoined, callTime, paidToken
    } = this.state;
    const dataSource = [
      {
        title: 'Call time',
        description: `${callTime} minute(s)`
      },
      {
        title: 'Status',
        description: roomJoined ? 'Live' : ''
      },
      {
        title: 'Paid Ruby',
        description: `${paidToken} ruby(s)`
      },
      {
        title: 'Ruby per minute',
        description: `${performer.privateChatPrice} ruby(s)` || 'N/A'
      }
    ];

    return (
      <>
        <Header>
          <title>Private Chat</title>
        </Header>
        <Event event={EVENT.STREAM_INFORMATION_CHANGED} handler={this.handler.bind(this)} />
        <Event event={EVENT.JOINED_THE_ROOM} handler={this.roomJoinedHandler.bind(this)} />
        <Event event={EVENT.MODEL_JOIN_ROOM} handler={this.handleModelJoinRoom.bind(this)} />
        <div className="container">
          <Row gutter={{ sm: 10, xs: 0 }}>
            <Col md={12} xs={24}>
              {!roomJoined ? (
                <Button type="primary" onClick={this.sendRequest.bind(this)} loading={processing} block>
                  Send Private Call Request
                </Button>
              ) : (
                <Button type="primary" onClick={this.leave.bind(this)} block disabled={processing}>
                  Stop Streaming
                </Button>
              )}
              <div className="private-streaming-container">
                <PrivatePublisher
                  {...this.props}
                  ref={this.publisherRef}
                  configs={{
                    localVideoId: 'private-publisher'
                  }}
                  setStreamRef={this.setStreamRefPublisher}
                />
                <PrivateSubscriber
                  {...this.props}
                  ref={this.subscriberRef}
                  configs={{
                    isPlayMode: true,
                    remoteVideoId: 'private-subscriber'
                  }}
                  setStreamRef={this.setStreamRefSubscriber}
                />
              </div>
              <List
                dataSource={dataSource}
                renderItem={(item) => <ListItem description={item.description} title={item.title} />}
              />
            </Col>
            <Col xs={24} md={12}>
              <ChatBox {...this.props} totalParticipant={total} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

UserPrivateChat.contextType = SocketContext;

const mapStateToProps = (state) => ({
  user: state.user.current,
  activeConversation: state.streamMessage.activeConversation
});
const mapDispatchs = {
  getStreamConversationSuccess,
  resetStreamMessage,
  updateBalance
};
export default connect(mapStateToProps, mapDispatchs)(UserPrivateChat);
