import React, { PureComponent } from 'react';
import Head from 'next/head';
import { Layout, Spin } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { postService } from '@services/post.service';
import { connect } from 'react-redux';
import Router from 'next/router';
import { IPostResponse } from '@interfaces/post';
import PageHeading from '@components/common/page-heading';

interface IProps {
  ui: any;
  post: IPostResponse;
}

interface IState {
  loading: boolean;
  error: string | null;
  post: IPostResponse | null;
}

class PostDetail extends PureComponent<IProps, IState> {
  static authenticate = true;

  static noredirect = true;

  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true, 
      error: null,  
      post: null    
    };
  }

  async componentDidMount() {
    const { post } = this.props;
    if (!post) {
      this.fetchPost();
    } else {
      this.setState({ post, loading: false });
    }
  }

  fetchPost = async () => {
    const { query } = Router as any;
    
    try {
      this.setState({ loading: true, error: null });
      const response = await postService.findById(query?.id);
      this.setState({ post: response.data, loading: false });
    } catch (err) {
      console.error('Error fetching post:', err);
      this.setState({
        error: 'Unable to fetch the post. Please try again later.',
        loading: false
      });
    }
  };

  render() {
    const { ui } = this.props;
    const { loading, error, post } = this.state;

    return (
      <Layout>
        <Head>
          <title>{`${ui?.siteName} | ${post?.title || ''}`}</title>
        </Head>
        <div className="main-container">
          <div className="page-container">
            {loading ? (
              <Spin size="large" /> 
            ) : error ? (
              <div className="error-message">{error}</div> 
            ) : (
              <>
                <PageHeading
                  title={post?.title || 'Page was not found'}
                  icon={<ReadOutlined />}
                />
                <div
                  className="page-content"
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                />
              </>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

const mapProps = (state: any) => ({
  ui: state.ui
});

export default connect(mapProps)(PostDetail);