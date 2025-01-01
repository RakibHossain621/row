import { IFeed, IPerformer } from '@interfaces/index';
import {
  FacebookShareButton, TwitterShareButton, TwitterIcon, FacebookIcon
} from 'react-share';
import './performer.less';

interface IProps {
  performer: IPerformer
  post: IFeed;
  siteName: string;
}

const SocialSharePost = ({ post, siteName, performer }: IProps) => {
  const shareUrl = `${window.location.origin}/post/${post?._id}/?introducerId=${performer._id}`;
  return (
    <div className="social-share-btns">
      <FacebookShareButton url={shareUrl} quote={post?.text || ''} hashtag={`#${performer?.username} #${performer?.name}`}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={post?.text || ''} hashtags={[siteName, performer?.username, performer?.name]}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
    </div>
  );
};

export default SocialSharePost;
