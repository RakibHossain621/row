import React, { PureComponent } from 'react';
import Head from 'next/head';
import {
  Row, Col, Table, Button, message, Avatar, Image
} from 'antd';
import { connect } from 'react-redux';
import { ISettings, IPerformer } from 'src/interfaces';
import { messageService, performerService, streamService } from 'src/services';
import LivePublisher from '@components/streaming/publisher';
import { SocketContext, Event } from 'src/socket';
import { DeleteOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { formatDate } from '@lib/date';
import {
  getStreamConversation,
  resetStreamMessage,
  resetMuteStreamMessage
} from '@redux/stream-chat/actions';
import { WEBRTC_ADAPTOR_INFORMATIONS } from 'src/antmedia/constants';
import ChatBox from '@components/stream-chat/chat-box';
import Router from 'next/router';
import './index.less';
import { getResponseError } from '@lib/utils';
import {
  RECEIVED_PAID_TOKEN_EVENT, ROLE_PERMISSIONS, UPDATE_RUBY_MOST_SUPPORTED_EVENT, UPDATE_TOP_GIFTED_EVENT, UPDATE_TOTAL_RUBY_IN_ROOM
} from 'src/constants';
import { ObservableQueue } from '@lib/hook/observable-queue';
import { of, delay } from 'rxjs';
import PerformerGridCard from '@components/performer/grid-card';
import AverageRubyReceivedInStream from '@components/streaming/average-ruby-reveiced';

const queue = new ObservableQueue();

// eslint-disable-next-line no-shadow
enum EVENT_NAME {
  ROOM_INFORMATIOM_CHANGED = 'public-room-changed',
  REMOVE_STREAM_BY_ADMIN = 'remove-stream-by-admin',
  AVERAGE_RUBY_UPDATES_REVEIVED = 'average-ruby-received'
}

interface IProps {
  resetStreamMessage: Function;
  getStreamConversation: Function;
  activeConversation: any;
  user: IPerformer
  settings: ISettings;
  loggedIn:boolean;
  muteMessage:any;
  resetMuteStreamMessage : Function;
}

interface IStates {
  loading: boolean;
  fetching: boolean;
  sessionId: string;
  initialized: boolean;
  total: number;
  nextRankRuby: number;
  mostSupportedPosition : number;
  totalRubysInRoom: number;
  receivedToken: number;
  hasRole:boolean;
  dataSource: any[];
  topRubiesGiftedSession :any[];
  pagination: any ;
  limit: number;
  filter: {};
  sortBy: string;
  sort: string;
  imgURL:string;
  time: number;
  averageRubyReceived: number;
}

class PerformerLivePage extends PureComponent<IProps, IStates> {
  static authenticate = true;

  static onlyPerformer = false;

  private publisherRef: any;

  private publisherRef2: any;

  interval: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      loading: false,
      fetching: false,
      initialized: false,
      sessionId: '',
      total: 0,
      nextRankRuby: 0,
      mostSupportedPosition: 0,
      receivedToken: 0,
      totalRubysInRoom: 0,
      hasRole: false,
      dataSource: [],
      topRubiesGiftedSession: [],
      pagination: {} as any,
      limit: 10,
      filter: {} as any,
      sortBy: 'updatedAt',
      sort: 'desc',
      imgURL: null,
      time: 0,
      averageRubyReceived: 0
    };
    this.incrementTime = this.incrementTime.bind(this);
    this.interval = null;
  }

  async componentDidMount() {
    try {
      const { user } = this.props;
      this.setState({ mostSupportedPosition: user?.analytics?.mostSupportedPosition || 0 });
      const resp = await performerService.checkRole({ roles: [ROLE_PERMISSIONS.ROLE_HOST_LIVE] });
      await this.setState({ hasRole: resp?.data, imgURL: null });
      const { hasRole } = this.state;
      const { settings } = this.props;
      this.joinPublicRoom();
      window.addEventListener('beforeunload', this.onbeforeunload);
      Router.events.on('routeChangeStart', this.onbeforeunload);
      this.getNextSupportedRanking();
      this.getMutes();
    } catch (error) {
      const e = Promise.resolve(error);
      message.error(getResponseError(e));
    }
  }

  componentDidUpdate(previousProps: IProps) {
    const { muteMessage, resetMuteStreamMessage: resetMuteListStatus } = this.props;
    if ((!previousProps?.muteMessage?.success) && muteMessage?.success) {
      message.success(` You've muted ${muteMessage.data.userInfo.username || 'this user'}`);
      this.getMutes();
      resetMuteListStatus();
    }
  }

  incrementTime() {
    const { activeConversation } = this.props;
    const conversation = { ...activeConversation.data };
    const { receivedToken } = this.state;
    const socket = this.context;
    this.setState(prevState => {
        const newTime = prevState.time + 1;
        socket.emit('update-stream-time', { conversationId: conversation._id, time: newTime, receivedToken });
        return { time: newTime };
    });
}

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('beforeunload', this.onbeforeunload);
    Router.events.off('routeChangeStart', this.onbeforeunload);
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { pagination: paginationVal } = this.state;
    const pager = { ...paginationVal };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
      sortBy: sorter.field || '',
      // eslint-disable-next-line no-nested-ternary
      sort: sorter.order ? (sorter.order === 'descend' ? 'desc' : 'asc') : ''
    });
    this.getMutes(pager.current);
  };

  handler({ total }) {
    // const totalBalance = this.calculateTotalBalance(members, 'rubyBalance');
    this.setState({ total });
  }

  handleUpdateTotalRubyInRoom({ totalRubys }) {
    this.setState({ totalRubysInRoom: totalRubys });
  }

  handleUpdateTopGifted({ topRubiesGiftedSession }) {
    this.setState({ topRubiesGiftedSession });
  }

  handleReceivedPaidToken({ token }) {
    const { receivedToken } = this.state;
    this.setState({ receivedToken: receivedToken + token });
  }

  handleAdminRemoveStream() {
    message.warn('Your stream has been closed by admin, stream session will stop within 5 seconds !!!');
    setTimeout(() => window.location.reload(), 5000);
  }

  handleUpdateRubyMostSupported({ totalRuby, mostSupportedPosition }) {
    this.setState({ nextRankRuby: totalRuby, mostSupportedPosition });
  }

  async onDelete(id) {
    if (!window.confirm('Are you sure to unmute user?')) return;
    try {
      await messageService.unMuteUser(id);
      this.getMutes();
      message.success('Unmute user successfully');
    } catch (e) {
      message.error('An error occurred, please try again!');
    }
  }

  async getNextSupportedRanking() {
    try {
      const { user } = this.props;
      this.setState({ fetching: true });
      const resp = await performerService.getNextSupportedRanking(user._id);
      if (resp.data) this.setState({ nextRankRuby: resp.data });
    } catch (error) {
      this.setState({ fetching: false });
      message.error('An error occurred, please try again!');
    } finally {
      this.setState({ fetching: false });
    }
  }

  async getMutes(page = 1) {
    try {
      const {
        filter, limit, sort, sortBy, pagination
      } = this.state;
      this.setState({ fetching: true });
      const resp = await messageService.loadMuteUsers({
        ...filter,
        limit,
        offset: (page - 1) * limit,
        sort,
        sortBy
      });

      this.setState({
        fetching: false,
        dataSource: resp.data.data,
        pagination: {
          ...pagination,
          total: resp.data.total,
          pageSize: limit
        }
      });
    } catch (e) {
      message.error('An error occurred, please try again!');
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

   calculateTotalBalance = (members, properties) => {
     const total = members.reduce((accumulator, object) => accumulator + object[properties], 0);
     return total || 0;
   }

  createObservable =(data, playingTime) => of(data).pipe(delay(playingTime))

  addNew =(data: any, playingTime: number) => {
    const original = this.createObservable(data, playingTime);
    return queue.addItem(original);
  }

  renderImg =(result) => {
    result ? this.setState({ imgURL: result.url }) : this.setState({ imgURL: null });
  }

  onbeforeunload = () => {
    this.leavePublicRoom();
  }

  setStreamRef = (dataFunc) => {
    this.publisherRef2 = dataFunc;
  };

  async callback(info: WEBRTC_ADAPTOR_INFORMATIONS) {
    const { activeConversation } = this.props;
    const { sessionId } = this.state;
    if (activeConversation && activeConversation.data) {
      const socket = this.context;
      if (info === WEBRTC_ADAPTOR_INFORMATIONS.INITIALIZED) {
        this.setState({ initialized: true });
        // const resp = await streamService.goLive();
        // window['webRTCAdaptor'].publish(sessionId);
        if (this.publisherRef.publish) this.publisherRef.publish(sessionId);
        else this.publisherRef2.publish(sessionId);
      } else if (info === WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_STARTED) {
        const conversation = { ...activeConversation.data };
        socket.emit('public-stream/live', { conversationId: conversation._id });
        this.interval = setInterval(this.incrementTime, 60 * 1000);
        this.setState({ loading: false });
      } else if (info === WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_FINISHED) {
        this.setState({ loading: false });
      } else if (info === WEBRTC_ADAPTOR_INFORMATIONS.CLOSED) {
        this.setState({ loading: false, initialized: false });
      }
    }
  }

  async joinPublicRoom() {
    const { getStreamConversation: dispatchGetStreamConversation } = this.props;
    const socket = this.context;
    try {
      this.setState({ loading: true });
      const resp = await streamService.goLive();
      const { conversation } = resp.data;
      const { sessionId } = resp.data;

      this.setState({ sessionId });

      if (conversation && conversation._id) {
        dispatchGetStreamConversation({
          conversation
        });
        socket && socket.on(`message_created_conversation_${conversation._id}`, (data) => {
          this.onReceiveGift(data);
        });
        socket && socket.emit('public-stream/join', {
          conversationId: conversation._id
        });
        message.success({
          key: 'message-before-stream',
          content: 'Please click Start stream to initiate streaming'
        }, 2);
      }
    } catch (e) {
      const error = await Promise.resolve(e);
      message.error(getResponseError(error));
    } finally {
      this.setState({ loading: false });
    }
  }

  leavePublicRoom() {
    const { activeConversation, resetStreamMessage: reset } = this.props;
    const socket = this.context;
    if (socket && activeConversation && activeConversation.data) {
      const conversation = { ...activeConversation.data };
      socket && socket.emit('public-stream/leave', { conversationId: conversation._id });
      socket && socket.off(`message_created_conversation_${conversation._id}`);
      reset();
    }
  }

  async start() {
    this.setState({ loading: true });
    try {
      if (this.publisherRef.start) this.publisherRef.start();
      else this.publisherRef2.start();
      message.success({ key: 'streaming', content: 'You’re live now' }, 2);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error_broadcast', await e);
    } finally {
      this.setState({ loading: false });
    }
  }

  stop() {
    // need refactor , socket to stop not reload page
    const { initialized } = this.state;
    if (!initialized) {
      window.location.reload();
      return;
    }

    if (window.confirm('Are you sure want to stop this live streaming!')) {
      window.location.reload();
    }
  }

  handleUpdateRpm({ averageRubyReceived }) {
    this.setState({ averageRubyReceived });
  }

  render() {
    const {
      loading, receivedToken, initialized, total, dataSource, pagination, fetching, imgURL, nextRankRuby,
      totalRubysInRoom, mostSupportedPosition, topRubiesGiftedSession, time, averageRubyReceived
    } = this.state;
    const { user } = this.props;

    const topGiftColumns = [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        render: (item, record, index) => (<>{index + 1}</>)
      },
      {
        title: 'Name',
        dataIndex: 'userInfo',
        key: 'user',
        render: (userInfo: IPerformer) => (
          <span>
            {userInfo.name || userInfo.username}
            {' '}
          </span>
        )
      },
      {
        title: 'Rubies',
        dataIndex: 'totalRubiesGifted',
        key: 'totalRubiesGifted',
        render: (totalRubiesGifted: any) => (
          <span>
            {totalRubiesGifted}
            {' '}
          </span>
        )
      }
    ];

    const columns = [
      {
        title: 'User',
        dataIndex: 'userInfo',
        key: 'user',
        render: (userInfo: any) => (
          <span>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Avatar src={userInfo?.avatar || '/static/no-avatar.png'} size={28} />
            {' '}
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {userInfo?.name || userInfo?.username || 'N/A'}
          </span>
        )
      },
      {
        title: 'Username',
        dataIndex: 'userInfo',
        key: 'username',
        render: (userInfo: any) => (
          <span>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {userInfo?.username || 'N/A'}
          </span>
        )
      },
      {
        title: 'Date Added',
        dataIndex: 'createdAt',
        render(date: Date) {
          return <span>{formatDate(date)}</span>;
        }
      },
      {
        title: 'Delete',
        dataIndex: '_id',
        render: (id: string) => (
          <div style={{ whiteSpace: 'nowrap' }}>
            <Button onClick={this.onDelete.bind(this, id)} className="danger">
              <DeleteOutlined />
            </Button>
          </div>
        )
      }
    ];
    return (
      <>
        <Head>
          <title>Live</title>
        </Head>
        <Event
          event={EVENT_NAME.ROOM_INFORMATIOM_CHANGED}
          handler={this.handler.bind(this)}
        />
        <Event
          event={EVENT_NAME.REMOVE_STREAM_BY_ADMIN}
          handler={this.handleAdminRemoveStream.bind(this)}
        />
        <Event
          event={RECEIVED_PAID_TOKEN_EVENT}
          handler={this.handleReceivedPaidToken.bind(this)}
        />
        <Event
          event={UPDATE_RUBY_MOST_SUPPORTED_EVENT}
          handler={this.handleUpdateRubyMostSupported.bind(this)}
        />
        <Event
          event={UPDATE_TOP_GIFTED_EVENT}
          handler={this.handleUpdateTopGifted.bind(this)}
        />
        <Event
          event={UPDATE_TOTAL_RUBY_IN_ROOM}
          handler={this.handleUpdateTotalRubyInRoom.bind(this)}
        />
        <Event event={EVENT_NAME.AVERAGE_RUBY_UPDATES_REVEIVED} handler={this.handleUpdateRpm.bind(this)} />
        <div className="main-container">
          <div className="page-heading">
            <span className="anticon anticon-eye">
              <svg height="1em" viewBox="-16 0 512 512.00113" width="1em" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor">
                  <path d="m262.84375 140.558594c-12.699219 12.671875-33.28125 12.671875-45.980469 0-12.695312-12.671875-12.695312-33.21875 0-45.890625 12.699219-12.671875 33.28125-12.671875 45.980469 0 12.695312 12.671875 12.695312 33.21875 0 45.890625zm0 0" />
                  <path d="m307.257812 189.726562c-3.960937 0-7.921874-1.511718-10.9375-4.539062-6.03125-6.039062-6.019531-15.824219.019532-21.851562 12.238281-12.214844 18.976562-28.453126 18.976562-45.722657s-6.738281-33.507812-18.976562-45.722656c-6.039063-6.03125-6.050782-15.8125-.019532-21.855469 6.027344-6.039062 15.8125-6.050781 21.851563-.019531 18.089844 18.054687 28.050781 42.058594 28.050781 67.597656 0 25.535157-9.960937 49.542969-28.050781 67.597657-3.015625 3.011718-6.964844 4.515624-10.914063 4.515624zm0 0" />
                  <path d="m342.210938 235.222656c-3.960938 0-7.921876-1.511718-10.9375-4.535156-6.03125-6.042969-6.019532-15.824219.019531-21.855469 24.414062-24.367187 37.863281-56.761719 37.863281-91.21875s-13.449219-66.851562-37.863281-91.21875c-6.039063-6.03125-6.050781-15.8125-.019531-21.855469 6.03125-6.039062 15.8125-6.050781 21.851562-.019531 30.265625 30.207031 46.9375 70.371094 46.933594 113.09375 0 42.722657-16.667969 82.890625-46.933594 113.097657-3.015625 3.007812-6.964844 4.511718-10.914062 4.511718zm0 0" />
                  <path d="m172.371094 189.726562c-3.949219 0-7.898438-1.503906-10.917969-4.515624-18.089844-18.054688-28.050781-42.0625-28.050781-67.597657 0-25.539062 9.960937-49.542969 28.050781-67.597656 6.039063-6.03125 15.824219-6.023437 21.851563.019531 6.03125 6.039063 6.019531 15.824219-.019532 21.855469-12.238281 12.214844-18.976562 28.453125-18.976562 45.722656s6.738281 33.507813 18.976562 45.722657c6.039063 6.027343 6.050782 15.8125.019532 21.851562-3.015626 3.023438-6.976563 4.539062-10.933594 4.539062zm0 0" />
                  <path d="m137.417969 235.222656c-3.953125 0-7.902344-1.503906-10.917969-4.515625-30.265625-30.207031-46.933594-70.371093-46.933594-113.09375 0-42.726562 16.667969-82.890625 46.933594-113.097656 6.039062-6.027344 15.824219-6.019531 21.851562.023437 6.03125 6.039063 6.019532 15.820313-.019531 21.851563-24.414062 24.367187-37.863281 56.761719-37.863281 91.21875s13.449219 66.855469 37.863281 91.222656c6.039063 6.03125 6.050781 15.8125.019531 21.855469-3.015624 3.023438-6.976562 4.535156-10.933593 4.535156zm0 0" />
                  <path d="m443.480469 261.9375h-407.332031c-19.964844 0-36.148438 16.183594-36.148438 36.144531v177.769531c0 19.964844 16.183594 36.148438 36.148438 36.148438h407.328124c19.964844 0 36.148438-16.183594 36.148438-36.148438v-177.769531c0-19.960937-16.183594-36.144531-36.144531-36.144531zm-324.609375 203.683594h-56.933594c-8.53125 0-15.449219-6.917969-15.449219-15.453125v-126.398438c0-8.53125 6.917969-15.453125 15.449219-15.453125 8.535156 0 15.453125 6.917969 15.453125 15.453125v110.945313h41.480469c8.535156 0 15.453125 6.917968 15.453125 15.453125 0 8.535156-6.917969 15.453125-15.453125 15.453125zm63.328125-15.453125c0 8.535156-6.917969 15.453125-15.453125 15.453125s-15.453125-6.917969-15.453125-15.453125v-126.398438c0-8.53125 6.917969-15.453125 15.453125-15.453125s15.453125 6.917969 15.453125 15.453125zm130.015625-121.929688-38.160156 126.394531c-.003907.011719-.007813.023438-.011719.035157-4.144531 14.144531-25.273438 13.796875-29.5625 0-.003907-.011719-.007813-.023438-.011719-.035157l-38.160156-126.394531c-2.464844-8.171875 2.15625-16.792969 10.328125-19.261719 8.164062-2.464843 16.792969 2.15625 19.257812 10.328126l23.367188 77.394531 23.367187-77.394531c2.46875-8.171876 11.089844-12.796876 19.261719-10.328126 8.167969 2.46875 12.792969 11.089844 10.324219 19.261719zm95.066406 35.320313c8.535156 0 15.453125 6.917968 15.453125 15.453125 0 8.53125-6.917969 15.453125-15.453125 15.453125h-43.851562v40.25h52.175781c8.535156 0 15.453125 6.917968 15.453125 15.453125 0 8.535156-6.917969 15.453125-15.453125 15.453125h-67.628907c-8.535156 0-15.453124-6.917969-15.453124-15.453125v-126.398438c0-8.53125 6.917968-15.453125 15.453124-15.453125h69.710938c8.53125 0 15.453125 6.917969 15.453125 15.453125 0 8.535157-6.921875 15.453125-15.453125 15.453125h-54.261719v24.335938zm0 0" />
                </g>
              </svg>
            </span>
            {' '}
            Live Broadcaster
          </div>
          <Row>
            <Col xs={24} sm={24} md={12}>
              <LivePublisher
                ref={(ref) => {
                  this.publisherRef = ref;
                }}
                onChange={this.callback.bind(this)}
                configs={{
                  debug: true,
                  bandwidth: 900,
                  localVideoId: 'publisher'
                }}
                setStreamRef={this.setStreamRef}
              />
              {imgURL && (
              <div className="animation">
                <img src={imgURL} alt="gift" />
              </div>
              ) }
              {!initialized ? (
                <Button
                  type="primary"
                  onClick={this.start.bind(this)}
                  loading={loading}
                  block
                >
                  Start Streaming
                </Button>
              ) : (
                <Button
                  className="secondary"
                  onClick={this.stop.bind(this)}
                  loading={loading}
                  block
                >
                  Stop Streaming
                </Button>
              )}
            </Col>
            <Col xs={24} sm={24} md={12}>
              {user.verifiedDocument && <div className="roomstats" /> }
              <ChatBox
                {...this.props}
                totalParticipant={total}
                isPerformerScreen
              />
            </Col>
          </Row>
          <Row className="per-infor">
            <Col xs={10} sm={10} md={4}>
              <div className="per-col">
                <div className="avatar-stream">
                  {user && (
                  <PerformerGridCard
                    modelNumber={0}
                    performer={user}
                    pathname="/model/profile"
                    as={`/${user?.username || user?._id}`}
                    showButtonFollow
                    title="Follow"
                    getPerformerList={() => { }}
                    showModelNumber={false}
                  />
                  ) }
                </div>
              </div>
            </Col>
            <Col xs={14} sm={14} md={8}>
              <div className="per-col">
                <Table
                  dataSource={topRubiesGiftedSession}
                  columns={topGiftColumns}
                  rowKey="_id"
                  loading={fetching}
                  pagination={false}
                  onChange={this.handleTableChange.bind(this)}
                />
              </div>
            </Col>
            <Col xs={10} sm={10} md={3}>
              <AverageRubyReceivedInStream averageRubyReceived={averageRubyReceived} />
            </Col>
            <Col xs={14} sm={14} md={3}>
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
                {!!nextRankRuby && !fetching && (
                <div>
                  <ArrowUpOutlined style={{ color: '#0bdd0b' }} />
                  <span>
                    Next
                    {' '}
                    {nextRankRuby}
                  </span>
                  <img src="/static/diamond.png" alt="diamond" />
                </div>
                ) }
              </div>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <div className="per-col">
                <table className="stream-table">
                  <tr>
                    <td>{totalRubysInRoom}</td>
                    <td>
                      <img src="/static/gem.png" alt="gem" />
                      {' '}
                      in the room
                    </td>
                  </tr>
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
          <h1 className="mute-list-text page-heading" style={{ textAlign: 'center' }}>Muted list</h1>
          <div className="table-responsive mute-list-box">
            <h1 className="mute-list-text page-heading" style={{ textAlign: 'center' }}>These users can not comment in your live broadcast</h1>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowKey="_id"
              loading={fetching}
              pagination={{ ...pagination, showSizeChanger: false }}
              onChange={this.handleTableChange.bind(this)}
            />
          </div>
        </div>
      </>
    );
  }
}

PerformerLivePage.contextType = SocketContext;

const mapStateToProps = (state) => ({
  muteMessage: state.streamMessage.muteMessage,
  user: state.user.current,
  activeConversation: state.streamMessage.activeConversation,
  settings: { ...state.settings },
  loggedIn: state.auth.loggedIn

});
const mapDispatchs = {
  getStreamConversation,
  resetStreamMessage,
  resetMuteStreamMessage
};
export default connect(mapStateToProps, mapDispatchs)(PerformerLivePage as any);
