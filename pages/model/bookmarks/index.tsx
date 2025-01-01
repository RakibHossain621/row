import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import Head from 'next/head';
import PageHeading from '@components/common/page-heading';
import { IUIConfig } from 'src/interfaces/';
import HomePageHeader from '@layouts/home-page-header';
import ScrollListFeed from '@components/post/scroll-list';
import { getFeeds, moreFeeds } from '@redux/feed/actions';
import { feedService } from '@services/feed.service';
import { BookOutlined } from '@ant-design/icons';
import PhotoIcon from "src/icons/PhotoIcon";
import VideoIcon from "src/icons/VideoIcon";

interface IProps {
  ui: IUIConfig;
}

const Performers = ({ ui }: IProps) => {
  const [photoFeeds, setPhotoFeeds] = useState([] as Array<any>);
  const [videoFeeds, setVideoFeeds] = useState([] as Array<any>);
  const [loading, setLoading] = useState(false);
  const [feedPage, setfeedPage] = useState(0);
  const [tab, setTab] = useState('videos');
  const [itemPerPage] = useState(99);

  const loadBookmarkPosts = async () => {
    setLoading(true);
    const query = {
      limit: itemPerPage,
      offset: 0
    };
    setfeedPage(0);
    setLoading(true);
    let resp = null;
    let photos = null;
    let videos = null;

    try {
      resp = await feedService.getBookmark({
        ...query
      });
      photos = await resp.data.data.map((a) => a.objectInfo);
      videos = await resp.data.data.map((a) => a.objectInfo);

      setPhotoFeeds(photos.filter((item) => item?.type === 'photo'));
      setVideoFeeds(videos.filter((item) => item?.type === 'video'));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const loadMoreBookmarks = async () => {
    setLoading(true);
    const query = {
      limit: itemPerPage,
      offset: (feedPage + 1) * itemPerPage
    };
    setfeedPage(feedPage + 1);
    let resp = null;
    let photos = null;
    let videos = null;
    try {
      resp = await feedService.getBookmark({
        ...query
      });
      photos = await resp.data.data.map((a) => a.objectInfo);
      videos = await resp.data.data.map((a) => a.objectInfo);

      setPhotoFeeds(
        photoFeeds.concat(photos.filter((item) => item?.type === 'photo'))
      );
      setVideoFeeds(
        videoFeeds.concat(videos.filter((item) => item?.type === 'video'))
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarkPosts();
  }, [tab]);

  return (
    <Layout>
      <Head>
        <title>
          {ui && ui.siteName}
          {' '}
          | Bookmarks
        </title>
      </Head>
      <div className="main-container">
        <HomePageHeader
          title='Bookmarked'
          tabs={[
            { key: 'videos', tab: 'Videos', label:"Video",  icon: <VideoIcon color={tab === 'videos' ? '#212121' : '#ADADAD'} />},
            { key: 'photos', tab: 'Photos', label:"Photos", icon: <PhotoIcon color={tab === 'photos' ? '#212121' : '#ADADAD'} /> }
          ]}
          handleTabChange={(val) => setTab(val)}
          defaultTab={tab}
        />
        <PageHeading title={`Bookmark ${tab}`} icon={<BookOutlined />} />
        <div className="main-container">
          <div
            style={{
              display: 'flex',
              width: '100%',
              padding: '20px',
              justifyContent: 'center'
            }}
          />
          {tab === 'photos' ? (
            <ScrollListFeed
              items={photoFeeds}
              loading={loading}
              canLoadmore
              loadMore={() => loadMoreBookmarks()}
              isGrid
              isBookmarkPage
              performer={null}
              tab={tab}
            />
          ) : (
            <ScrollListFeed
              items={videoFeeds}
              loading={loading}
              canLoadmore
              loadMore={() => loadMoreBookmarks()}
              isGrid
              isBookmarkPage
              performer={null}
              tab={tab}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: state.user.current,
  feedState: { ...state.feed.feeds }
});

const mapDispatch = {
  getFeeds,
  moreFeeds
};
export default connect(mapStates, mapDispatch)(Performers);
