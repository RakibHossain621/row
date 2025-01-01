import {

  Layout
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import Head from 'next/head';
import {
  IUIConfig
} from 'src/interfaces';
import Error from 'next/error';
import '@components/performer/performer.less';

interface IProps {
  ui: IUIConfig;
  error: any;

}

class CreateRecast extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {

  };

  static async getInitialProps({ ctx }) {
    const { query } = ctx;
    try {
      return {
        query
      };
    } catch (e) {
      const error = await Promise.resolve(e);
      return { error };
    }
  }

  async componentDidMount() {
  }

  render() {
    const {
      error, ui
    } = this.props;
    if (error) {
      return (
        <Error
          statusCode={error?.statusCode || 404}
          title={error?.message || "Sorry, we can't find this page"}
        />
      );
    }

    return (
      <Layout>
        <Head>
          <title>
            {`${ui?.siteName} | New Recast`}
          </title>
        </Head>
        <div className="main-container">
          <div className="page-heading" style={{ justifyContent: 'center', fontSize: '40px' }}>
            <span>
              Recast of Original
            </span>
          </div>

          <div className="add-container">
            <div className="title-recast">
              Recast videos must be created on Mobile
              <br />
              {' '}
              Download our apps
            </div>

            <div className="mobile_button_row">
              <a className="img_link" href="#" target="_blank" rel="noreferrer">
                <img
                  className="iOS_app_button"
                  src="https://store.cloudflare.steamstatic.com/public/images/mobile/download_apple_button.png"
                  alt=""
                />

              </a>
              <a className="img_link" href="#" target="_blank" rel="noopener">
                <img
                  className="android_app_button"
                  src="https://store.cloudflare.steamstatic.com/public/images/mobile/download_google_button.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current }

});

export default connect(mapStates)(CreateRecast);
