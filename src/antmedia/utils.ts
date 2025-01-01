import classnames from 'classnames';

export function initializePlayer(id: string, cls?: string): HTMLVideoElement {
  const video = document.createElement('video');
  video.id = id;
  video.className = classnames('video-js broadcaster', cls);
  video.autoplay = true;
  video.muted = true;
  video.controls = true;
  video.playsInline = true;
  return video;
}

// eslint-disable-next-line no-shadow
export function tryToPlay(url: string, appName: string, streamId: string, token: string, type: string, subscriberId: string, subscriberCode: string, noStreamCallback: Function, initializePlayer: Function) {
  fetch(`${window.location.protocol}//${url}/${appName}/streams/${streamId}_adaptive.${type}`, { method: 'HEAD' })
    .then((response) => {
      if (response.status === 200) {
        // adaptive m3u8 & mpd exists,play it
        initializePlayer(`${streamId}_adaptive`, type, token, subscriberId, subscriberCode);
      } else {
        // adaptive not exists, try mpd or m3u8 exists.
        fetch(`${window.location.protocol}//${url}/${appName}/streams/${streamId}.${type}`, { method: 'HEAD' })
          // eslint-disable-next-line no-shadow
          .then((response) => {
            if (response.status === 200) {
              initializePlayer(streamId, type, token, subscriberId, subscriberCode);
            } else {
              // eslint-disable-next-line no-console
              console.log('No stream found');
              if (typeof noStreamCallback !== 'undefined') {
                noStreamCallback();
              }
            }
          }).catch((err) => {
            // eslint-disable-next-line no-console
            console.log(`Error: ${err}`);
          });
      }
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${err}`);
    });
}
