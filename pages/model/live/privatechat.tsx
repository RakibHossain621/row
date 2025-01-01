import { PureComponent } from 'react';
import Header from 'next/head';
import {
  Row, Col, message, List, Image
} from 'antd';
import Router from 'next/router';
import PrivateChatContainer from '@components/streaming/private-streaming-container';
import { IPerformer, ISettings } from 'src/interfaces';
import { performerService, streamService } from 'src/services';
import { connect } from 'react-redux';
import { accessPrivateRequest } from 'src/redux/streaming/actions';
import { SocketContext, Event } from 'src/socket';
import ChatBox from '@components/stream-chat/chat-box';
import { updateBalance } from '@redux/user/actions';
import {
  getStreamConversationSuccess,
  resetStreamMessage
} from '@redux/stream-chat/actions';
import { getResponseError } from '@lib/utils';
import { RECEIVED_PAID_TOKEN_EVENT, UPDATE_RUBY_MOST_SUPPORTED_EVENT } from 'src/constants';
import { ObservableQueue } from '@lib/hook/observable-queue';
import { of, delay } from 'rxjs';
import PerformerGridCard from '@components/performer/grid-card';
import { ArrowUpOutlined } from '@ant-design/icons';

import './index.less';
import AverageRubyReceivedInStream from '@components/streaming/average-ruby-reveiced';

const queue = new ObservableQueue();

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
  STREAM_INFORMATION_CHANGED = 'private-stream/streamInformationChanged',
  RUBY_RECEIVED_CHANGED = 'private-stream/rubyReceivedChanged',
  AVERAGE_RUBY_UPDATES_REVEIVED = 'average-ruby-received'
}

interface IProps {
  query: any;
  getStreamConversationSuccess: Function;
  activeConversation: any;
  resetStreamMessage: Function;
  accessPrivateRequest: Function;
  updateBalance: Function;
  currentUser: IPerformer;
  settings: ISettings;
}

interface IStates {
  roomJoined: boolean;
  total: number;
  callTime: number;
  receivedToken: number;
  nextRankRuby : number;
  mostSupportedPosition : number;
  fetching:boolean;
  imgURL: string;
  requestUser : IPerformer
  averageRubyReceived: number;
}

class ModelPrivateChat extends PureComponent<IProps, IStates> {
  static authenticate = true;

  static onlyPerformer = true;

  private interval: NodeJS.Timeout;

  private streamRef: any;

  private streamRef2: any;

  private socket;

  static async getInitialProps({ ctx }) {
    if (!ctx.query.id) {
      if (process.browser) {
        // Router.push('/');
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
      roomJoined: false,
      callTime: 0,
      receivedToken: 0,
      nextRankRuby: 0,
      mostSupportedPosition: 0,
      total: 0,
      fetching: false,
      imgURL: '',
      requestUser: null,
      averageRubyReceived: 0
    };
  }

  async componentDidMount() {
    try {
      const { query, accessPrivateRequest: access, currentUser } = this.props;
      if (query?.userId) {
        const res = await performerService.findOne(query?.userId);
        this.setState({ requestUser: res.data });
      }
      this.setState({ mostSupportedPosition: currentUser?.analytics?.mostSupportedPosition || 0 });
      this.getNextSupportedRanking();
      window.addEventListener('beforeunload', this.onbeforeunload);
      Router.events.on('routeChangeStart', this.onbeforeunload);
      access(query.id);
    } catch (error) {
      const e = Promise.resolve(error);
      message.error(getResponseError(e));
    }
  }

  componentDidUpdate(prevProps: IProps) {
    const { query, accessPrivateRequest: access } = this.props;
    if (prevProps.query.id !== query.id) {
      access(query.id);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    Router.events.off('routeChangeStart', this.onbeforeunload);
  }

  handler({ total }) {
    this.setState({ total });
  }

  handleReceivedPaidToken({ token }) {
    const { receivedToken } = this.state;
    this.setState({ receivedToken: receivedToken + token });
  }

  handleUpdateRubyMostSupported({ totalRuby, mostSupportedPosition }) {
    this.setState({ nextRankRuby: totalRuby, mostSupportedPosition });
  }

  onbeforeunload = () => {
    this.leaveSession();
  };

  setStreamRef = (dataFunc) => {
    this.streamRef2 = dataFunc;
  };

  async getNextSupportedRanking() {
    try {
      const { currentUser } = this.props;
      this.setState({ fetching: true });
      const resp = await performerService.getNextSupportedRanking(currentUser._id);
      if (resp.data) this.setState({ nextRankRuby: resp.data });
    } catch (error) {
      message.error('An error occurred, please try again!');
    } finally {
      this.setState({ fetching: false });
    }
  }

  onReceiveGift = async (dataMsg) => {
    const { duration, clip } = (dataMsg?.meta && dataMsg?.meta?.gift) || 0;
    const data = {
      url: clip && clip.url
    };
    this.addNew(data, 0).subscribe(this.renderImg);
    this.addNew(null, (duration || 0) * 1000).subscribe(this.renderImg);
  };

  createObservable = (data, playingTime) => of(data).pipe(delay(playingTime));

  addNew = (data: any, playingTime: number) => {
    const original = this.createObservable(data, playingTime);
    return queue.addItem(original);
  };

  renderImg = (result) => {
    result
      ? this.setState({ imgURL: result.url })
      : this.setState({ imgURL: null });
  };

  async acceptRequest() {
    const {
      query,
      getStreamConversationSuccess: dispatchGetStreamConversationSuccess
    } = this.props;
    if (!query.id) return;

    try {
      const resp = await streamService.acceptPrivateChat(query.id);
      if (resp && resp.data) {
        this.socket = this.context;
        const { sessionId, conversation } = resp.data;
        await this.socket.emit(STREAM_EVENT.JOIN_ROOM, {
          conversationId: conversation._id
        });
        if (this.streamRef?.start) {
          this.streamRef.start(sessionId, conversation._id);
        } else {
          this.streamRef2.start(sessionId, conversation._id);
        }
        this.socket.on(STREAM_EVENT.STREAM_INFORMATION_CHANGED, ({ total }) => {
          this.setState({ total });
        });
        dispatchGetStreamConversationSuccess({
          data: conversation
        });
        this.socket.on(
          `message_created_conversation_${conversation._id}`,
          (data) => {
            this.onReceiveGift(data);
          }
        );
      }
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
    }
  }

  roomJoinedHandler({ conversationId }) {
    const { activeConversation } = this.props;
    if (
      activeConversation?.data?._id
      && conversationId === activeConversation.data._id
    ) {
      this.setState({
        // total,
        // members,
        roomJoined: true
      });
      this.interval = setInterval(() => {
        const { callTime } = this.state;
        this.setState({ callTime: callTime + 1 });
      }, 60 * 1000);
    }
  }

  leaveSession() {
    const {
      activeConversation,
      resetStreamMessage: dispatchResetStreamMessage
    } = this.props;
    this.socket = this.context;
    if (this.socket && activeConversation?.data?._id) {
      this.socket.emit(STREAM_EVENT.LEAVE_ROOM, {
        conversationId: activeConversation.data._id
      });
      dispatchResetStreamMessage();
    }

    this.interval && clearInterval(this.interval);
    this.setState({
      roomJoined: false,
      callTime: 0,
      receivedToken: 0,
      total: 0
    });
  }

  handleUpdateRpm({ averageRubyReceived }) {
    this.setState({ averageRubyReceived });
  }

  render() {
    const {
      total, receivedToken, nextRankRuby, fetching, callTime, roomJoined, imgURL, mostSupportedPosition, requestUser, averageRubyReceived
    } = this.state;

    const dataSource = [
      {
        title: 'Call time',
        description: `${callTime} minute(s)`
      },
      {
        title: 'Status',
        description: roomJoined ? 'Live' : ''
      }
    ];

    return (
      <>
        <Header>
          <title>Private Chat</title>
        </Header>
        <Event
          event={STREAM_EVENT.JOINED_THE_ROOM}
          handler={this.roomJoinedHandler.bind(this)}
          handleRouterChange
        />
        <Event
          event={RECEIVED_PAID_TOKEN_EVENT}
          handler={this.handleReceivedPaidToken.bind(this)}
        />
        <Event
          event={UPDATE_RUBY_MOST_SUPPORTED_EVENT}
          handler={this.handleUpdateRubyMostSupported.bind(this)}
        />
        <Event event={STREAM_EVENT.AVERAGE_RUBY_UPDATES_REVEIVED} handler={this.handleUpdateRpm.bind(this)} />
        <div className="container">
          <Row className="per-infor">
            <Col xs={12} sm={12} md={12}>
              <div className="per-col">
                <div className="avatar-stream">
                  <span>Private Broadcaster</span>
                  {requestUser && (
                  <PerformerGridCard
                    modelNumber={0}
                    performer={requestUser}
                    pathname="/model/profile"
                    as={`/${requestUser?.username || requestUser?._id}`}
                    showButtonFollow
                    title="Follow"
                    getPerformerList={() => { }}
                    showModelNumber={false}
                  />
                  ) }
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={3}>
              <AverageRubyReceivedInStream averageRubyReceived={averageRubyReceived} />
            </Col>
            <Col xs={12} sm={12} md={3}>
              <div className="per-col">
                <div>
                  <span>
                    #
                    {mostSupportedPosition}
                  </span>
                </div>
                <div className="per-ranking">
                  <Image
                    src="/static/mostFollower.png"
                    alt="mostFollower"
                    preview={false}
                  />
                  <span>Most Supported</span>
                </div>
                {!!nextRankRuby && !fetching
                && (
                <div>
                  <ArrowUpOutlined style={{ color: '#0bdd0b' }} />
                  <span>
                    Next
                    {' '}
                    {nextRankRuby}
                  </span>
                  <img src="/static/diamond.png" alt="diamond" />
                </div>
                )}
              </div>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <div className="per-col">
                <table className="stream-table">
                  <tr>
                    <td>{receivedToken}</td>
                    <td>
                      <img src="/static/diamond.png" alt="diamond" />
                      {' '}
                      received this session
                    </td>
                  </tr>
                </table>
              </div>
            </Col>
          </Row>
          <Row gutter={{ sm: 10, xs: 0 }}>
            <Col md={12} xs={24}>
              <PrivateChatContainer
                // eslint-disable-next-line no-return-assign
                ref={(ref) => (this.streamRef = ref)}
                sessionId=""
                configs={{
                  localVideoId: 'private-publisher'
                }}
                onClick={this.acceptRequest.bind(this)}
                setStreamRef={this.setStreamRef}
                isRoomOwner
              />
              {imgURL && (
                <div className="animation animation-private">
                  <img src={imgURL} alt="gift" />
                </div>
              )}
              <List
                dataSource={dataSource}
                renderItem={(item) => (
                  <ListItem description={item.description} title={item.title} />
                )}
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
  activeConversation: state.streamMessage.activeConversation,
  currentUser: { ...state.user.current },
  settings: { ...state.settings }
});

const mapDispatchs = {
  accessPrivateRequest,
  getStreamConversationSuccess,
  resetStreamMessage,
  updateBalance
};

export default connect(mapStateToProps, mapDispatchs)(ModelPrivateChat);
