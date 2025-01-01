import { useState, useRef, useEffect, useContext } from "react";
import { CameraIcon, DiamondIcon, RubySmallIcon } from "src/icons";
import { MicIcon, NextIcon, PersonOutlineSmallIcon, PersonSmallIcon, RPMIcon } from "./icons";
import { UpChangeIcon } from "@components/dashboard/icons";
import LivePublisher from '@components/streaming/publisher';
import { SocketContext, Event } from 'src/socket';
import { message } from 'antd';
import { RECEIVED_PAID_TOKEN_EVENT, UPDATE_TOP_GIFTED_EVENT, UPDATE_TOTAL_RUBY_IN_ROOM } from 'src/constants';
import { WEBRTC_ADAPTOR_INFORMATIONS } from 'src/antmedia/constants';
import ChatBox from '@components/stream-chat/chat-box';
import { getResponseError } from '@lib/utils';
import { streamService, performerService } from '@services/index';

export const DesktopStreamLayoutPage = ({ isMe, user, activeConversation, settings }) => {
  const [sessionId, setSessionId] = useState('');
  const [receivedToken, setReceivedToken] = useState(0);
  const [totalRubysInRoom, setTotalRubysInRoom] = useState(0);
  const [topRubiesGiftedSession, setTopRubiesGiftedSession] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [hasRole, setHasRole] = useState(false);
  const [mostSupportedPosition, setMostSupportedPosition] = useState(0);
  const [nextRankRuby, setNextRankRuby] = useState(0);
  const [averageRubyReceived, setAverageRubyReceived] = useState(0);
  const publisherRef = useRef(null);
  const interval = useRef(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const init = async () => {
      try {
        setMostSupportedPosition(user?.analytics?.mostSupportedPosition || 0);
        const resp = await performerService.checkRole({ roles: ['ROLE_HOST_LIVE'] });
        setHasRole(resp?.data);

        if (resp?.data) {
          message.error(`You can GoLive when you have ${settings.totalFollowerForLive} followers`, 4);
          return;
        }

        joinPublicRoom();
        window.addEventListener('beforeunload', onbeforeunload);
      } catch (error) {
        message.error(getResponseError(error));
      }
    };

    init();

    return () => {
      clearInterval(interval.current);
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const joinPublicRoom = async () => {
    try {
      setLoading(true);
      const resp = await streamService.goLive();
      const { conversation, sessionId } = resp.data;
      setSessionId(sessionId);

      if (conversation && conversation._id) {
        socket.emit('public-stream/join', { conversationId: conversation._id });
        message.success('Please click Start stream to initiate streaming');
      }
    } catch (e) {
      message.error(getResponseError(e));
    } finally {
      setLoading(false);
    }
  };

  const startStream = () => {
    if (publisherRef.current) {
      publisherRef.current.start();
      setInitialized(true);
      message.success("You're live now");
    }
  };

  const stopStream = () => {
    if (!initialized) {
      window.location.reload();
      return;
    }

    if (window.confirm('Are you sure want to stop this live streaming!')) {
      window.location.reload();
    }
  };

  const handleWebRTCEvent = (info) => {
    if (info === WEBRTC_ADAPTOR_INFORMATIONS.INITIALIZED) {
      setInitialized(true);
      publisherRef.current.publish(sessionId);
    } else if (info === WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_STARTED) {
      socket.emit('public-stream/live', { conversationId: activeConversation._id });
      interval.current = setInterval(() => {
        incrementTime();
      }, 60 * 1000);
    } else if (info === WEBRTC_ADAPTOR_INFORMATIONS.PUBLISH_FINISHED) {
      clearInterval(interval.current);
    }
  };

  const incrementTime = () => {
    const conversation = activeConversation.data;
    socket.emit('update-stream-time', { conversationId: conversation._id, time: receivedToken });
  };

  const handleReceivedPaidToken = ({ token }) => setReceivedToken(receivedToken + token);
  const handleUpdateTotalRubyInRoom = ({ totalRubys }) => setTotalRubysInRoom(totalRubys);
  const handleUpdateTopGifted = ({ topRubiesGiftedSession }) => setTopRubiesGiftedSession(topRubiesGiftedSession);

  const onbeforeunload = () => leavePublicRoom();

  const leavePublicRoom = () => {
    socket.emit('public-stream/leave', { conversationId: sessionId });
  };

  const handleUpdateRpm = ({ averageRubyReceived }) => setAverageRubyReceived(averageRubyReceived);

  return (
    <section className="flex items-start justify-between flex-col md:flex-row">
      {/* video column */}
      <div className="flex-1">
        <div className="relative">
          <LivePublisher
            ref={publisherRef}
            configs={{ debug: true, localVideoId: 'publisher' }}
            onChange={handleWebRTCEvent} // Bind WebRTC adaptor event handler
          />
          <button className="text-white absolute top-2 left-3 text-xl font-semibold" style={{ transform: 'rotate(90deg)' }}>
            ...
          </button>
          <span className="text-white absolute top-3 right-3 text-lg bg-red-700 p-1 px-3">Live</span>
          <button className="bg-white p-2 gap-1 flex flex-col items-center justify-center rounded absolute bottom-3 right-3">
            <RPMIcon />
            RPM
          </button>
        </div>

        <nav className="flex items-center p-3 gap-4 bg-gray-100">
          {!isMe && (
            <button className="flex items-center justify-start gap-1">
              <div className="bg-gray-300 p-1 rounded-full">
                <NextIcon style={{ transform: 'rotate(180deg)' }} />
              </div>
              Previous model
            </button>
          )}
          <div className="m-auto">
            <button className="bg-gray-300 p-2 rounded-full">
              <CameraIcon />
            </button>

            {isMe && !initialized ? (
              <button onClick={startStream} className="bg-red-600 rounded-full text-white font-semibold p-3 px-5 mx-3">
                Start Stream
              </button>
            ) : (
              <button onClick={stopStream} className="bg-red-600 rounded-full text-white font-semibold p-3 px-5 mx-3">
                End Stream
              </button>
            )}

            <button className="bg-gray-300 p-2 rounded-full">
              <MicIcon />
            </button>
          </div>
          {!isMe && (
            <button className="flex items-center justify-end gap-1">
              Next model
              <div className="bg-gray-300 p-1 rounded-full">
                <NextIcon />
              </div>
            </button>
          )}
        </nav>

        <div className="flex items-start justify-start pt-6">
          <div className="w-48">
            <div className="relative w-full">
              <img className="w-full rounded-t" src={user.avatar} alt="" />
              <span className="absolute bottom-2 left-2 text-white font-semibold">{user.name}</span>
            </div>
            <button className="bg-purple-800 text-white text-semibold w-full p-3 rounded-b">Follow</button>
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
      </div>

      {/* chat column */}
      <div className="md:max-w-[36%]">
        <header className="border p-4 flex items-center justify-between">
          <button>
            <NextIcon />
          </button>
          <button>Live Chat</button>
          <button>
            <PersonOutlineSmallIcon />
          </button>
        </header>

        <ChatBox
  totalParticipant={receivedToken}  // Equivalente a `total` de antes
  isPerformerScreen={isMe}          // Antes se pasaba como `true`
  activeConversation={activeConversation}  // Pasa el activeConversation como antes
/>


        <div className="flex items-center justify-between p-4 bg-gray-100 border">
          <p className="text-black flex items-center gap-1">
            100k <RubySmallIcon /> in the room
          </p>
          <p className="text-black flex items-center gap-1">
            1000 <DiamondIcon /> received this session
          </p>
        </div>

        {/* WebSocket Events */}
        <Event event={RECEIVED_PAID_TOKEN_EVENT} handler={handleReceivedPaidToken} />
        <Event event={UPDATE_TOTAL_RUBY_IN_ROOM} handler={handleUpdateTotalRubyInRoom} />
        <Event event={UPDATE_TOP_GIFTED_EVENT} handler={handleUpdateTopGifted} />
        <Event event="average-ruby-received" handler={handleUpdateRpm} />
      </div>
    </section>
  );
};
