import { useEffect, useRef, CSSProperties } from 'react';
import classnames from 'classnames';
import videojs from 'video.js';
import { useSelector } from 'react-redux';
import { StreamSettings } from 'src/interfaces';
import { tryToPlay } from './utils';

interface Props {
  streamId: string;
  className?: string;
  containerCls?: string;
  extension: string;
  token?: string;
  subscriberId?: string;
  subscriberCode?: string;
  style?: CSSProperties;
}

let player: videojs.Player;
let interval: NodeJS.Timeout;
let _streamId: string;

const leaveSession = () => {
  if (player) {
    player.dispose();
    player = undefined;
  }

  const el = document.getElementById(_streamId);
  if (el) {
    el.remove();
  }

  if (interval) {
    clearTimeout(interval);
    interval = undefined;
  }
};

const Player = ({
  streamId, className, extension, token, subscriberId, subscriberCode, ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>();
  const settings = useSelector((state: any) => state.streaming.settings) as StreamSettings;
  const { viewerURL, AntMediaAppname } = settings;
  const initializePlayer = () => {
    if (interval) {
      clearTimeout(interval);
      interval = undefined;
    }

    let el = document.getElementById(streamId) as HTMLVideoElement;
    if (!el) {
      el = document.createElement('video');
      el.id = streamId;
      el.className = classnames('video-js vjs-default-skin', className);
      el.autoplay = true;
      el.muted = true;
      el.controls = false;
      el.playsInline = true;
      el.width = ref.current.offsetWidth;
      el.height = ref.current.offsetHeight;
      ref.current.appendChild(el);
    }

    let type: string;
    if (extension === 'm3u8') {
      type = 'application/x-mpegURL';
    }

    if (!player) {
      const videoEl = videojs(el, {
        controlBar: false,
        controls: false,
        bigPlayButton: false,
        muted: true
      }, () => {
        player = videoEl;
        player.play();
      });

      videoEl.addClass('vjs-waiting');
      videoEl.src({
        src: `${window.location.protocol}//${viewerURL}/${AntMediaAppname}/streams/${streamId}.${extension}?token=${token}&subscriberId=${subscriberId}&subscriberCode=${subscriberCode}`,
        type
      });

      videoEl.on('ended', () => {
        videoEl.addClass('vjs-waiting');
        interval = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          tryToPlay(viewerURL, AntMediaAppname, streamId, token, extension, subscriberId, subscriberCode, noStreamCallback, initializePlayer);
        }, 3000);
      });

      videoEl.on('error', () => {
        videoEl.error(null);
        videoEl.addClass('vjs-waiting');
        interval = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          tryToPlay(viewerURL, AntMediaAppname, streamId, token, extension, subscriberId, subscriberCode, noStreamCallback, initializePlayer);
        }, 3000);
      });

      return;
    }

    player.addClass('vjs-waiting');
    player.src({
      src: `${window.location.protocol}//${viewerURL}/${AntMediaAppname}/streams/${streamId}.${extension}?token=${token}&subscriberId=${subscriberId}&subscriberCode=${subscriberCode}`,
      type
    });
    if (player.readyState()) {
      player.play();
    }
  };

  const noStreamCallback = () => {
    if (extension === 'm3u8') {
      interval = setTimeout(() => {
        tryToPlay(viewerURL, AntMediaAppname, streamId, token, extension, subscriberId, subscriberCode, noStreamCallback, initializePlayer);
      }, 3000);
    }
  };

  useEffect(() => {
    leaveSession();

    _streamId = streamId;

    if (streamId) {
      tryToPlay(viewerURL, AntMediaAppname, streamId, token, extension, subscriberId, subscriberCode, noStreamCallback, initializePlayer);
    }
  }, [streamId]);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      leaveSession();
    };
  }, []);

  return <div {...props} ref={ref} />;
};

Player.defaultProps = {
  token: '',
  subscriberId: '',
  subscriberCode: '',
  className: '',
  containerCls: '',
  style: {}
};
export default Player;
