import { PureComponent } from 'react';
import videojs from 'video.js';
import 'node_modules/video.js/dist/video-js.css';
import { InView } from 'react-intersection-observer';
import { delay } from '@lib/utils';

export class VideoPlayer extends PureComponent<any> {
  videoNode: HTMLVideoElement;

  player: any;

  mounted: boolean = false;

  state = {
    isPlayed: false,
    inView: false
  };

  componentDidMount() {
    this.mounted = true;
    this.player = videojs(this.videoNode, { ...this.props } as any);
    this.player.on('play', this.handleOnPlay);
  }

  componentDidUpdate(_, prevStates) {
    const { inView } = this.state;
    const { playOnScroll } = this.props;
    if (inView !== prevStates.inView) {
      if (inView && playOnScroll && this.player) {
        this.playOnScroll();
      } else {
        this.pauseVideo();
      }
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    this.mounted = false;
    if (this.player) {
      this.player.dispose();
      this.player.off('play', this.handleOnPlay);
    }
  }

  onEnded() {
    this.setState({ isPlayed: false }, () => {
      this.pauseVideo();
      // if (playLoop) this.playOnScroll();
    });
  }

  handleOnPlay = () => {
    const { isPlayed } = this.state;
    const { onPlay } = this.props;
    if (isPlayed) return;
    !isPlayed && this.setState({ isPlayed: true });
    onPlay && onPlay();
  };

  pauseVideo() {
    if (!this.player.paused()) {
      this.player.pause();
    }
  }

  async playOnScroll() {
    const { isPlayed, inView } = this.state;
    await delay(150);
    if (inView && this.mounted) {
      !isPlayed && this.player && this.player.paused() && this.player.play();
    }
  }

  render() {
    return (
      <div className="videojs-player">
        <div data-vjs-player>
          <InView threshold={1} onChange={(inView) => this.setState({ inView })}>
            <video
              onContextMenu={(event) => { event.preventDefault(); }}
              disablePictureInPicture
              data-setup='{"controlBar": {"pictureInPictureToggle": false}}'
              ref={(node) => {
                this.videoNode = node;
              }}
              className="video-js"
              onEnded={() => this.onEnded()}
            />
          </InView>
        </div>
      </div>
    );
  }
}
