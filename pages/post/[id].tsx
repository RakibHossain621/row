/* eslint-disable no-param-reassign */
import Head from 'next/head';
import { PureComponent } from 'react';
import {
  message, Layout, Modal
} from 'antd';
import { feedService, cookieService, followService } from '@services/index';
import { connect } from 'react-redux';
import {
  IFeed, IUIConfig, IError, ISettings, IPerformer
} from '@interfaces/index';
import FeedVideo from '@components/performer/feed-video';

import Router from 'next/router';
import Error from 'next/error';
import Linkify from 'linkifyjs/react';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import CommentForm from '@components/comment/comment-form';
import ListComments from '@components/comment/list-comments';
import VerifiedEmailForm from '@components/performer/verified-email-form';
import {
  createComment, deleteComment, getComments, moreComment
} from '@redux/comment/actions';
import {
  updateStatsView
} from '@redux/user/actions';

hashtag(linkify);

interface IProps {
  error: IError;
  ui: IUIConfig;
  feed: IFeed;
  user: IPerformer;
  introducerId: string;
  settings:ISettings
  getComments: Function;
  moreComment: Function;
  createComment: Function;
  deleteComment: Function;
  updateStatsView : Function;
  commentMapping: any;
}

class PostDetails extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

 state = {
   openVerifiedEmailModal: false,
   showComment: false,
   commentPage: 0,
   itemPerPage: 5
 }

 static async getInitialProps({ ctx }) {
   try {
     const { introducerId } = ctx.query;
     const feed = await (await feedService.findOne(ctx.query.id, { Authorization: ctx.token })).data;
     return { introducerId, feed };
   } catch (e) {
     if (process.browser) {
       return Router.push('/');
     }

     ctx.res.writeHead && ctx.res.writeHead(302, { Location: '/' });
     ctx.res.end && ctx.res.end();
     return {};
   }
 }

 componentDidMount() {
   const { introducerId, user } = this.props;
   this.showComment();
   if (user?._id && introducerId) {
     return followService.create({
       targetId: introducerId || '',
       sourceId: user._id
     });
   }
   if (introducerId) {
     return cookieService.setCookie('introducerId', introducerId, 24 * 60);
   }
   return null;
 }

 async onFinishComment(comment: Comment) {
   const { createComment: handleCreateComment, user } = this.props;
   if (!user.verifiedEmail) {
     return this.setState({ openVerifiedEmailModal: true });
   }
   return handleCreateComment(comment);
 }

 async deleteVideo(feed: IFeed) {
   const { user, updateStatsView: handleUpdateStatsView } = this.props;
   if (user._id !== feed.fromSourceId) {
     message.error('Permission denied');
     return;
   }
   if (!window.confirm('Are you sure to delete this post?')) return;
   try {
     await feedService.delete(feed._id);
     handleUpdateStatsView({ views: -feed.stats.views });

     message.success('Deleted the post successfully');
     Router.push(
       { pathname: '/model/profile', query: { username: user.username || user._id, tab: feed?.type } },
       `/${user.username || user._id}`
     );
   } catch {
     message.error('Something went wrong, please try again later');
   }
 }

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

 async deleteComment(item) {
   const { deleteComment: handleDelete } = this.props;
   if (!window.confirm('Are you sure to remove this comment?')) return;
   handleDelete(item._id);
 }

 render() {
   const {
     feed, ui, error, settings, user, commentMapping
   } = this.props;

   const {
     openVerifiedEmailModal,
     itemPerPage,
     commentPage
   } = this.state;
   const thumbUrl = (feed?.type === 'photo' ? (feed.files
      && feed.files[0]
      && feed.files[0]?.url)
     : (feed?.thumbnail?.url)
          || (feed.files
            && feed.files[0] && ((feed.files[0]?.thumbnailUrl)
          ))) || '/static/leaf.jpg';
   if (error) {
     return <Error statusCode={error?.statusCode || 404} title={error?.message || 'Post was not found'} />;
   }
   const { performer } = feed;
   const linkifyOptions = {
     formatHref(href, category) {
       if (category === 'hashtag') {
         href = `/hashtag?keyword=${href.substring(1)}&type=${feed.type}`;
       }
       return href;
     }
   };

   // eslint-disable-next-line no-prototype-builtins
   const comments = commentMapping.hasOwnProperty(feed._id) ? commentMapping[feed._id].items : [];

   console.log(feed.hashtag1)

   return (
     <>
       <Head>
         <title>
           {`${feed?.text} - @${performer?.username} | ${ui?.siteName}`}
         </title>
         <meta name="keywords" content={settings && settings.metaKeywords} />
         <meta name="description" content={settings && settings.metaDescription} />
         {/* OG tags */}
         <meta property="og:type" content="website" />
         <meta property="og:title" content={ui && ui.siteName} />
         <meta property="og:image" content={thumbUrl} />
         <meta property="og:description" content={settings && settings.metaDescription} />
         {/* Twitter tags */}
         <meta property="twitter:card" content="summary" />
         <meta property="twitter:title" content={ui && ui.siteName} />
         <meta property="twitter:image" content={thumbUrl} />
         <meta property="twitter:description" content={settings && settings.metaDescription} />
       </Head>
       <div className="main-container custom pt-8" style={{ height: '100%' }}>
         <FeedVideo isHashtags={true} onDelete={this.deleteVideo.bind(this)} feed={feed} currentPage="post" key={`${feed?._id}`} />
         <div className="all-comment max-w-[500px] m-auto">
           <CommentForm
             creator={user}
             onSubmit={this.onFinishComment.bind(this)}
             objectId={feed._id}
             objectType="feed"
           />
           <nav className='flex items-center justify-between pt-6 pb-2'>
            <span className='text-black font-semibold'>{comments.length} comments</span>
            <fieldset>
              <label className='text-md text-purple-800' htmlFor="filterComments">Sort by:</label>
              <select className='border-0 text-sm font-semibold text-purple-800 px-2' name='filterComments' id='filterComments'>
                <option>Most Recent</option>
                <option>Top comments</option>
              </select>
            </fieldset>
           </nav>
           <ListComments
             key={`list_comments_${feed._id}_${comments.length}`}
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
const mapStates = (state : any) => {
  const { commentMapping, comment } = state.comment;
  return {
    ui: { ...state.ui },
    user: state.user.current,
    settings: { ...state.settings },
    commentMapping,
    comment
  };
};
const dispatch = {
  getComments,
  moreComment,
  createComment,
  deleteComment,
  updateStatsView
};
export default connect(mapStates, dispatch)(PostDetails);
