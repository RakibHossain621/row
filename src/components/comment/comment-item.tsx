/* eslint-disable react/require-default-props */
/* eslint-disable no-prototype-builtins */
import { PureComponent } from 'react';
import {
  Menu, Dropdown, message, Image, Modal
} from 'antd';
import {
  MoreOutlined, LikeOutlined, DislikeOutlined, HeartFilled
} from '@ant-design/icons';
import { reactionService } from '@services/index';
import { connect } from 'react-redux';
import CommentForm from '@components/comment/comment-form';
import ListComments from '@components/comment/list-comments';
import moment from 'moment';

import {
  getComments, moreComment, createComment, deleteComment
} from '@redux/comment/actions';
import { IComment, IPerformer } from 'src/interfaces/index';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const VerifiedEmailForm = dynamic(() => import('@components/performer/verified-email-form'), { ssr: false });

interface IProps {
  item: IComment;
  onDelete?: Function;
  user?: IPerformer;
  canReply?: boolean;
  getComments: Function;
  moreComment: Function;
  createComment: Function;
  deleteComment: Function;
  commentMapping: any;
  siteName: string;
  feedOwnerId?: string;
}

class CommentItem extends PureComponent<IProps> {
  state = {
    isLiked: false,
    isOpenComment: false,
    isFirstLoadComment: true,
    openVerifiedEmailModal: false,
    itemPerPage: 12,
    commentPage: 0,
    isReply: false,
    totalReply: 0,
    totalLike: 0
  };

  componentDidMount() {
    const { item } = this.props;
    if (item) {
      this.setState({
        isLiked: !!item.isLiked,
        totalLike: item.totalLike || 0,
        totalReply: item.totalReply ? item.totalReply : 0
      });
    }
  }

  async handleComment(values) {
    const { createComment: handleCreate, user } = this.props;
    if (!user.verifiedEmail) {
      return this.setState({ openVerifiedEmailModal: true });
    }
    const { totalReply } = this.state;
    handleCreate(values);
    await this.setState({ totalReply: totalReply + 1 });
    this.onOpenComment();
    return true;
  }

  async onOpenComment() {
    const { item, getComments: handleGetComment } = this.props;
    const {
      isOpenComment, isFirstLoadComment, itemPerPage, commentPage
    } = this.state;
    this.setState({ isOpenComment: !isOpenComment });
    if (isFirstLoadComment) {
      await this.setState({ isFirstLoadComment: false });
      handleGetComment({
        objectId: item._id,
        objectType: 'comment',
        limit: itemPerPage,
        offset: commentPage
      });
    }
  }

  async likeComment(comment) {
    const { isLiked, totalLike } = this.state;
    try {
      if (!isLiked) {
        await reactionService.create({
          objectId: comment._id,
          action: 'like',
          objectType: 'comment'
        });
        this.setState({ isLiked: true, totalLike: totalLike + 1 });
      }
    } catch (e) {
      const error = await e;
      message.error(error.message || 'Error occured, please try again later');
    }
  }

  async unLikeComment(comment) {
    const { isLiked, totalLike } = this.state;
    try {
      if (isLiked) {
        await reactionService.delete({
          objectId: comment._id,
          action: 'like',
          objectType: 'comment'
        });
        this.setState({ isLiked: false, totalLike: totalLike - 1 });
      }
    } catch (e) {
      const error = await e;
      message.error(error.message || 'Error occured, please try again later');
    }
  }

  async moreComment() {
    const { item, moreComment: handleLoadMore } = this.props;
    const { commentPage, itemPerPage } = this.state;
    await this.setState({
      commentPage: commentPage + 1
    });
    handleLoadMore({
      limit: itemPerPage,
      objectType: 'comment',
      offset: (commentPage + 1) * itemPerPage,
      objectId: item._id
    });
  }

  async deleteComment(item) {
    const { deleteComment: handleDelete } = this.props;
    if (!window.confirm('Are you sure to remove this comment?')) return;
    handleDelete(item._id);
  }

  render() {
    const {
      item, user, canReply, onDelete, commentMapping, siteName, feedOwnerId
    } = this.props;
    const fetchingComment = commentMapping.hasOwnProperty(item._id) ? commentMapping[item._id].requesting : false;
    const comments = commentMapping.hasOwnProperty(item._id) ? commentMapping[item._id].items : [];
    const totalComments = commentMapping.hasOwnProperty(item._id) ? commentMapping[item._id].total : 0;
    const {
      isLiked, isOpenComment, isReply, totalReply, totalLike, openVerifiedEmailModal
    } = this.state;
    return (
      <div className='pb-4'>
        <div className="cmt-item" key={item._id}>
          <div className="flex flex-col items-center justify-center gap-2">
            <button onClick={this.likeComment.bind(this, item)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <mask id="mask0_3047_82820"   maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                  <rect width="20" height="20" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_3047_82820)">
                  <path d="M7 17V11.2083H3L10 2L17 11.2083H13V17H7ZM8.5 15.5H11.5V9.70833H13.9375L10 4.4375L6.0625 9.70833H8.5V15.5Z" fill="#121212"/>
                </g>
            </svg>
            </button>
            <span>
              {totalLike}
            </span>
            <button onClick={this.unLikeComment.bind(this, item)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clip0_3047_82822)">
                <mask id="mask0_3047_82822" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                  <rect width="20" height="20" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_3047_82822)">
                  <path d="M13 3.16211L13 8.95378L17 8.95378L10 18.1621L3 8.95377L7 8.95377L7 3.16211L13 3.16211ZM11.5 4.66211L8.5 4.66211L8.5 10.4538L6.0625 10.4538L10 15.7246L13.9375 10.4538L11.5 10.4538L11.5 4.66211Z" fill="#121212"/>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_3047_82822">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            </button>
          </div>
          <img alt="creator-avt" src={item?.creator?.avatar || '/static/no-avatar.png'} className="avatar" />
          <div className="cmt-content">
            <div className="cmt-text">
              {item?.creator?._id ? (
                <Link
                  href={{
                    pathname: '/model/profile',
                    query: {
                      username: item?.creator?.username || item?.creator?._id || 'N/A'
                    }
                  }}
                >
                  <a aria-hidden href="/model/profile">
                    {item?.creator?.name || item?.creator?.username || 'N/A'}
                  </a>
                </Link>
              ) : <p>N/A</p> }
              <div className="cmt-user">
                <span>
                  <span className="cmt-time">{moment(item.createdAt).fromNow()}</span>
                </span>
                {(user._id === item.createdBy || user._id === feedOwnerId) && (
                  <Dropdown
                    overlay={(
                      <Menu key={`menu_cmt_${item._id}`}>
                        <Menu.Item key={`delete_cmt_${item._id}`} onClick={() => onDelete(item)}>
                          <a>Report</a>
                        </Menu.Item>
                        <Menu.Item key={`delete_cmt_${item._id}`} onClick={() => onDelete(item)}>
                          <a>Delete</a>
                        </Menu.Item>
                      </Menu>
                    )}
                  >
                    <a aria-hidden className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                      <MoreOutlined />
                    </a>
                  </Dropdown>
                )}
              </div>
            </div>
            <div className="cmt-text">
              {item.content}
            </div>
            <div className="cmt-action">
              {canReply && (
                <a
                  aria-hidden
                  className={!isReply ? 'cmt-reply' : 'cmt-reply active'}
                  onClick={() => { this.setState({ isReply: !isReply }, () => this.onOpenComment()); }}
                >
                  {`${totalReply || ''} Reply`}
                </a>
              )}
            </div>
          </div>
        </div>
        {isOpenComment && (
          <div className="reply-bl-list">
            <div>
              <ListComments
                key={`list_comments_${item._id}_${comments.length}`}
                requesting={fetchingComment}
                comments={comments}
                onDelete={this.deleteComment.bind(this)}
                user={user}
                canReply={false}
                isReply={isReply}
                feedOwnerId={feedOwnerId}
              />
              {comments.length < totalComments && (
                <p className="text-center">
                  <a aria-hidden onClick={this.moreComment.bind(this)}>
                    more...
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
         {isReply 
         ?  <CommentForm
              creator={user}
              onSubmit={this.handleComment.bind(this)}
              objectId={item._id}
              objectType="comment"
              isReply
              siteName={siteName}
            />
          : null}
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
      </div>
    );
  }
}

const mapStates = (state: any) => {
  const { commentMapping, comment } = state.comment;

  return {
    commentMapping,
    comment,
    siteName: state.ui.siteName
  };
};

const mapDispatch = {
  getComments,
  moreComment,
  createComment,
  deleteComment
};
export default connect(mapStates, mapDispatch)(CommentItem);
