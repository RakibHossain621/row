import { PureComponent } from 'react';
import dynamic from 'next/dynamic';
import {
  Layout, BackTop, Row, Col
} from 'antd';
import { connect } from 'react-redux';
import { Router } from 'next/router';
import { IUIConfig } from 'src/interfaces/ui-config';
import { loadUIValue } from '@redux/ui/actions';
import './primary-layout.less';
// const Footer = dynamic(() => import('@components/common/layout/footer'));
const Loader = dynamic(() => import('@components/common/base/loader'));

interface DefaultProps {
  loadUIValue: Function;
  children: any;
  ui: IUIConfig
}

class MobileLayout extends PureComponent<DefaultProps> {
  state = {
    routerChange: false
  };

  componentDidMount() {
    const { loadUIValue: handleLoadUI } = this.props;
    process.browser && handleLoadUI();
    process.browser && this.handleStateChange();
  }

  handleStateChange() {
    Router.events.on('routeChangeStart', async () => this.setState({ routerChange: true }));
    Router.events.on('routeChangeComplete', async () => this.setState({ routerChange: false }));
  }

  render() {
    const {
      children, ui
    } = this.props;
    const { routerChange } = this.state;
    return (
      <>
        <Layout className="main-container">
          <div
            className={ui?.theme === 'dark' ? 'container dark' : 'container'}
            id="primaryLayout"
          >
            <Row>
              <Col xs={24} md={24} className="primary-content">
                <Layout.Content
                  className="content"
                  style={{ position: 'relative' }}
                >
                  {routerChange && <Loader />}
                  {children}
                </Layout.Content>
                <BackTop className="backTop" />
              </Col>
            </Row>
          </div>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current }
});
const mapDispatchToProps = { loadUIValue };

export default connect(mapStateToProps, mapDispatchToProps)(MobileLayout);
