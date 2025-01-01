/* eslint-disable dot-notation */
import React, { useState, useEffect, useRef, useContext } from 'react';
import Head from 'next/head';
import {
  Row, Col, message, Button
} from 'antd';
import Link from 'next/link';
import { connect } from 'react-redux';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import {
  streamService, performerService, messageService, giftService
} from 'src/services';
import { SocketContext, Event } from 'src/socket';
import {
  loadStreamMessages,
  getStreamConversationSuccess,
  resetStreamMessage,
  resetAllStreamMessage
} from '@redux/stream-chat/actions';
import ChatBox from '@components/stream-chat/chat-box';
import GiftPage from '@components/gift';
import FavoriteGift from '@components/favorite-gift';
import LiveSubscriber from 'src/components/streaming/subscriber';
import ButtonFollow from '@components/common/buttonFollow';
import AverageRubyReceivedInStream from '@components/streaming/average-ruby-reveiced';
import { MicIcon, NextIcon, PersonOutlineSmallIcon, PersonSmallIcon, RPMIcon } from "src/components/stream/icons";
import { UpChangeIcon } from "@components/dashboard/icons";
import { CameraIcon, DiamondIcon, RubySmallIcon } from "src/icons";
import { of, delay } from 'rxjs';
import { ObservableQueue } from '@lib/hook/observable-queue';
import { RECEIVED_PAID_TOKEN_EVENT } from 'src/constants';
import { getResponseError } from '@lib/utils';
import { isMobile } from 'react-device-detect';

const queue = new ObservableQueue();

const STREAM_EVENT = {
  JOIN_BROADCASTER: 'join-broadcaster',
  MODEL_LEFT: 'model-left',
  ROOM_INFORMATIOM_CHANGED: 'public-room-changed',
  AVERAGE_RUBY_UPDATES_REVEIVED: 'average-ruby-received'
};

const DEFAULT_OFFLINE_IMAGE_URL = '/ct-bg.jpg';
const DEFAULT_PRIVATE_IMAGE_URL = '/ct-bg.jpg';
const DEFAULT_IMAGE_URL = '/ct-bg.jpg';

const LivePage = ({
  performer, ui, activeConversation, user,
  loadStreamMessages: dispatchLoadStreamMessages,
  getStreamConversationSuccess: dispatchGetStreamConversationSuccess,
  resetStreamMessage: dispatchResetStreamMessage,
  settings
}) => {
  const [total, setTotal] = useState(0);
  const [members, setMembers] = useState([]);
  const [favoriteGift, setFavoriteGift] = useState({});
  const [loading, setLoading] = useState(false);
  const [imgURL, setImgURL] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [sessionEarningId, setSessionEarningId] = useState('');
  const [receivedToken, setReceivedToken] = useState(0);
  const [averageRubyReceived, setAverageRubyReceived] = useState(0);

  const subscrbierRef = useRef(null);
  const subscriberRef2 = useRef(null);
  const intervalRef = useRef(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!user?._id) {
      message.error('Please log in or register!', 5);
      Router.push('/trending');
      return;
    }
    getFavoriteGift();
    initProfilePage();

    intervalRef.current = setInterval(updatePerformerInfo, 60 * 1000);
    window.addEventListener('beforeunload', onBeforeUnload);
    Router.events.on('routeChangeStart', onBeforeUnload);

    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener('beforeunload', onBeforeUnload);
      Router.events.off('routeChangeStart', onBeforeUnload);
    };
  }, []);

  const onBeforeUnload = () => {
    leavePublicRoom();
  };

  const getFavoriteGift = async () => {
    setLoading(true);
    const respGift = await giftService.favoriteGift();
    setFavoriteGift(respGift.data[0]);
    setLoading(false);
  };

  const updatePerformerInfo = async () => {
    try {
      const { streamingStatus: oldStreamingStatus, username } = performer;
      const resp = await performerService.findOne(username);
      const { streamingStatus } = resp.data;
      poster(streamingStatus);
      if (oldStreamingStatus !== streamingStatus && streamingStatus === 'public') {
        // Actualizar estado de la transmisión
      }
    } catch (e) {
      console.error(await Promise.resolve(e));
    }
  };

  const onReceiveGift = (dataMsg) => {
    const { duration, clip } = (dataMsg?.meta?.gift || {});
    const data = { url: clip?.url };
    addNew(data, 0).subscribe(renderImg);
    addNew(null, (duration || 0) * 1000).subscribe(renderImg);
  };

  const addNew = (data, playingTime) => {
    const original = of(data).pipe(delay(playingTime));
    return queue.addItem(original);
  };

  const renderImg = (result) => {
    setImgURL(result ? result.url : null);
  };

  const poster = (status) => {
    let posterImg = DEFAULT_OFFLINE_IMAGE_URL;
    switch (status) {
      case 'private': posterImg = DEFAULT_PRIVATE_IMAGE_URL; break;
      case 'public':
      case 'group': posterImg = DEFAULT_IMAGE_URL; break;
      default: break;
    }
    if (subscrbierRef.current?.poster) subscrbierRef.current.poster(posterImg);
    if (subscriberRef2.current?.poster) subscriberRef2.current.poster(posterImg);
    return posterImg;
  };

  const joinPeformerPublicRoom = async () => {
    try {
      const resp = await messageService.findPublicConversationPerformer(performer._id);
      const conversation = resp.data;
      if (conversation && conversation._id) {
        dispatchGetStreamConversationSuccess({ data: conversation });
        dispatchLoadStreamMessages({
          conversationId: conversation._id,
          limit: 25,
          offset: 0,
          type: conversation.type
        });
        socket?.emit('public-stream/join', { conversationId: conversation._id });
        socket?.on(`message_created_conversation_${conversation._id}`, onReceiveGift);
      } else {
        throw new Error('No available broadcast. Try again later');
      }
    } catch (e) {
      message.error(getResponseError(await Promise.resolve(e)));
    }
  };

  const initProfilePage = () => {
    setTimeout(() => {
      subscrbierRef.current?.resetPlaybackVideo(poster(performer.streamingStatus));
      subscriberRef2.current?.resetPlaybackVideo(poster(performer.streamingStatus));
    }, 1000);
    joinPeformerPublicRoom();
  };

  const leavePublicRoom = () => {
    if (socket && activeConversation?.data?._id) {
      socket.emit('public-stream/leave', { conversationId: activeConversation.data._id });
      socket.off(`message_created_conversation_${activeConversation.data._id}`);
      dispatchResetStreamMessage();
    }
  };

  const subscribe = async ({ performerId }) => {
    try {
      const resp = await streamService.joinPublicChat(performerId);
      setSessionId(resp.data.sessionId);
      setSessionEarningId(resp.data.sessionEarningId);
      const { optionForBroadcast } = settings;
      if (optionForBroadcast === 'HLS') {
        subscrbierRef.current?.playHLS(resp.data.sessionId);
        subscriberRef2.current?.playHLS(resp.data.sessionId);
      } else {
        subscrbierRef.current?.play(resp.data.sessionId);
        subscriberRef2.current?.play(resp.data.sessionId);
      }
    } catch (err) {
      message.error(getResponseError(await Promise.resolve(err)));
    }
  };

  const modelLeftHandler = ({ performerId }) => {
    if (performerId === performer._id) {
      subscrbierRef.current?.stop();
      subscriberRef2.current?.stop();
      message.info('Model has left the room!');
    }
  };

  const handleReceivedPaidToken = ({ token }) => {
    setReceivedToken((prev) => prev + token);
  };

  const handleUpdateRpm = ({ averageRubyReceived }) => {
    setAverageRubyReceived(averageRubyReceived);
  };

  return (
    <>
      <Head>
        <title>{`${ui.siteName || ''} | ${performer.username || ''}`}</title>
      </Head>
      <Event event={STREAM_EVENT.JOIN_BROADCASTER} handler={subscribe} />
      <Event event={STREAM_EVENT.MODEL_LEFT} handler={modelLeftHandler} />
      <Event event={STREAM_EVENT.ROOM_INFORMATIOM_CHANGED} handler={({ total, members }) => {
        setTotal(total);
        setMembers(members);
      }} />
      <Event event={RECEIVED_PAID_TOKEN_EVENT} handler={handleReceivedPaidToken} />
      <Event event={STREAM_EVENT.AVERAGE_RUBY_UPDATES_REVEIVED} handler={handleUpdateRpm} />

      <Row className="streaming-container">
        <Col md={16} xs={24}>
          <LiveSubscriber
            ref={subscrbierRef}
            configs={{ isPlayMode: true }}
          />
          {imgURL && <div className="animation"><img src={imgURL} alt="gift" /></div>}
        </Col>
        {isMobile && (
          <Col md={3} xs={8}>
            <AverageRubyReceivedInStream averageRubyReceived={averageRubyReceived} />
          </Col>
        )}
        {/* <Col md={1} xs={24}>
          <FavoriteGift
            streamType={activeConversation?.data?.type}
            sessionId={sessionId}
            performerId={performer._id}
            conversationId={activeConversation?.data?._id}
            favorGift={favoriteGift}
          />
        </Col> */}
        <Col md={7} xs={24}>
          {!loading && (
            <GiftPage
              sessionEarningId={sessionEarningId}
              streamType={activeConversation?.data?.type}
              sessionId={sessionId}
              currentUser={user}
              performerId={performer._id}
              conversationId={activeConversation?.data?._id}
              saveFavorite={setFavoriteGift}
              favorGift={favoriteGift}
            />
          )}
          {user.roles.includes('admin') && (
            <Button style={{ margin: '10px' }} className="btn-kill" type="primary" onClick={leavePublicRoom}>
              Kill stream
            </Button>
          )}
          <ChatBox {...{ totalParticipant: total, activeConversation }} />
        </Col>
        <div className="flex items-start justify-start pt-6">
          <div className="w-48">
            <div className="relative w-full h-48 flex flex-col justify-center items-center">
              <img className="w-full rounded-t" src={user.avatar} alt="" />
              <span className="absolute bottom-2 left-2 text-white font-semibold">{user.name}</span>
            </div>
            {user._id !== performer._id && (
              <ButtonFollow
                performer={performer}
                isHideOnClick={false}
                targetId={performer._id}
                sourceId={user._id}
                isFollow={performer.isFollowed}
                getPerformerList={() => { }}
              />
            )}
            <div className="flex items-center justify-between pt-2">
              <span>
                <PersonSmallIcon /> {user.stats.subscribers} fans
              </span>
              <span className="inline-flex items-center justify-end">
                {user.rubyBalance} <RubySmallIcon /> 
              </span>
            </div>
          </div>

          <div className="px-4 w-full">
            <h2 className="text-xl text-black/90 pb-2 border-b">Public stream details</h2>
            <div className="grid grid-cols-2 gap-6 w-48 pt-4">
              <strong className="text-black">Call time</strong>
              <span>6 minutes</span>
            </div>
            <div className="grid grid-cols-2 gap-6 w-48 pt-3">
              <strong className="text-black">Status</strong>
              <span>Live</span>
            </div>
            <div className="grid grid-cols-2 gap-6 w-48 pt-3">
              <strong className="text-black">Available</strong>
              <span>
                <span>1000</span> Rubys
              </span>
            </div>
            <div className="grid grid-cols-2 gap-6 w-48 pt-6">
              <strong className="text-black">Current Rank</strong>
              <span className="flex items-center whitespace-nowrap gap-1">
                <span>#100: Need 1000</span> <RubySmallIcon /> <span>to rank</span> <UpChangeIcon />
              </span>
            </div>
          </div>
        </div>
        {!isMobile && (
          <Col md={3} xs={8}>
            <AverageRubyReceivedInStream averageRubyReceived={averageRubyReceived} />
          </Col>
        )}
      </Row>
    </>
  );
};

LivePage.authenticate = true;

LivePage.getInitialProps = async ({ ctx }) => {
  try {
    const { query } = ctx;
    if (process.browser && query.performer) {
      return { performer: JSON.parse(query.performer) };
    }
    const { token } = nextCookie(ctx);
    const headers = { Authorization: token };
    const resp = await performerService.findOne(query.username, headers);
    return { performer: resp.data };
  } catch (e) {
    ctx.res?.end();
    return {};
  }
};

const mapStateToProps = (state) => ({
  ui: state.ui,
  ...state.streaming,
  ...state.performer.performerDetails,
  activeConversation: state.streamMessage.activeConversation,
  user: { ...state.user.current },
  loggedIn: state.auth.loggedIn
});

const mapDispatch = {
  loadStreamMessages,
  getStreamConversationSuccess,
  resetStreamMessage,
  resetAllStreamMessage
};

export default connect(mapStateToProps, mapDispatch)(LivePage);
