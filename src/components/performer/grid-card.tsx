/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { IPerformer, IUser } from 'src/interfaces';
import Link from 'next/link';
import { ProfileIcon, RubyIcon, RubySmallIcon, TickIcon } from 'src/icons';
import './performer.less';
import ButtonFollow from '@components/common/buttonFollow';
import { connect } from 'react-redux';
import { streamService } from 'src/services';
import dynamic from 'next/dynamic';
import { JoinRoomButton } from '@components/live-now/JoinRoomButton';

const Player = dynamic(() => import('src/antmedia/Player'), { ssr: false });

interface IProps {
  performer: any;
  currentUser: IUser;
  pathname: string;
  modelNumber: number;
  as: string;
  showButtonFollow: boolean;
  getPerformerList: Function;
  showModelNumber?: boolean;
  hideFollower?: boolean;
  filter?:any;
  title? : string;
  isForLive?: boolean
  isLivePrivate?: boolean;
}

class PerformerGridCard extends PureComponent<IProps> {
  state = {
    streamId: null,
    totalFollowers: 0,
    number: this?.props?.modelNumber || 0
  }

  componentDidMount() {
    const { performer, filter } = this.props;
    this.setState({ totalFollowers: performer?.stats?.totalFollower });
    if (filter) {
      switch (filter.sortBy) {
        case 'mostFollowed':
          return this.setState({ number: performer?.ranking?.mostFansPosition || 0 });
        case 'earningCurrentMonth':
          return this.setState({ number: performer?.ranking?.mostSupportedPosition || 0 });
        case 'mostView':
          return this.setState({ number: performer?.ranking?.feedViewsPosition || 0 });
        default: return null;
      }
    }
  }

  onMouseEnter = async () => {
    const { performer } = this.props;
    try {
      const resp = await Promise.resolve(streamService.getLiveStreaming(performer._id));
      if (resp.data) this.setState({ streamId: resp.data });
    } catch (error) {
      this.setState({ streamId: '' });
    }
  };

  render() {
    const {
      performer, currentUser, modelNumber, pathname, as, getPerformerList, showModelNumber, hideFollower, isForLive, isLivePrivate
    } = this.props;

    const { streamId, totalFollowers, number } = this.state;
    return (
      <div 
        className="w-full cursor-pointer rounded-lg overflow-hidden" 
        aria-disabled="true" 
        onMouseLeave={() => this.setState({ streamId: null })} 
        onMouseEnter={this.onMouseEnter}
      >
        <Link
          href={{
            pathname,
            query: {
              performer: JSON.stringify(performer),
              username: performer?.username || performer?._id
            }
          }}
          as={as}
        >
          <div 
            className="bg-center bg-cover relative performer-profile-image-ratio" 
            style={{ 
              backgroundImage: `url(${performer?.avatar || performer?.performerInfo?.avatar || '/static/no-avatar.png'})` 
            }}
          >
            <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/30' />
            {/* {performer?.live > 0 && <span className="live-status">Live</span> */}
            {isForLive && (
              <>
                <header className='absolute top-0 right-0 left-0 p-2 py-3' style={{zIndex: 1}}>
                  {!streamId ? (
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1'>
                        <span className='block w-5 h-5 rounded-full bg-green-500'></span>
                        <span className='text-white'>Active</span>
                      </div>
                      <JoinRoomButton totalFollowers={totalFollowers} performer={performer} isLivePrivate={isLivePrivate} />
                    </div>
                  )   
                  : (
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1'>
                        <span className='block w-5 h-5 rounded-full bg-red-500'></span>
                        <span className='text-white'>Offline</span>
                      </div>
                    </div>
                  )} 
                </header>
                {streamId && (
                  <Player
                    streamId={streamId}
                    extension="m3u8"
                    style={{
                      width: '100%', height: '100%', position: 'absolute', inset: 0
                    }}
                  />
                )}

              </>
            )}
            <div className="absolute top-0 left-0 right-0 bottom-0 m-auto flex flex-col items-baseline justify-end px-3 py-2">
              <p className="text-white font-semibold flex items-center">
                {performer?.name ||  'N/A'}
                {performer?.verifiedAccount && <TickIcon className='ml-2' />}
              </p>
              {!hideFollower && (
              <div className='flex items-center justify-between w-full'>
                <p className="text-white flex items-center ml-[-3px]">
                  <ProfileIcon />
                  {performer?.totalViewer || totalFollowers || 0}
                  {' '}
                  Fans
                </p>
                {isLivePrivate &&
                  <p className="text-white flex items-center">
                    <RubySmallIcon />
                    5 /min
                  </p>
                }
              </div>
              )}
            </div>
            {showModelNumber && 
              <span className={`absolute top-2 left-2 z-20 h-7 w-7 rounded-full text-white flex items-center justify-center font-semibold ${modelNumber < 11 ? 'bg-pink-700' : ''}`}>
                {number || modelNumber || ''}
              </span>
            }
          </div>
        </Link>
        <ButtonFollow
          performer={performer}
          isHideOnClick
          targetId={performer._id}
          sourceId={currentUser._id}
          isFollow={performer.isFollowed}
          getPerformerList={getPerformerList}
          updateFollower={(val) => this.setState({ totalFollowers: totalFollowers + val })}
        />
      </div>
    );
  }
}

const mapStates = (state: any) => ({
  currentUser: { ...state.user.current }
});

export default connect(mapStates)(PerformerGridCard);
