import {
  Layout, message
} from 'antd';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { performerService } from '@services/index';
import Head from 'next/head';
import {
  IPerformer
} from 'src/interfaces';
import Error from 'next/error';
import Router from 'next/router';
import '../private-waiting-room/index.less';

interface IProps {
  error: any;
  currentUser: IPerformer;
}

class NotQualified extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  state = {
    isAccept: false
  }

  handleRedirect = () => {
    const { isAccept } = this.state;
    if (isAccept) {
      const { currentUser } = this.props;
      performerService.updateMe(currentUser._id, { privateChat: false });

      Router.push('/go-live');
    } else {
      message.error('Please accept all terms & conditions before go live');
    }
  }

  render() {
    const {
      error
    } = this.props;

    if (error) {
      return <Error statusCode={error?.statusCode || 404} title={error?.message || 'Sorry, we can\'t find this page'} />;
    }

    return (
      <Layout className="model-private-waiting-room">
        <Head>
          <title>
            Get Verified
          </title>
        </Head>
        <div className="main-container">
          <div className="page-heading header-title">
            <span>
              Minimum withdrawal requirements
            </span>
          </div>
          <div className="guide">
            <ul>
              <li>Minimum withdrawal amount $100.00</li>
              <li>Verified account</li>
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current },
  settings: { ...state.settings }

});

export default connect(mapStates)(NotQualified);
