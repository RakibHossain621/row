/* eslint-disable react/require-default-props */
import Link from 'next/link';
import { IPerformer, IFeed } from 'src/interfaces';
import { message } from 'antd';
import {
  BookOutlined,
  CommentOutlined,
  BookFilled,
  VideoCameraOutlined,
  CameraOutlined,
  PictureOutlined,
  VideoCameraFilled,
  PlaySquareOutlined,
  CameraFilled
} from '@ant-design/icons';
import { connect } from 'react-redux';
import './content-sidebar-layout.less';
import { useState } from 'react';
import { reactionService } from 'src/services';
import { useRouter } from 'next/router';
import { CameraIcon, CommentsIcon, ImageIcon, SaveBookIcon, VideoIcon } from 'src/icons';
import { FaBookmark, FaRegBookmark } from "react-icons/fa";


interface IProps {
  performer: IPerformer;
  feed: IFeed;
  openCommentModal: Function;
  showCommentModel : boolean;
  totalComments?: number;
  currentPage?: string;
}

const ContentSidebarLayout = ({
  feed,
  openCommentModal,
  showCommentModel,
  totalComments,
  currentPage
}: IProps) => {
  const [requesting, setRequesting] = useState(false);
  const [isBookMarked, setBookmark] = useState(feed.isBookMarked);
  const { route } = useRouter();

  const handleLike = async () => {
    if (requesting) return;
    try {
      setRequesting(true);
      if (!isBookMarked) {
        await reactionService.create({
          objectId: feed._id,
          action: 'book_mark',
          objectType: 'feed'
        });
        setBookmark(true);
        setRequesting(false);
      } else {
        await reactionService.delete({
          objectId: feed._id,
          action: 'book_mark',
          objectType: 'feed'
        });
        setBookmark(false);
        setRequesting(false);
      }
    } catch (e) {
      const error = await e;
      message.error(error || 'Something went wrong');
    }
  };

  return (
    <div className="p-3 h-2/3 md:h-full flex flex-col items-stretch justify-between absolute top-0 md:-right-12 right-0 filter-invert md:filter-none">
      <div className="gr-lib pb-6 pt-0 md:pt-6 flex flex-col items-stretch justify-between">
        <div className="lib-icons text-center pb-2">
          {currentPage !== 'related-videos'
            ? (
              <Link
                href={{
                  pathname: '/model/related',
                  query: {
                    username: feed.performer.username || feed.performer._id,
                    tab: 'video',
                    postId: feed._id
                  }
                }}
              >
                <a href={feed.performer?.stats.totalVideos && currentPage !== 'related-videos' ? `/model/related?username=${feed.performer?.username || feed.performer._id}&tab=video&postId=${feed._id}` : '#'}>
                  <VideoIcon style={{transform: 'scale(1.3)'}} className={!feed.performer?.stats.totalActiveVideos ? 'disable-icon' : ''} />
                </a>
              </Link>
            )
            : <VideoIcon style={{transform: 'scale(1.3)'}} className="active-icon" />}
          <div className="total-stats">
            {feed.performer?.stats.totalActiveVideos}
          </div>
        </div>
        <div className="lib-icons text-center">
          { currentPage !== 'related-photos'
            ? (
              <Link
                href={{
                  pathname: '/model/related',
                  query: {
                    username: feed.performer.username || feed.performer._id,
                    tab: 'photo',
                    postId: feed._id
                  }
                }}
              >
                <a className={!feed.performer?.stats.totalActivePhotos ? 'disable-icon' : ''} href={`/model/related?username=${feed.performer?.username || feed.performer._id}&tab=photo&postId=${feed._id}`}>
                  <CameraIcon style={{transform: 'scale(1.3)'}} />
                </a>
              </Link>
            )
            : (
              <CameraIcon
                style={{transform: 'scale(1.3)'}}
                className="active-icon"
              />
            )}
          <div className="total-stats">
            {feed.performer?.stats.totalActivePhotos}
          </div>
        </div>
      </div>
      <div className="gr-icons text-center pb-6 flex flex-col items-stretch justify-between gap-4">
        <div className='pb-2'>
          {!isBookMarked ? (
            <FaRegBookmark
              onClick={() => handleLike()}
              size={20}
            />
          ) : <FaBookmark onClick={() => handleLike()} color='#DC1C1C' size={20} />}
        </div>
        <div className="icons-gr">
          {route.includes('post') && (
            <>
              <CommentsIcon
                className={(showCommentModel || totalComments > 0) ? 'active-icon' : ''}
                onClick={() => openCommentModal()}
              />
              <div className="total-stats">{totalComments}</div>
            </>
          )}
        </div>
      </div>
      <div className="icons-gr">
        {feed.type === 'photo' ? (
          <>
            {route !== '/post' && (
              <Link
                href={{
                  pathname: '/post',
                  query: { id: feed._id }
                }}
                as={`/post/${feed._id}`}
              >
                <ImageIcon />
              </Link>
            )}
          </>
        ) : null }
      </div>
    </div>
  );
};

const mapStates = (state: any) => ({
  currentUser: state.user.current,
  loggedIn: state.auth.loggedIn
});

export default connect(mapStates)(ContentSidebarLayout);
