import {
  Layout, message, Col, Row
} from 'antd';
import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import './index.less';
import { postService } from 'src/services';
import { delay } from 'src/lib';
import { feedService } from '@services/feed.service';
import 'suneditor/dist/css/suneditor.min.css';

interface IProps {
  // query: { [key: string]: any };
  currentUser;
  slugTitle;
}
class MobileHelpPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  static layout = 'mobile';

  videoRef: any;

  mounted: boolean = false;

  state = {
    post: {} as any,
    inView: false,
    loop: 0
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    const { slugCategory, slugTitle } = query;
    try {
      return {
        slugCategory,
        slugTitle
      };
    } catch (e) {
      const error = await Promise.resolve(e);
      return { error };
    }
  }

  async componentDidMount() {
    this.mounted = true;
    if (!this.videoRef) {
      this.videoRef = createRef();
    }

    this.getPost();
  }

  componentDidUpdate(prevProps, prevStates) {
    const { post, inView } = this.state;

    if (inView !== prevStates.inView) {
      if (inView) {
        this.playVideo(post?.feed[0]?._id);
      } else {
        this.pauseVideo();
      }
    }
  }

  async getPost() {
    const { slugTitle } = this.props;
    try {
      const resp = await postService.findById(slugTitle);
      await this.setState({
        post: resp.data
      });
    } catch (e) {
      message.error('An error occurred, please try again!');
    }
  }

  pauseVideo() {
    if (this.videoRef.current.play) {
      this.videoRef.current.pause();
    }
  }

  async playVideo(feedId: string) {
    const { currentUser } = this.props;
    const { post, loop } = this.state;
    if (loop > 50) {
      return false;
    }
    await delay(150);

    currentUser._id
      && post.feed.fromSourceId !== currentUser._id
      && (await feedService.addView(feedId));
    this.setState({ loop: loop + 1 });
    return true;
  }

  render() {
    const { post } = this.state;
    return (
      <Layout className="helper-layout">
        <h1 className="title">{post?.title}</h1>
        <p className="guide-title">{post?.shortDescription}</p>
        <Row gutter={24} className="content-video">
          <Col span={24} className="content-help">
            <div
              className="sun-editor-editable"
              style={{ display: 'contents' }}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </Col>
        </Row>
      </Layout>
    );
  }
}
const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current }
});
export default connect(mapStates)(MobileHelpPage);
