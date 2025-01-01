import Head from 'next/head';
import { PureComponent } from 'react';
import { Layout } from 'antd';
import PageHeading from '@components/common/page-heading';
import { connect } from 'react-redux';
import { IUIConfig } from '@interfaces/index';
import FeedForm from '@components/post/form';
import { FireOutlined } from '@ant-design/icons';
import HomePageHeader from '@layouts/home-page-header';

import './index.less';

interface IProps {
  ui: IUIConfig;
  query: { [key: string]: string};
}

class CreatePost extends PureComponent<IProps> {
  static authenticate = true;

  // static onlyPerformer = true;

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    return { query };
  }

  state = {
    tab: 'video'
  };

  async componentDidMount() {
    const { query } = this.props;
    if (query && query.post) {
      this.setState({ tab: query.post });
    }
  }

  async handleTabChange(currentTab) {
    this.setState({ tab: currentTab });
  }

  render() {
    const { ui } = this.props;
    const { tab } = this.state;
    return (
      <Layout>
        <Head>
          <title>
            {ui?.siteName}
            {' '}
            | New Post
          </title>
        </Head>
        <div className="main-container">
          <HomePageHeader
            tabs={[
              { key: 'video', tab: 'Post Video' },
              { key: 'photo', tab: 'Post Photo' }
            ]}
            handleTabChange={(val) => this.handleTabChange(val)}
            defaultTab={tab}
          />
          <PageHeading icon={<FireOutlined />} title={`Post new ${tab} `} />
          <div>
            <FeedForm type={tab} />
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStates = (state) => ({
  ui: { ...state.ui },
  user: { ...state.user.current }
});
export default connect(mapStates)(CreatePost);
