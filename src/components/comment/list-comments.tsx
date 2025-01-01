/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { Spin } from 'antd';
import CommentItem from '@components/comment/comment-item';
import { IComment, IPerformer } from 'src/interfaces/index';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IProps {
  comments: IComment[];
  requesting: boolean;
  onDelete?: Function;
  user?: IPerformer;
  canReply?: boolean;
  canLoadmore? :boolean;
  loadMore?() :Function;
  isReply? :boolean;
  feedOwnerId?: string;
}

export default class ListComments extends PureComponent<IProps> {
  render() {
    const {
      comments, requesting, user, onDelete, canReply, canLoadmore, loadMore, isReply, feedOwnerId
    } = this.props;

    return (
      <>
        {(!requesting && !comments.length) ? <div className="text-center" style={{ padding: '5px' }} />
          : (
            <div id="scrollableModal" className={isReply ? 'cmt-list' : 'cmt-list reply'}>
              <InfiniteScroll
                dataLength={comments.length}
                hasMore={canLoadmore}
                loader={null}
                next={loadMore}
                endMessage={null}
                scrollThreshold={0.7}
                scrollableTarget="scrollableModal"
              >
                {comments.map((comment: IComment) => <CommentItem feedOwnerId={feedOwnerId} canReply={canReply} key={comment._id} item={comment} user={user} onDelete={onDelete} />)}
                {requesting && <div className="text-center" style={{ margin: 20 }}><Spin /></div>}
              </InfiniteScroll>
            </div>
          )}
      </>

    );
  }
}
