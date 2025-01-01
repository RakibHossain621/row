import { Component } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { Router } from 'next/router';
import { IUIConfig } from 'src/interfaces/ui-config';
import { loadUIValue } from '@redux/ui/actions';
import { IModals } from '@interfaces/modals';
import { updateModals } from '@redux/modals/actions';
import CollectData from '@components/common/collectData';
import Sidebar from './sidebar';
import { LayoutModals } from './modals-layout';
import './primary-layout.less'

const Header = dynamic(() => import('@components/common/layout/header'));
const Loader = dynamic(() => import('@components/common/base/loader'));

interface DefaultProps {
  loadUIValue: Function;
  children: any;
  ui: IUIConfig;
  loggedIn: boolean;
  isLoading: boolean;
  modals: IModals,
  updateModals: Function
}

class PrimaryLayout extends Component<DefaultProps> {
  state = {
    routerChange: false,
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
    const { children, ui, modals, updateModals, isLoading } = this.props;
    const { routerChange } = this.state;

    return (
      <CollectData>
        <>
          <Header />
          <div className="min-h-[calc(100vh-81px)] px-3 md:px-6 pt-6 mx-auto xxl:px-0 bg-white max-w-screen-xxl" id="primaryLayout">
            <div className="flex gap-5">
              <aside  className={`flex-shrink-0 sidebar-wrapper ${
                    ui.sidebarCollapse ? "sidebar-collapsed" : ""
                  }`}>
             
                {/* <SidebarLayout /> */}

                <Sidebar />
              </aside>
              <main className={`w-full`}>
                {(routerChange || isLoading) && <Loader />}
                {children}
              </main>
            </div>
          </div>
          <LayoutModals modals={modals} updateModals={updateModals} />
        </>
      </CollectData>
    );
  }
}

const mapStateToProps = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current },
  loggedIn: state.auth.loggedIn,
  isLoading: state.auth.isLoading,
  modals: { ...state.modals }
});

const mapDispatchToProps = { loadUIValue, updateModals };

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout);
