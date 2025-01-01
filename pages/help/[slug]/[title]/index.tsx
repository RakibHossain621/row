import {
  Layout, message, Col, Row, Image, Spin
} from 'antd';
import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import ButtonFollow from '@components/common/buttonFollow';
import Head from 'next/head';
import '../../index.less';
import { postService, postCategoryService } from 'src/services';
import Link from 'next/link';
import { InView } from 'react-intersection-observer';
import { delay } from 'src/lib';
import { feedService } from '@services/feed.service';
import 'suneditor/dist/css/suneditor.min.css';

interface IProps {
  currentUser;
  slug;
  title;
  ui: any;
  loggedIn:boolean;
}
class DetailHelpPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  videoRef: any;

  mounted: boolean = false;

  state = {
    post: {} as any,
    inView: false,
    category: {} as any,
    loading: false,
    isPlaying: false,
    loop: 0
  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    const { slug, title } = query;
    try {
      return {
        slug,
        title
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
    await this.getCategorybySlug();
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

  async getCategorybySlug() {
    const { slug } = this.props;
    try {
      this.setState({ loading: true });
      const resp = await postCategoryService.findById(slug);
      await this.setState({
        category: resp.data
      });
    } catch (e) {
      message.error('An error occurred, please try again!');
    } finally {
      this.setState({ loading: false });
    }
  }

  async getPost() {
    const { title } = this.props;
    try {
      this.setState({ loading: true });
      const resp = await postService.findById(title);
      await this.setState({
        post: resp.data
      });
    } catch (e) {
      message.error('An error occurred, please try again!');
    } finally {
      this.setState({ loading: false });
    }
  }

  pauseVideo() {
    if (this.videoRef.current.play) {
      this.videoRef.current.pause();
    }
  }

  async playVideo(feedId: string) {
    const { currentUser } = this.props;
    const { post, loop, inView } = this.state;
    if (loop > 2) {
      return false;
    }
    await delay(150);
    if (inView && this.mounted) {
      this.videoRef.current?.play();
      this.setState({ isPlaying: true });
      currentUser._id
      && post.feed.fromSourceId !== currentUser._id
      && (await feedService.addView(feedId));
      this.setState({ loop: loop + 1 });
    }

    return true;
  }

  render() {
    const {
      post, category, loading, isPlaying
    } = this.state;
    const {
      currentUser, ui, loggedIn
    } = this.props;
    return (
      <Layout style={{ backgroundColor: 'white'}}>
        <Head>
          <title>
            {post?.title}
            {' '}
            |
            {' '}
            {ui && ui.siteName}
          </title>
        </Head>
        <div className="main-container">
          <div>
            <Link href="/help">
              <a href="/help">
                Help
              </a>
            </Link>
            <span style={{ marginLeft: '15px', color: 'blueviolet' }}>
              {'>>'}
            </span>
            <Link href={{ pathname: `/help/${category?.slug}` }}>
              <a href={`/help/${category?.slug}`} style={{ marginLeft: '15px' }}>
                {category?.title}
              </a>
            </Link>
          </div>
          <Row gutter={24} className="content-video">
            {post?.feed && (
            <Col
              // eslint-disable-next-line no-nested-ternary
              md={loggedIn ? (post?.feed[0]?.type === 'video' ? 7 : 10) : (post?.feed[0]?.type === 'video' ? 9 : 12)}
              sm={post?.feed[0]?.type === 'video' ? 9 : 12}
              xs={24}
            >
              <div
                style={{ display: 'flex', flexDirection: 'row', width: '90%' }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Link
                    href={{
                      pathname: '/model/profile',
                      query: {
                        username:
                          post?.feed[0]?.performer?.username
                          || post?.feed[0]?.performer?._id
                      }
                    }}
                  >
                    <Image
                      src={
                        post?.feed[0]?.performer?.avatar
                          ? post?.feed[0]?.performer.avatar
                          : '/static/no-avatar.png'
                      }
                      alt="avatar"
                      className="image-help"
                    />
                  </Link>
                  <Link
                    href={{
                      pathname: '/model/profile',
                      query: {
                        username:
                          post?.feed[0]?.performer?.username
                          || post?.feed[0]?.performer._id
                      }
                    }}
                  >
                    <span style={{ fontWeight: 600, marginLeft: '5px' }}>
                      {' '}
                      {post?.feed[0]?.performer?.name
                      && post?.feed[0]?.performer?.name !== ' '
                        ? post?.feed[0]?.performer.name
                        : post?.feed[0]?.performer.username}
                    </span>
                  </Link>
                  <div
                    style={{
                      display: 'flex',
                      marginLeft: '5px',
                      maxWidth: '30%'
                    }}
                  >
                    {currentUser?._id
                      && post?.feed[0]?.performer
                      && post?.feed[0]?.performer._id !== currentUser._id && (
                        <ButtonFollow
                          performer={post?.feed[0]?.performer}
                          isHideOnClick={false}
                          targetId={post?.feed[0]?.performer._id}
                          sourceId={currentUser?._id}
                          isFollow={post?.feed[0]?.performer.isFollowed}
                          getPerformerList={() => {}}
                        />
                    )}
                  </div>
                </div>
              </div>
              {post?.feed[0]?.files[0] && (
                <div className="video-help">
                  <div className="inside-help">
                    <div className="help">
                      <InView threshold={0.8} onChange={(inView) => this.setState({ inView })}>
                        <video
                          onContextMenu={(event) => { event.preventDefault(); }}
                          controls
                          onClick={() => {
                            isPlaying ? this.pauseVideo() : this.playVideo(post?.feed[0]?._id);
                          }}
                          autoPlay={false}
                          src={
                            post?.feed[0]?.files[0].url
                            || './static/background.gif'
                          }
                          ref={this.videoRef}
                          disablePictureInPicture
                          controlsList="nodownload noplaybackrate"
                          onEnded={() => this.playVideo(post?.feed[0]?._id)}
                        />
                      </InView>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            )}
            <Col span={post?.feed ? 12 : 24} className="content-help">
              <div
                className="sun-editor-editable"
                style={{ display: 'contents' }}
              // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: post?.content }}
              />
            </Col>
          </Row>
        </div>
        {loading && (
        <div className="text-center">
          <Spin />
        </div>
        )}
      </Layout>
    );
  }
}
const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current },
  loggedIn: state.auth.loggedIn

});
export default connect(mapStates)(DetailHelpPage);
