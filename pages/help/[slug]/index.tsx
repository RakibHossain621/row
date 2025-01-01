import {
  Layout, message, Col, Row, Spin
} from 'antd';
import { PureComponent } from 'react';
import Head from 'next/head';
import '../index.less';
import { postService, postCategoryService } from 'src/services';
import Link from 'next/link';
import { connect } from 'react-redux';
import { IUser } from '@interfaces/user';
import { redirect404 } from '@lib/utils';

interface IProps {
  query: { [key: string]: any };
  slug : any;
  currentUser : IUser;
  loggedIn: boolean;
}
class TopicPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  videoRef: any;

  state = {
    pagination: {} as any,
    page: 0,
    limit: 20,
    topics: [],
    firstTopic: {} as any,
    category: {} as any,
    filter: {
      sortBy: 'ordering',
      sort: 'asc'
    } as any,
    loading: false

  };

  static async getInitialProps({ ctx }) {
    try {
      const { query } = ctx;
      return {
        query,
        slug: query.slug
      };
    } catch (error) {
      return redirect404(ctx);
    }
  }

  async componentDidMount() {
    await this.getCategorybySlug();
    this.getTopic();
  }

  async getCategorybySlug() {
    const {
      slug
    } = this.props;
    try {
      this.setState({ loading: true });
      const resp = await postCategoryService.findById(
        slug
      );
      await this.setState({
        category: resp.data
      });
    } catch (e) {
      message.error('An error occurred, please try again!');
    } finally {
      this.setState({ loading: false });
    }
  }

  async getTopic() {
    const {
      limit,
      pagination,
      page,
      category,
      filter
    } = this.state;
    const { query } = this.props;
    let firstTopic;

    try {
      this.setState({ loading: true });

      const resp = await postService.search(
        {
          ...query,
          categoryIds: category._id,
          ...filter,
          offset: page,
          limit
        }
      );
      if (resp.data.data && resp.data.data.length > 0) {
        firstTopic = resp.data.data.shift();
      }
      await this.setState({
        topics: resp.data.data,
        firstTopic,
        pagination: {
          ...pagination,
          total: resp.data.total,
          pageSize: limit
        }
      });
    } catch (e) {
      message.error('An error occurred, please try again!');
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      topics,
      category,
      firstTopic,
      loading
    } = this.state;

    const {
      currentUser,
      loggedIn
    } = this.props;
    return (
      <Layout style={{ backgroundColor: 'white'}}>
        <Head>
          <title>
            Help
          </title>
        </Head>
        <div className="main-container">
          <Link href="/help">
            <a href="/help">
              Help
            </a>
          </Link>
          <h1 className="title">
            { category && category?.title}
          </h1>
          <div className="layout-content-help">
            <Row style={{ maxWidth: '450px', width:'100%'}} gutter={20}>
              {!loading && firstTopic?.slug && ((loggedIn && firstTopic.roles.every((v) => currentUser?.roles?.includes(v))) || !firstTopic.roles.length) && (
              <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                <Link
                  href={{
                    pathname: `/help/${category.slug}/${firstTopic.slug}`,
                    query: { slug: category.slug, title: firstTopic.slug }
                  }}
                  as={`/help/${category?.slug
                  }/${firstTopic?.slug}`}
                >
                  <a className="caster-category">
                    {firstTopic?.title}
                  </a>
                </Link>
              </Col>
              ) }
              {!loading && topics && topics.map((topic) => (
                <>
                  { ((loggedIn && topic.roles.every((v) => currentUser?.roles?.includes(v))) || !topic.roles.length) && (
                  <Col span={12} style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                    <Link
                      href={{
                        pathname: `/help/${category.slug}/${topic.slug}`,
                        query: { slug: category.slug, title: topic.slug }
                      }}
                      as={`/help/${category?.slug
                      }/${topic.slug
                      } `}
                    >
                      <div className="help-category">
                        {topic.title}
                      </div>
                    </Link>
                  </Col>
                  )}
                </>
              ))}
            </Row>
          </div>
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
  currentUser: state.user.current,
  loggedIn: state.auth.loggedIn

});

export default connect(mapStates)(TopicPage);
