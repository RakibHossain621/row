import React, { PureComponent } from 'react';
import Header from 'next/head';
import {
  Row, Col, message, Button, List
} from 'antd';
import Router from 'next/router';
import { IUser } from 'src/interfaces';
import { streamService } from 'src/services';
import { connect } from 'react-redux';
import { accessPrivateRequest } from 'src/redux/streaming/actions';
import { SocketContext, Event } from 'src/socket';
import ChatBox from '@components/stream-chat/chat-box';
import { getStreamConversationSuccess, resetStreamMessage } from '@redux/stream-chat/actions';
import PrivatePublisher from 'src/components/streaming/webrtc/privatechat/publisher';
import PrivateSubscriber from 'src/components/streaming/webrtc/privatechat/subscriber';
import { getResponseError } from '@lib/utils';
import { RECEIVED_PAID_TOKEN_EVENT } from 'src/constants';
import { updateBalance } from '@redux/user/actions';

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

// eslint-disable-next-line no-shadow
enum STREAM_EVENT {
  JOINED_THE_ROOM = 'JOINED_THE_ROOM',
  JOIN_ROOM = 'JOIN_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',
  STREAM_INFORMATION_CHANGED = 'private-stream/streamInformationChanged'
}

const STREAM_JOINED = 'private-stream/streamJoined';
const STREAM_LEAVED = 'private-stream/streamLeaved';
const JOINED_THE_ROOM = 'JOINED_THE_ROOM';

interface IProps {
  query: any;
  getStreamConversationSuccess: Function;
  activeConversation: any;
  resetStreamMessage: Function;
  accessPrivateRequest: Function;
  updateBalance: Function;
}

interface IStates {
  processing: boolean;
  roomJoined: boolean;
  total: number;
  members: IUser[];
  callTime: number;
  receivedToken: number;
}

class ModelPrivateChat extends PureComponent<IProps, IStates> {
  static authenticate = true;

  static onlyPerformer = true;

  private publisherRef;

  private subscriberRef;

  private publisherRef2;

  private subscriberRef2;

  private streamId: string;

  private streamList: Array<string> = [];

  private socket: any;

  private interval: NodeJS.Timeout;

  static async getInitialProps({ ctx }) {
    if (!ctx.query.id) {
      if (process.browser) {
        Router.push('/');
        return false;
      }

      ctx.res.writeHead && ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end && ctx.res.end();
    }

    return {
      query: ctx.query
    };
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      processing: false,
      roomJoined: false,
      total: 0,
      callTime: 0,
      receivedToken: 0,
      members: []
    };
  }

  componentDidMount() {
    const { query, accessPrivateRequest: access } = this.props;
    window.addEventListener('beforeunload', this.onbeforeunload);
    Router.events.on('routeChangeStart', this.onbeforeunload);
    this.socket = this.context;
    this.publisherRef = React.createRef();
    this.subscriberRef = React.createRef();
    access(query.id);
  }

  componentDidUpdate(prevProps: IProps) {
    const { query, activeConversation, accessPrivateRequest: access } = this.props;
    if (prevProps.query.id !== query.id) {
      access(query.id);
    }
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

  handleReceivedPaidToken({ token, conversationId }) {
    const { activeConversation, updateBalance: dispatchUpdateBalance } = this.props;
    const { receivedToken } = this.state;
    if (activeConversation?.data?._id && conversationId === activeConversation.data._id) {
      this.setState({ receivedToken: receivedToken + token });
      dispatchUpdateBalance({ token, type: 'diamond-balance' });
    }
  }

  onbeforeunload = () => {
    this.leaveSession();
  };

  setStreamRefPublisher = (dataFunc) => {
    this.publisherRef2 = dataFunc;
  };

  setStreamRefSubscriber = (dataFunc) => {
    this.subscriberRef2 = dataFunc;
  };

  initSocketEvent() {
    this.socket = this.context;
    this.socket.on(JOINED_THE_ROOM, ({ streamId, streamList, conversationId }) => {
      const { activeConversation } = this.props;
      if (conversationId !== activeConversation.data._id) return;

      this.setState({ roomJoined: true });
      this.streamId = streamId;
      this.streamList = streamList;
      this.interval = setInterval(() => {
        const { callTime } = this.state;
        this.setState({ callTime: callTime + 1 });
      }, 60 * 1000);
      if (this.publisherRef.current.publish) this.publisherRef.current.publish(streamId);
      else this.publisherRef2.publish(streamId);
      if (streamList.length) {
        if (this.subscriberRef.current.play) this.subscriberRef.current.play(streamList[0]);
        else this.subscriberRef2.play(streamList[0]);
      }
    });
    this.socket.on(STREAM_JOINED, (data: { streamId: string }) => {
      if (this.streamId !== data.streamId) {
        if (this.subscriberRef.current.play) this.subscriberRef.current.play(data.streamId);
        else this.subscriberRef2.play(data.streamId);
      }
    });
    this.socket.on(STREAM_LEAVED, (data: { streamId: string }) => {
      this.streamList = this.streamList.filter((id) => id !== data.streamId);
    });
  }

  leaveSession() {
    const { activeConversation, resetStreamMessage: dispatchResetStreamMessage } = this.props;
    this.socket.off(JOINED_THE_ROOM);
    this.socket.off(STREAM_JOINED);
    this.socket.off(STREAM_LEAVED);
    dispatchResetStreamMessage();
    if (this.socket && activeConversation?.data?._id) {
      this.socket.emit(STREAM_EVENT.LEAVE_ROOM, {
        conversationId: activeConversation.data._id
      });
    }

    this.interval && clearInterval(this.interval);
    this.setState({
      processing: false,
      roomJoined: false,
      callTime: 0,
      receivedToken: 0,
      total: 0,
      members: []
    });
  }

  async acceptRequest() {
    const { query, getStreamConversationSuccess: dispatchGetStreamConversationSuccess } = this.props;
    if (!query.id) return;

    try {
      this.setState({ processing: true });
      const resp = await streamService.acceptPrivateChat(query.id);
      if (resp && resp.data) {
        const socket = this.context;
        const { sessionId, conversation } = resp.data;
        socket
          && socket.emit(STREAM_EVENT.JOIN_ROOM, {
            conversationId: conversation._id
          });
        if (this.publisherRef.current.start) this.publisherRef.current.start(conversation._id, sessionId);
        else this.publisherRef2.start(conversation._id, sessionId);
        dispatchGetStreamConversationSuccess({
          data: conversation
        });
      }
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
    } finally {
      this.setState({ processing: false });
    }
  }

  leave() {
    if (this.publisherRef.current.stop) this.publisherRef.current.stop();
    else this.publisherRef2.stop();

    if (this.subscriberRef.current.stop) this.subscriberRef.current.stop();
    else this.subscriberRef2.stop();

    setTimeout(() => {
      window.location.href = '/';
    }, 10 * 1000);
  }

  render() {
    // const { user } = this.props;
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      processing, total, members, roomJoined, callTime, receivedToken
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
        title: 'Received Diamond',
        description: `${receivedToken} diamond(s)`
      }
    ];

    return (
      <>
        <Header>
          <title>Private Chat</title>
        </Header>

        <Event event={STREAM_EVENT.STREAM_INFORMATION_CHANGED} handler={this.handler.bind(this)} handleRouterChange />
        <Event event={RECEIVED_PAID_TOKEN_EVENT} handler={this.handleReceivedPaidToken.bind(this)} />

        <div className="container">
          <Row gutter={{ sm: 10, xs: 0 }}>
            <Col md={12} xs={24}>
              {!roomJoined ? (
                <Button type="primary" onClick={this.acceptRequest.bind(this)} loading={processing} block>
                  Accept Private Call Request
                </Button>
              ) : (
                <Button type="primary" onClick={this.leave.bind(this)} block disabled={processing}>
                  Stop Streaming
                </Button>
              )}
              <div className="private-streaming-container ">
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
              <ChatBox {...this.props} totalParticipant={total} isPerformerScreen />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

ModelPrivateChat.contextType = SocketContext;

const mapStateToProps = (state) => ({
  activeConversation: state.streamMessage.activeConversation
});

const mapDispatchs = {
  accessPrivateRequest,
  getStreamConversationSuccess,
  resetStreamMessage,
  updateBalance
};

export default connect(mapStateToProps, mapDispatchs)(ModelPrivateChat);
