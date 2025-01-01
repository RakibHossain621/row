import { PureComponent } from 'react';
import Link from 'next/link';
import { shortenLargeNumber } from '@lib/index';
import { IFeed } from 'src/interfaces';
import './index.less';
import { PlayIcon, TickIcon } from 'src/icons';

interface IProps {
  feed: IFeed;
}

export class FeedGridCard extends PureComponent<IProps> {
  render() {
    const { feed } = this.props;
    const thumbUrl = (feed?.type === 'photo' ? (feed?.files
      && feed.files[0]
      && feed.files[0]?.url)
      : (feed?.thumbnail?.url)
          || (feed?.files
            && feed.files[0] && feed.files[0].thumbnailUrl
          )) || '/static/leaf.jpg';

    if (feed) {
      return (
        <Link
          href={{
            pathname: '/model/related',
            query: {
              username: feed?.performer.username || feed?.performer._id,
              postId: feed._id,
              tab: feed.type === 'video' ? 'related-videos' : 'related-photos'
            }
          }}
        >
          <div className={feed?.type === 'photo' 
            ? 'relative rounded-lg w-full overflow-hidden cursor-pointer' 
            : 'relative rounded-lg w-full overflow-hidden cursor-pointer'
            }
            style={{
              aspectRatio: feed?.type === 'video' ? '4 / 6' : '1'
            }} 
          >
            {feed.type === 'video' && <PlayIcon className='absolute -top-6 left-0 bottom-0 right-0 m-auto flex items-center justify-center pb-3 transition-all z-50' />}
            <div
              className="absolute w-full h-full top-0 left-0 bottom-0 right-0 z-0"
              style={{
                backgroundImage: `url(${thumbUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute w-full h-full top-0 left-0 bottom-0 right-0 z-10 bg-black/30 flex items-end justify-start">
              <div className="flex-1 p-3 text-white">
                <p className='flex items-center font-semibold'>
                  {feed.performer.name} 
                  {feed.performer.verifiedAccount && <TickIcon className='ml-1' />}
                </p>
                <p>
                  {feed.stats.views > 0
                    ? shortenLargeNumber(feed.stats.views)
                    : 0
                  }
                  <span className='pl-1'>Views</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    return <></>;
  }
}
