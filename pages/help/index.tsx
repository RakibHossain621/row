import {
  Layout, message, Row, Col, Button, Divider
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Error from 'next/error';
import './index.less';
import { postCategoryService } from 'src/services';
import Link from 'next/link';
import { IPerformer } from '@interfaces/performer';

interface IProps {
  error: any;
  loggedIn: boolean;
  currentUser : IPerformer
}
class HelpPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    pagination: {} as any,
    categories: [],
    firstCategory: {} as any,
    limit: 10,
    filter: {
      sortBy: 'ordering',
      sort: 'asc'
    } as any

  };

  async componentDidMount() {
    this.getCategory();
  }

  async getCategory(page = 1) {
    const {
      filter, limit,
      pagination
    } = this.state;
    let firstCategory;
    try {
      const resp = await postCategoryService.search({
        ...filter,
        limit,
        offset: (page - 1) * limit
      });
      if (resp.data.data && resp.data.data.length > 0) {
        firstCategory = resp.data.data.shift();
      }
      await this.setState({
        categories: resp.data.data,
        firstCategory,
        pagination: {
          ...pagination,
          total: resp.data.total,
          pageSize: limit
        }
      });
    } catch (e) {
      message.error('An error occurred, please try again!');
    }
  }

  render() {
    const {
      error,
      loggedIn,
      currentUser
    } = this.props;
    const {
      categories, firstCategory
    } = this.state;
    if (error) {
      return <Error statusCode={error?.statusCode || 404} title={error?.message || 'Sorry, we can\'t find this page'} />;
    }
    return (
      <Layout style={{ backgroundColor: 'white'}}>
        <Head>
          <title>
            Help
          </title>
        </Head>
        <div className="main-container">
          <h1 className="title">
            Help
          </h1>
          <div className="layout-content-help">
            <Row style={{ maxWidth: '420px'}} gutter={[16, 8]}>
              {firstCategory?.slug && ((loggedIn && firstCategory.roles.every((v) => currentUser?.roles?.includes(v))) || !firstCategory.roles.length) && (
              <Col span={24} style={{ display: 'flex', justifyContent: 'center'}}>
                <Link
                  href={{
                    pathname: '/help/topic',
                    query: { type: 'post', slug: firstCategory?.slug, title: firstCategory?.title }
                  }}
                  as={`/help/${firstCategory?.slug}`}
                >
                  <a className="caster-category">
                    {firstCategory?.title}
                  </a>
                </Link>
              </Col>
              )}
              {categories && categories.map((category) => (
                <>
                  { ((loggedIn && category.roles.every((v) => currentUser?.roles?.includes(v))) || !category.roles.length) && (
                  <Col
                    span={12}
                    style={{
                      display: 'flex', justifyContent: 'center',
                    }}
                  >
                    <Link
                      href={{
                        pathname: '/help/topic',
                        query: { type: 'post', slug: category.slug, title: category.title }
                      }}
                      as={`/help/${category?.slug}`}
                    >
                      <a className="help-category">
                        {category.title}
                      </a>
                    </Link>
                  </Col>
                  ) }
                </>
              ))}
            </Row>
            <Divider type="horizontal" style={{ border: '0,5px solid black', backgroundColor: 'black' }} />
            <span className="help-contact">
              Support
            </span>
            <div className="help-contact">
              {loggedIn ? (
                <Button
                  className="btn-contact"
                  href="/contact"
                >
                  Contact Us
                </Button>
              ) : (
                <Button
                  className="btn-contact"
                  disabled
                >
                  Contact Us
                </Button>
              )}
            </div>
            {!loggedIn && (
            <span className="help-contact">
              Login to Contact Us
            </span>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStates = (state: any) => ({
  ui: { ...state.ui },
  loggedIn: state.auth.loggedIn,
  currentUser: state.user.current

});
export default connect(mapStates)(HelpPage);
