import React, { createRef, PureComponent } from 'react';
import { IFeed, IPerformer } from 'src/interfaces';
import { feedService } from '@services/feed.service';
import {
  MoreOutlined,
  UnlockOutlined,
  DeleteOutlined,
  FlagOutlined,
  EditOutlined,
  LockOutlined,
  AlignRightOutlined,
  CaretRightOutlined,
  FullscreenOutlined,
  SoundOutlined,
  PauseOutlined
} from '@ant-design/icons';
import {
  Progress, Menu, Dropdown, Button, Popover, message, Modal, Image,
  Divider
} from 'antd';
import { connect } from 'react-redux';
import {
  getComments, moreComment, createComment, deleteComment
} from '@redux/comment/actions';
import { ShareIcon, MuteIcon, UserIcon, ProfileIcon } from 'src/icons';
import { formatDateFromnow, shortenLargeNumber } from 'src/lib';
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import './feed-video.less';
import { InView } from 'react-intersection-observer';
import Router, { useRouter } from 'next/router';
import { reportService } from '@services/index';
import {
  removeFeedSuccess, removeTrendingFeedSuccess, setMetaThumbnail
} from '@redux/feed/actions';
import {
  updateStatsView
} from '@redux/user/actions';

import Link from 'next/link';
import ButtonFollow from '@components/common/buttonFollow';
import ContentSidebarLayout from '@components/common/layout/content-sidebar-layout';
import ContentLeftbarLayout from '@components/common/layout/content-leftbar-layout';
import ShareButtons from '@components/performer/share-post';
import dynamic from 'next/dynamic';

const VerifiedEmailForm = dynamic(() => import('@components/performer/verified-email-form'), { ssr: false });
const ListComments = dynamic(() => import('@components/comment/list-comments'), { ssr: false });
const CommentForm = dynamic(() => import('@components/comment/comment-form'), { ssr: false });
const ReportForm = dynamic(() => import('@components/report/report-form'), { ssr: false });

hashtag(linkify);

interface IProps {
  feed: IFeed;
  user: IPerformer;
  siteName: string;
  getComments: Function;
  moreComment: Function;
  createComment: Function;
  deleteComment: Function;
  removeFeedSuccess: Function;
  removeTrendingFeedSuccess:Function;
  updateStatsView:Function;
  commentMapping: any;
  comment: any;
  currentPage: string;
  loggedIn: boolean;
  // eslint-disable-next-line react/require-default-props
  onDelete? : Function;
  // eslint-disable-next-line react/require-default-props
  setMetaThumbnail? : Function;
  isHashtags?: boolean
}

class FeedVideo extends PureComponent<IProps> {
  state = {
    visibleAction: false,
    itemPerPage: 12,
    commentPage: 0,
    totalComment: 0,
    showComment: false,
    inView: false,
    openReportModal: false,
    requesting: false,
    // eslint-disable-next-line react/destructuring-assignment
    status: this.props?.feed?.status,
    isPlaying: false,
    isShowProgressBar: false,
    progress: 0,
    progressBarWidth: 0,
    isMute: false,
    openVerifiedEmailModal: false,
    loop: 0
  };

  videoRef: any;

  wrapperRef: any;

  mounted: boolean = false;

  componentDidMount() {
    const { feed } = this.props;
    if (!this.videoRef?.current) {
      this.videoRef = createRef();
    } else {
      this.wrapperRef = React.createRef();
      document.addEventListener('click', (e) => this.handleClick(e));
      this.videoRef.current?.addEventListener('timeupdate', () => {
        this.handleProgress();
      });
      if (feed?.type === 'video') {
        const width = document.getElementById(`progressBar${feed._id}`).clientWidth || 0;
        this.setState({ progressBarWidth: width });
        document.getElementById(`progressBar${feed._id}`).addEventListener('click', (e) => {
          this.handleUpdateProgress(e);
        });
      }
    }
    if (feed) {
      this.setState({
        totalComment: feed.totalComment
      });
    }
    this.mounted = true;
  }

  componentDidUpdate(prevProps, prevStates) {
    const {
      feed, commentMapping, comment, user
    } = this.props;
    const { totalComment, inView, loop } = this.state;
    const { type } = feed;
    if (!this.videoRef?.current) {
      this.videoRef = createRef();
    }

    if (
      (!prevProps.comment.data && comment.data && comment.data.objectId === feed._id)
      || (prevProps.commentMapping[feed._id] && totalComment !== commentMapping[feed._id].total)
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ totalComment: commentMapping[feed._id].total });
    }
    if (inView !== prevStates.inView) {
      if (inView) {
        type === 'video' && this.playVideo(feed._id);
        if (loop < 5) {
          type === 'photo' && feed.fromSourceId !== user._id && feedService.addView(feed._id);
          this.setState({ loop: loop + 1 });
        }
      } else {
        type === 'video' && this.pauseVideo();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    const { feed } = this.props;
    if (this.videoRef) {
      this.videoRef.current?.removeEventListener('timeupdate', () => {
        this.handleProgress();
      });
    }
    if (feed?.type === 'video') {
      document.getElementById(`progressBar${feed._id}`).removeEventListener('click', (e) => {
        this.handleUpdateProgress(e);
      });
    }
  }

  async handleFilterComment(val) {
    const { feed, getComments: handleGetComment } = this.props;
    const { itemPerPage, commentPage } = this.state;
    handleGetComment({
      objectId: feed._id,
      limit: itemPerPage,
      offset: commentPage,
      sortBy: val.key
    });
  }

  handleProgress() {
    const { isShowProgressBar } = this.state;
    if (this.videoRef.current) {
      this.setState({ progress: (this.videoRef.current?.currentTime / this.videoRef.current?.duration) * 100 });
    }
    if (this.videoRef?.current?.duration && !isShowProgressBar) {
      this.setState({ isShowProgressBar: true });
    }
  }

  handleClick(event) {
    const { target } = event;
    const { visibleAction } = this.state;
    if (this.wrapperRef && !this.wrapperRef?.current?.contains(target)) {
      if (visibleAction) this.setState({ visibleAction: false });
    }
  }

  handleUpdateProgress(e) {
    if (this.videoRef?.current) {
      const { progressBarWidth } = this.state;
      const precent = (e.offsetX / progressBarWidth) * 100;
      this.videoRef.current.currentTime = (precent * this.videoRef.current?.duration) / 100;
      this.setState({ progress: (e.offsetX / progressBarWidth) * 100 });
    }
  }

  async onFinishComment(comment: Comment) {
    const { createComment: handleCreateComment, user } = this.props;
    if (!user.verifiedEmail) {
      return this.setState({ openVerifiedEmailModal: true });
    }
    return handleCreateComment(comment);
  }

  onShare(url) {
    const { setMetaThumbnail: handleMetaThubnails } = this.props;
    handleMetaThubnails(url);
  }

  privateVideo = async () => {
    const { feed } = this.props;
    const { status } = this.state;

    try {
      await this.setState({ requesting: true });
      await feedService.update(feed._id, {
        type: feed.type,
        text: feed.text,
        status
      });
      status === 'active' ? message.success('Public successfully!') : message.success('Private successfully!');
    } catch {
      message.error('Something went wrong, please try again later');
      this.setState({ requesting: false });
    }
  };

  deleteVideo = async () => {
    const {
      feed, removeFeedSuccess: handleRemoveFeed, removeTrendingFeedSuccess: handleRemoveTrendingFeed, updateStatsView: handleUpdateStatsView
    } = this.props;
    if (!window.confirm('All earnings related to this post will be refunded. Are you sure to remove it?')) {
      return;
    }
    try {
      await feedService.delete(feed._id);
      handleRemoveFeed({ feed });
      handleRemoveTrendingFeed({ feed });
      handleUpdateStatsView({ views: -feed.stats.views });
      message.success('Post deleted successfully');
    } catch (e) {
      const err = (await Promise.resolve(e)) || {};
      message.error(err.message || 'An error occurred, please try again!');
    }
  };

  reportVideo = async (reason) => {
    const { feed } = this.props;
    if (!reason || reason?.length < 20) {
      message.error('Your report must be at least 20 characters');
      return;
    }
    try {
      await this.setState({ requesting: true });
      await reportService.create({
        target: 'feed',
        targetId: feed._id,
        performerId: feed.fromSourceId,
        description: reason
      });
      message.success('Thanks for reporting this content with us');
      this.setState({ requesting: false, openReportModal: false });
    } catch (e) {
      const err = (await Promise.resolve(e)) || {};
      message.error(err.message || 'An error occurred, please try again!');
      this.setState({ requesting: false, openReportModal: false });
    }
  };

  copyLink = async () => {
    const { feed } = this.props;
    const str = `${window.location.origin}/post/${feed?.slug || feed?._id}/?introducerId=${feed.fromSourceId}`;
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    message.success('Copied to clipboard');
  };

  editVideo = () => {
    const { feed } = this.props;
    Router.push({ pathname: '/model/my-post/edit', query: { id: feed._id } });
  };

  async moreComment() {
    const { feed, moreComment: handleLoadMore } = this.props;
    const { commentPage, itemPerPage } = this.state;
    this.setState({
      commentPage: commentPage + 1
    });
    handleLoadMore({
      limit: itemPerPage,
      offset: (commentPage + 1) * itemPerPage,
      objectId: feed?._id
    });
  }

  async deleteComment(item) {
    const { deleteComment: handleDelete } = this.props;
    if (!window.confirm('Are you sure to remove this comment?')) return;
    handleDelete(item._id);
  }

  async playVideo(feedId: string) {
    const { feed, user, loggedIn } = this.props;
    const { inView, loop } = this.state;
    if (loop > 50) {
      return false;
    }
    if (inView && this.mounted) {
      this.videoRef.current?.play();
      this.setState({ isPlaying: true });
      feed.fromSourceId !== user._id && loggedIn && (await feedService.addView(feedId));
      this.setState({ loop: loop + 1 });
    }
    return true;
  }

  pauseVideo() {
    if (this.videoRef.current.play) {
      this.videoRef.current.pause();
      this.setState({ isPlaying: false });
    }
  }

  async toggleMuteVideo() {
    if (this.videoRef.current) {
      const { muted } = this.videoRef.current;
      this.videoRef.current.muted = !muted;
      this.setState({ isMute: !muted });
    }
  }

  async toggleFullScreen() {
    this.videoRef.current.requestFullscreen();
  }

  showComment() {
    this.setState({ commentPage: 0 });
    const { showComment, itemPerPage } = this.state;
    const { feed, getComments: dispatchgetComments } = this.props;
    this.setState({ showComment: !showComment }, () => {
      // eslint-disable-next-line no-shadow
      const { showComment } = this.state;
      if (showComment) {
        dispatchgetComments({
          objectId: feed._id,
          objectType: 'feed',
          limit: itemPerPage,
          offset: 0
        });
      }
    });
  }

  pad(time) {
    return time < 10 ? `0${time.toString()}` || '00' : time.toString() || '00';
  }

  render() {
    const {
      siteName,
      user,
      feed,
      commentMapping,
      currentPage,
      loggedIn,
      onDelete,
      isHashtags
    } = this.props;

    const [hashtag1, hashtag2, hashtag3] = feed.text.split(" ")

    const {
      visibleAction,
      showComment,
      openReportModal,
      requesting,
      status,
      totalComment,
      isPlaying,
      isShowProgressBar,
      progress,
      isMute,
      itemPerPage,
      commentPage,
      openVerifiedEmailModal
    } = this.state;
    if (!this.videoRef?.current) {
      this.videoRef = createRef();
    }
    const {
      performer, files, type, crossPromotion
    } = feed;

    const thumbUrl = (feed?.type === 'photo' ? (feed.files
      && feed.files[0]
      && feed.files[0]?.url)
      : (feed?.thumbnail?.url)
          || (feed.files
            && feed.files[0] && ((feed.files[0].thumbnails && feed.files[0].thumbnails[0])
          ))) || '/static/leaf.jpg';

    const userMenu = (
      <Menu onClick={this.handleFilterComment.bind(this)}>
        <Menu.Item key="like">Top Comment</Menu.Item>
        <Menu.Item key="mostRecent">Most Recent</Menu.Item>
      </Menu>
    );
    // eslint-disable-next-line no-prototype-builtins
    const comments = commentMapping.hasOwnProperty(feed._id) ? commentMapping[feed._id].items : [];
    const linkifyOptions = {
      formatHref(href, category) {
        if (category === 'hashtag') {
          // eslint-disable-next-line no-param-reassign
          href = `/search?hashtag=${href.substring(1)}&tab=${type}&id=${feed._id}`;
        }
        return href;
      }
    };
    return (
      <>
        <div className="w-full">
          <div className='flex justify-center items-stretch relative'>
            <div className={'relative'}>
              {type === 'video' && (
                <InView threshold={0.8} onChange={(inView) => this.setState({ inView })} className="relative">
                  <video
                    style={{ width: '345px', aspectRatio: '4 / 6', objectFit: 'cover'}}
                    className='rounded-lg max-w-full'
                    onContextMenu={(event) => { event.preventDefault(); }}
                    playsInline
                    controlsList="nodownload"
                    autoPlay={false}
                    src={(files?.length > 0 && files[0]?.url) || './static/background.gif'}
                    ref={this.videoRef}
                    onEnded={() => this.playVideo(feed._id)}
                    disablePictureInPicture
                    onClick={() => {
                      isPlaying ? this.pauseVideo() : this.playVideo(feed._id);
                    }}
                  />
                  {/* <div className="absolute bottom-0 right-0">
                    {isMute ? (
                      <MuteIcon onClick={() => this.toggleMuteVideo()} />
                    ) : (
                      <SoundOutlined id="mute" type="button" data-state="mute" onClick={() => this.toggleMuteVideo()} />
                    )}
                    <FullscreenOutlined
                      id="fs"
                      type="button"
                      data-state="go-fullscreen"
                      onClick={() => this.toggleFullScreen()}
                    />
                  </div> */}
                </InView>
              )}
              {type === 'photo' && (
                <InView 
                  threshold={1}
                  onChange={(inView) => this.setState({ inView })} 
                  className="rounded-lg"
                >
                  <Image  
                    onContextMenu={(event) => { event.preventDefault(); }} 
                    src={(files?.length > 0 && files[0]?.url) || './static/background.gif'} 
                    alt="" 
                    className="max-w-full rounded-lg"
                    style={{ width: '345px', aspectRatio: '1/1', objectFit: 'cover'}}
                  />
                </InView>
              )}
              <div className="absolute top-2 left-2" ref={this.wrapperRef}>
                <MoreOutlined className="text-white text-lg" onClick={() => this.setState({ visibleAction: !visibleAction })} />
                {visibleAction && (
                  <div className="render-action">
                    {loggedIn && (
                      <Button onClick={() => this.setState({ openReportModal: !openReportModal })}>
                        <FlagOutlined />
                        <p>Report</p>
                      </Button>
                    )}
                    {performer._id === user._id && (
                      <>
                        <Button
                          onClick={() => {
                            this.setState(
                              {
                                status: status === 'active' ? 'inactive' : 'active'
                              },
                              () => this.privateVideo()
                            );
                          }}
                        >
                          {status === 'active' ? <UnlockOutlined /> : <LockOutlined />}
                          <p>{status === 'active' ? 'Public' : 'Private'}</p>
                        </Button>
                        <Button onClick={() => this.editVideo()}>
                          <EditOutlined />
                          <p>Edit</p>
                        </Button>
                        <Button onClick={() => { onDelete ? onDelete(feed) : this.deleteVideo(); }}>
                          <DeleteOutlined />
                          <p>Delete</p>
                        </Button>
                      </>
                    )}
                    <Popover
                      title="Share to social network"
                      content={<ShareButtons performer={performer} siteName={siteName} post={feed} />}
                    >
                      <Button className="normal" onMouseEnter={() => this.onShare(thumbUrl)}>
                        <ShareIcon />
                        <p>Share</p>
                      </Button>
                    </Popover>
                  </div>
                )}
              </div>
              <div className="absolute w-full bottom-1 left-0 right-0 p-3">
                {currentPage !== 'recast' && (
                <div className="text-white pb-2">
                  <Linkify options={linkifyOptions}>{`${feed.text} `}</Linkify>
                </div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/${performer?.username}`}
                  >
                    <div className='flex items-start justify-start gap-2'>
                      <img className='h-12 w-12 rounded-full' src={performer?.avatar || './static/no-avatar.png'} alt="" />
                      <div className="">
                        <p className="text-white font-semibold pb-1">
                          {performer?.name?.substring(0, 14) || performer?.username?.substring(0, 14)}
                        </p>
                        <p className="text-white flex items-end justify-start gap-1 text-sm">
                          <ProfileIcon />
                          {`${performer?.stats.totalFollower || '0'} Fans`}
                        </p>
                        <p className="text-white text-xs">
                          <span className="text-white">
                            {formatDateFromnow(feed?.createdAt)}
                          </span>
                          <span className='px-1'>•</span>
                          <span className="text-white">
                            Views
                            {' '}
                            {currentPage === 'post' ? feed.stats.views : shortenLargeNumber(feed.stats.views)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col ">
                    <ButtonFollow
                      performer={performer}
                      isHideOnClick
                      targetId={performer?._id}
                      sourceId={user?._id}
                      isFollow={performer?.isFollowed}
                      getPerformerList={() => {}}
                      title="Follow"
                      isTrending
                    />
                    <div id={`progressBar${feed._id}`} className="progress">
                      {this.videoRef?.current && isShowProgressBar && (
                        <div className="text-right pt-1 text-white">
                          <span id="current">
                            {`${Math.floor(this.videoRef.current?.currentTime / 60) || '0'}:${this.pad(
                              Math.floor(this.videoRef.current?.currentTime % 60)
                            )} `}
                          </span>
                          <span> </span>
                          <span id="total">
                            {` ${Math.floor(this.videoRef.current?.duration / 60) || '0'}:${this.pad(
                              Math.floor(this.videoRef.current?.duration % 60)
                            )} `}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <ContentSidebarLayout
                currentPage={currentPage}
                totalComments={totalComment}
                performer={performer}
                feed={feed}
                openCommentModal={() => {
                  this.showComment();
                }}
                showCommentModel={showComment}
              />
              <ContentLeftbarLayout
                currentPage={currentPage}
                performer={performer}
                crossPromotion={crossPromotion}
              />
            </div>
          </div>
        </div> 
        {isHashtags ? 
          <div className="flex items-center justify-between gap-4 py-4 pt-8 max-w-[450px] m-auto">
            <a href={`/hashtag?keyword=${hashtag1?.trim()}&type=${feed.type}`} className='text-xl font-semibold'>{hashtag1}</a>
            <a href={`/hashtag?keyword=${hashtag2?.trim()}&type=${feed.type}`} className='text-xl font-semibold'>{hashtag2}</a>
            <a href={`/hashtag?keyword=${hashtag3?.trim()}&type=${feed.type}`} className='text-xl font-semibold'>{hashtag3}</a>
          </div>
        : null}
        <Divider className={`${isHashtags ? 'mb-10' : 'my-16'} mx-auto`} style={{ maxWidth: '345px'}} />
        <Modal
          key="comment_post"
          className="subscription-modal"
          title={null}
          visible={showComment}
          footer={null}
          destroyOnClose
          onCancel={() => this.setState({ showComment: false, commentPage: 0 })}
        >
          <div className="descriptions-and-comment">
            <div className="select-category-comment">
              <span className="total-comment">
                Comments (
                {totalComment}
                )
                {' '}
              </span>
              <div className="filter-comment">
                <Dropdown.Button
                  className="dropdown-btn"
                  overlay={userMenu}
                  icon={(
                    <AlignRightOutlined
                      rotate={180}
                      style={{
                        fontSize: '28px',
                        border: 'none'
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className={showComment ? 'show' : 'hide'}>
              <div className="all-comment">
                <CommentForm
                  creator={user}
                  onSubmit={this.onFinishComment.bind(this)}
                  objectId={feed._id}
                  objectType="feed"
                  siteName={siteName}
                />
                <ListComments
                  key={`list_comments_${feed._id}_${comments?.length}`}
                  // eslint-disable-next-line no-prototype-builtins
                  requesting={commentMapping.hasOwnProperty(feed._id) ? commentMapping[feed._id].requesting : false}
                  comments={comments}
                  feedOwnerId={feed.fromSourceId}
                  loadMore={this.moreComment.bind(this)}
                  onDelete={this.deleteComment.bind(this)}
                  user={user}
                  canLoadmore={
                    commentMapping[feed._id] && (commentPage + 1) * itemPerPage < commentMapping[feed._id].total
                  }
                  canReply
                />
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          key="report_post"
          className="subscription-modal"
          title={null}
          visible={openReportModal}
          footer={null}
          destroyOnClose
          onCancel={() => this.setState({ openReportModal: false })}
        >
          <ReportForm objectType={feed.type} performer={performer} submiting={requesting} onFinish={this.reportVideo.bind(this)} />
        </Modal>
        <Modal
          key="verified_email"
          className="subscription-modal"
          title="Please verify your email address"
          visible={openVerifiedEmailModal}
          footer={null}
          destroyOnClose
          onCancel={() => this.setState({ openVerifiedEmailModal: false })}
        >
          <VerifiedEmailForm />
        </Modal>
      </>
    );
  }
}

const mapStates = (state: any) => {
  const { commentMapping, comment } = state.comment;
  return {
    comment,
    commentMapping,
    siteName: state.ui.siteName,
    user: state.user.current,
    loggedIn: state.auth.loggedIn,
    ui: { ...state.ui }
  };
};

const mapDispatch = {
  getComments,
  moreComment,
  createComment,
  deleteComment,
  removeFeedSuccess,
  updateStatsView,
  removeTrendingFeedSuccess,
  setMetaThumbnail
};

export default connect(mapStates, mapDispatch)(FeedVideo);
