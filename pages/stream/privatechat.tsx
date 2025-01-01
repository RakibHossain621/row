import React, { PureComponent } from 'react';
import Header from 'next/head';
import {
  Row, Col, message, List
} from 'antd';
import Router from 'next/router';
import PrivateChatContainer from '@components/streaming/private-streaming-container';
import { IPerformer, IUser, ICountry } from 'src/interfaces';
import '@components/performer/performer.less';
import './index.less';
import {
  performerService,
  streamService,
  utilsService,
  giftService,
  tokenTransctionService
} from 'src/services';
import { connect } from 'react-redux';
import {
  getStreamConversationSuccess,
  resetStreamMessage
} from '@redux/stream-chat/actions';
import { updateBalance } from '@redux/user/actions';
import { SocketContext, Event } from 'src/socket';
import nextCookie from 'next-cookies';
import ChatBox from '@components/stream-chat/chat-box';
import { getResponseError } from '@lib/utils';
import GiftPage from '@components/gift';
import FavoriteGift from '@components/favorite-gift';
import { ObservableQueue } from '@lib/hook/observable-queue';
import { of, delay } from 'rxjs';
import { isMobile } from 'react-device-detect';
import AverageRubyReceivedInStream from '@components/streaming/average-ruby-reveiced';

const queue = new ObservableQueue();

// eslint-disable-next-line no-shadow
enum EVENT {
  JOINED_THE_ROOM = 'JOINED_THE_ROOM',
  JOIN_ROOM = 'JOIN_ROOM',
  LEAVE_ROOM = 'LEAVE_ROOM',
  STREAM_INFORMATION_CHANGED = 'private-stream/streamInformationChanged',
  MODEL_JOIN_ROOM = 'MODEL_JOIN_ROOM',
  AVERAGE_RUBY_UPDATES_REVEIVED = 'average-ruby-received'
}

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
  currentUser: IPerformer;
  getStreamConversationSuccess: Function;
  activeConversation: any;
  resetStreamMessage: Function;
  updateBalance: Function;
  countries: ICountry[];
  sessionId: string;
}

interface IStates {
  roomJoined: boolean;
  total: number;
  members: IUser[];
  callTime: number;
  paidToken: number;
  favoriteGift: any;
  sessionEarningId :string
  imgURL:string;
  loading: boolean;
  averageRubyReceived: number;
}

class UserPrivateChat extends PureComponent<IProps, IStates> {
  static authenticate = true;

  private streamRef: any;

  private streamRef2: any;

  private interval: NodeJS.Timeout;

  private socket;

  static async getInitialProps({ ctx }) {
    try {
      const { query } = ctx;
      if (process.browser && query.performer) {
        return {
          performer: JSON.parse(query.performer),
          sessionId: query.sessionId
        };
      }
      const countries = await utilsService.countriesList();

      const { token } = nextCookie(ctx);
      const headers = { Authorization: token };
      const resp = await performerService.findOne(query.username, headers);
      // eslint-disable-next-line no-console
      const performer: IPerformer = resp.data;
      if (!performer.isSubscribed) {
        throw new Error();
      }
      return {
        performer,
        countries: countries?.data || [],
        sessionId: query.sessionId
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
      favoriteGift: {},
      roomJoined: false,
      loading: false,
      total: 0,
      callTime: 0,
      paidToken: 0,
      sessionEarningId: '',
      imgURL: '',
      members: [],
      averageRubyReceived: 0
    };
  }

  componentDidMount() {
    const { currentUser } = this.props;
    if (!currentUser?._id) {
      message.error('You not have permission to access this page');
      Router.push('/home');
    }
    this.getfavoriteGift();

    window.addEventListener('beforeunload', this.onbeforeunload);
    Router.events.on('routeChangeStart', this.onbeforeunload);
    this.startStream();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    Router.events.off('routeChangeStart', this.onbeforeunload);
  }

  handler({ total, members, conversationId }) {
    const { activeConversation } = this.props;
    if (
      activeConversation?.data?._id
      && activeConversation.data._id === conversationId
    ) {
      this.setState({ total, members });
    }
  }

  async handleModelJoinRoom({ conversationId }) {
    message.success('Model joined the room!');
    const { activeConversation, performer, currentUser } = this.props;
    if (
      activeConversation?.data?._id
      && activeConversation.data._id === conversationId
    ) {
      this.interval = setInterval(() => {
        const { callTime } = this.state;
        if (currentUser.rubyBalance < performer.privateChatPrice) {
          message.warn('Your balance is not enough wallet.');
          setTimeout(() => window.location.reload(), 10 * 1000);
          return;
        }

        this.setState({ callTime: callTime + 1 });
        this.sendPaidToken(conversationId);
      }, 60 * 1000);
    }
  }

  onbeforeunload = () => {
    this.leaveSession();
  };

  getfavoriteGift = async () => {
    this.setState({ loading: true });
    const respGift = await (await giftService.favoriteGift()).data;
    await this.setState({ favoriteGift: respGift.data[0] });
    this.setState({ loading: false });
  };

  createObservable =(data, playingTime) => of(data).pipe(delay(playingTime))

  addNew =(data: any, playingTime: number) => {
    const original = this.createObservable(data, playingTime);
    return queue.addItem(original);
  }

  renderImg =(result) => {
    result ? this.setState({ imgURL: result.url }) : this.setState({ imgURL: null });
  }

  onReceiveGift = async (dataMsg) => {
    const { duration, clip } = (dataMsg?.meta && dataMsg?.meta?.gift) || 0;
    const data = {
      url: clip && clip.url
    };
    this.addNew(data, 0).subscribe(this.renderImg);
    this.addNew(null, (duration || 0) * 1000).subscribe(this.renderImg);
  };

  setStreamRef = (dataFunc) => {
    this.streamRef2 = dataFunc;
  };

  favoriteHandle(gift) {
    this.setState({ favoriteGift: gift });
    giftService.addfavoriteGift({ giftId: gift._id });
  }

  stopBroadcast() {
    if (this.streamRef?.stop) this.streamRef.stop();
    else this.streamRef2.stop();
    setTimeout(() => {
      window.location.href = '/';
    }, 5 * 1000);
    message.success('Stream has been stopped. You will be redirected to homepage');
  }

  async sendPaidToken(conversationId: string, firstMinute: boolean = false) {
    // first Minutes is paid *5 privateChatFee
    try {
      const { performer, updateBalance: dispatchUpdateBalance, sessionId } = this.props;
      const { paidToken } = this.state;
      await tokenTransctionService.sendPaidToken(conversationId, { firstMinute, sessionId });
      const newState = { paidToken: firstMinute ? paidToken + performer.privateChatPrice * 5 : paidToken + performer.privateChatPrice };
      this.setState(newState);
      dispatchUpdateBalance({
        token: firstMinute ? (performer.privateChatPrice * 5) * -1 : performer.privateChatPrice * -1,
        type: 'ruby-balance'
      });
    } catch (err) {
      const error = await Promise.resolve(err);
      if (error.statusCode === 422) {
        message.error('Your wallets do not enough, please buy more.');
        clearInterval(this.interval);
        this.stopBroadcast();
      }
    }
  }

  roomJoinedHandler({ total, members, conversationId }) {
    const { activeConversation } = this.props;
    if (
      activeConversation?.data?._id
      && conversationId === activeConversation.data._id
    ) {
      this.setState({
        total,
        members,
        roomJoined: true,
        callTime: 0
      });
    }
  }

  async sendRequest() {
    const {
      performer,
      getStreamConversationSuccess: dispatchGetStreamConversationSuccess
    } = this.props;
    try {
      const resp = await streamService.requestPrivateChat(performer._id);
      const { sessionId, conversation } = resp.data;
      this.socket = this.context;
      message.success(
        `${performer.username} is getting ready and will be starting soon`
      );

      if (this.streamRef?.start) { this.streamRef.start(sessionId, conversation._id); } else this.streamRef2.start(sessionId, conversation._id);
      this.socket.emit(EVENT.JOIN_ROOM, {
        conversationId: conversation._id
      });
      dispatchGetStreamConversationSuccess({
        data: conversation
      });
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
    }
  }

  async startStream() {
    const {
      sessionId, activeConversation, currentUser, performer
    } = this.props;
    try {
      if (sessionId) {
        this.socket = this.context;
        if (this.streamRef?.start) { this.streamRef.start(sessionId, activeConversation?.data._id); } else this.streamRef2.start(sessionId, activeConversation?.data._id);
        this.socket.emit(EVENT.JOIN_ROOM, {
          conversationId: activeConversation?.data._id
        });
        this.socket.on(`message_created_conversation_${activeConversation?.data._id}`, (data) => {
          this.onReceiveGift(data);
        });
        this.sendPaidToken(activeConversation?.data._id, true);

        this.interval = setInterval(() => {
          const { callTime } = this.state;
          if (currentUser.rubyBalance < performer.privateChatPrice) {
            message.warn('Your balance is not enough wallet.');
            setTimeout(() => window.location.reload(), 10 * 1000);
            return;
          }

          this.setState({ callTime: callTime + 1 });
          this.sendPaidToken(activeConversation?.data._id);
        }, 60 * 1000);
      }
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
    }
  }

  leaveSession() {
    const {
      activeConversation,
      resetStreamMessage: dispatchResetStreamMessage
    } = this.props;
    dispatchResetStreamMessage();
    if (this.socket && activeConversation && activeConversation.data) {
      this.socket.emit(EVENT.LEAVE_ROOM, {
        conversationId: activeConversation.data._id
      });
    }

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.setState({
      roomJoined: false,
      paidToken: 0,
      callTime: 0,
      total: 0,
      members: []
    });
  }

  handleUpdateRpm({ averageRubyReceived }) {
    this.setState({ averageRubyReceived });
  }

  render() {
    const {
      performer, activeConversation, currentUser, sessionId
    } = this.props;
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      total, members, imgURL, loading, roomJoined, callTime, paidToken, sessionEarningId, favoriteGift, averageRubyReceived
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
        title: 'Paid',
        description: `${paidToken} ruby(s)`
      },
      {
        title: 'Amount per minute',
        description: `${performer.privateChatPrice} ruby(s)` || 'N/A'
      }
    ];

    return (
      <>
        <Header>
          <title>Private Chat</title>
        </Header>
        <Event
          event={EVENT.STREAM_INFORMATION_CHANGED}
          handler={this.handler.bind(this)}
        />
        <Event
          event={EVENT.JOINED_THE_ROOM}
          handler={this.roomJoinedHandler.bind(this)}
        />
        <Event event={EVENT.AVERAGE_RUBY_UPDATES_REVEIVED} handler={this.handleUpdateRpm.bind(this)} />
        {/* <Event event={EVENT.MODEL_JOIN_ROOM} handler={this.handleModelJoinRoom.bind(this)} /> */}

        <div className="container">
          <Row gutter={{ sm: 10, xs: 0 }}>
            <Col md={14} xs={24}>
              <PrivateChatContainer
                // eslint-disable-next-line no-return-assign
                ref={(ref) => (this.streamRef = ref)}
                configs={{
                  localVideoId: 'private-publisher'
                }}
                onClick={this.startStream.bind(this)}
                setStreamRef={this.setStreamRef}
              />
              {imgURL && (
                <div className="animation animation-private">
                  <img src={imgURL} alt="gift" />
                </div>
              ) }
              <List
                dataSource={dataSource}
                renderItem={(item) => (
                  <ListItem description={item.description} title={item.title} />
                )}
              />
            </Col>
            {isMobile && (
              <Col md={3} xs={8}>
                <AverageRubyReceivedInStream averageRubyReceived={averageRubyReceived} />
              </Col>
            )}
            <Col md={1} xs={24}>
              <FavoriteGift streamType={activeConversation?.data?.type} sessionId={sessionId} performerId={performer._id} conversationId={activeConversation?.data?._id} favorGift={favoriteGift} />
            </Col>
            <Col md={9} xs={24}>
              {!loading && <GiftPage sessionEarningId={sessionEarningId} sessionId={sessionId} currentUser={currentUser} performerId={performer._id} conversationId={activeConversation?.data?._id} streamType={activeConversation?.data?.type} saveFavorite={this.favoriteHandle.bind(this)} favorGift={favoriteGift} />}
              <ChatBox
                {...this.props}
                totalParticipant={total}
              />
            </Col>
            {!isMobile && (
              <Col md={3} xs={8}>
                <AverageRubyReceivedInStream averageRubyReceived={averageRubyReceived} />
              </Col>
            )}
          </Row>
        </div>
      </>
    );
  }
}

UserPrivateChat.contextType = SocketContext;

const mapStateToProps = (state) => ({
  currentUser: state.user.current,
  activeConversation: state.streamMessage.activeConversation
});
const mapDispatchs = {
  getStreamConversationSuccess,
  resetStreamMessage,
  updateBalance
};
export default connect(mapStateToProps, mapDispatchs)(UserPrivateChat);
