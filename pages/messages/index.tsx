import { PureComponent } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { IUIConfig } from 'src/interfaces/';
import Messenger from '@components/messages/Messenger';
import { resetMessageState } from '@redux/message/actions';
import Layout from 'antd/lib/layout/layout';

interface IProps {
  ui: IUIConfig;
  query: Record<string, string>;
  resetMessageState: Function;
}

class Messages extends PureComponent<IProps> {
  static authenticate = true;

  static getInitialProps({ ctx }) {
    return {
      query: ctx.query
    };
  }

  componentWillUnmount() {
    const { resetMessageState: resetStateHandler } = this.props;
    resetStateHandler();
  }

  render() {
    const { ui, query = {} } = this.props;
    return (
      <Layout className="ant-home-layout" style={{ height: '100%' }}>
        <Head>
          <title>
            {ui && ui.siteName}
            {' '}
            | Messages
          </title>
        </Head>
        <Messenger toSource={query.toSource} toId={query.toId} />
      </Layout>
    );
  }
}

const mapStates = (state: any) => ({
  ui: { ...state.ui }
});

const mapDispatch = { resetMessageState };
export default connect(mapStates, mapDispatch)(Messages);
