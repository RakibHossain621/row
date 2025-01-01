import { useEffect, useState } from 'react';
import {
  Layout
} from 'antd';
import { connect } from 'react-redux';
import Head from 'next/head';
import '@components/performer/performer.less';
import ScrollListFeed from '@components/post/scroll-list';
import { getFeeds, moreFeeds, resetFeeds } from '@redux/feed/actions';
import { redirect404 } from '@lib/utils';
import Link from 'next/link';

interface IProps {
  query: { [key: string]: any };
  getFeeds:Function;
  moreFeeds:Function;
  resetFeeds:Function;
  feedState:any
  settings:any;
  ui:any;
  metaDataThumbnail:string;
}

const Hashtags = ({
  query,
  ui,
  settings,
  getFeeds: handleGetFeeds,
  moreFeeds: handleMoreFeeds,
  resetFeeds: handleResetFeed,
  feedState,
  metaDataThumbnail

}:IProps) => {
  const [loading, setLoading] = useState(false);
  const [feedPage, setfeedPage] = useState(0);
  const [itemPerPage] = useState(12);
  const { type, keyword } = query;

  const loadHashTags = async () => {
    try {
      setLoading(true);
      handleGetFeeds({
        q: keyword,
        limit: itemPerPage,
        type,
        offset: itemPerPage * feedPage,
        sortBy: 'mostViewInCurrentDay',
        sort: 'desc'
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const loadMoreHashTags = async () => {
    handleMoreFeeds({
      q: keyword,
      limit: itemPerPage,
      type,
      offset: itemPerPage * (feedPage + 1),
      sortBy: 'mostViewInCurrentDay',
      sort: 'desc'
    });
    setfeedPage(feedPage + 1);
  };

  useEffect(() => {
    loadHashTags();
    return () => {
      handleResetFeed();
    };
  }, []);

  const { items } = feedState;
  return (
    <Layout>
      <Head>
        <title>
          Discover Hashtags
          {' '}
          |
          {' '}
          Caster
        </title>
        <meta name="keywords" content={settings && settings.metaKeywords} />
        <meta name="description" content={settings && settings.metaDescription} />
        {/* OG tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ui && ui.siteName} />
        <meta property="og:image" content={metaDataThumbnail} />
        <meta property="og:description" content={settings && settings.metaDescription} />
        {/* Twitter tags */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={ui && ui.siteName} />
        <meta property="twitter:image" content={metaDataThumbnail} />
        <meta property="twitter:description" content={settings && settings.metaDescription} />
      </Head>
      <div className="main-container">
        <h2 className="text-center"><Link href={{ pathname: '/discover', query: { tab: 'hashtag' } }}><a href="/discover?tab=hashtag">{`#${keyword}`}</a></Link></h2>
        <>
          <ScrollListFeed
            items={items}
            loading={loading}
            canLoadmore
            loadMore={() => loadMoreHashTags()}
            isGrid
            performer={null}
            tab={null}
          />
        </>
      </div>
    </Layout>
  );
};

Hashtags.authenticate = true;
Hashtags.noredirect = true;

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  feedState: { ...state.feed.feeds },
  settings: { ...state.settings },
  metaDataThumbnail: state.feed.metaDataThumbnail
});

const mapDispatch = {
  getFeeds,
  moreFeeds,
  resetFeeds

};

Hashtags.getInitialProps = async ({ ctx }) => {
  try {
    const { query } = ctx;
    return { query };
  } catch (e) {
    return redirect404(ctx);
  }
};

export default connect(mapStates, mapDispatch)(Hashtags);
