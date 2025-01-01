import Head from 'next/head';
import {
  FormInstance, message,
  DatePicker,
  Pagination
} from 'antd';
import { createRef, PureComponent } from 'react';
import {
  IPerformer,
  IUIConfig
} from '@interfaces/index';
import { connect } from 'react-redux';
import { earningService } from '@services/earning.service';
import { getResponseError } from '@lib/utils';
import { tokenTransctionService } from '@services/token-transaction.service';
import { payoutRequestService } from '@services/payout-request.service';
import { DiamondIcon, RubyIcon } from 'src/icons';
import { AppButton } from '@components/ui/shared/AppButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { updateModals } from '@redux/modals/actions';
import { EarningsType, TokenTransactionsType } from 'src/globalDtos';
import { formatLocaleDate } from '@lib/date';
import { userService } from '@services/user.service';
import { walletService } from '@services/wallet.service';
import { RubysPurchasedTable } from '@components/wallet/tables/rubys-purchased-table';
import { RubysSentTable } from '@components/wallet/tables/rubys-sent-table';
import { DiamondsReceivedTable } from '@components/wallet/tables/diamonds-received-table';
import { PayoutRequestsTable } from '@components/wallet/tables/payout-requests-table';
import { updateTabValue } from '@redux/ui/actions';

interface IProps {
  ui: IUIConfig;
  user: IPerformer;
  updateModals: Function;
  updateTabValue:Function;
}

class Wallet extends PureComponent<IProps> {
  static authenticate = true;

  formRef = createRef() as any;

  state = {
    loading: false,
    earning: {} as EarningsType,
    giftEarning: [],
    tokenTransctions: [] as TokenTransactionsType[],
    totalTokenTransactions: 0,
    rubiesSent: [],
    rubyBalance: 0,
    diamondBalance: 0,
    userIsPerformer: false,
    payoutHistory: []
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.getEarningData();
    this.getInfoUser();
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('diamond')) {
      this.setState({ selectedTabIndex: 1 });
    }
  }

  async getEarningData() {
    try {
      const earning = await walletService.search();
      this.setState({
        earning: earning.data,
        loading: false
      });
    } catch (error) {
      message.error(getResponseError(await error));
      this.setState({ loading: false });
    }
  }

  async getInfoUser() {
    this.setState({ loading: true })
    const getUserLogged = await userService.me()

    this.setState({ 
      rubyBalance: getUserLogged.data.rubyBalance,
      diamondBalance: getUserLogged.data.balance,
      userIsPerformer: getUserLogged.data.isPerformer,
      loading: false
    })
  }

  render() {
    const { ui, user, updateModals, updateTabValue } = this.props;
    const {
      rubyBalance,
      diamondBalance,
      earning, 
    } = this.state;

    return (
      <>
        <Head>
          <title>
            {ui?.siteName}
            {' '}
            | Wallet
          </title>
        </Head>

        <section className='pb-8'>
          <div>
            <Tabs selectedIndex={this.props.ui.selectedTabIndex} onSelect={(index) => this.props.updateTabValue(index)}>
              <div className='flex flex-wrap items-center justify-center gap-6 mb-6 xl:justify-end'>
                <TabList className='flex h-10 gap-1 px-[6px] py-1 bg-base-400 rounded-[20px] w-full md:flex-auto md:max-w-md'>
                  <Tab className='inline-flex items-center justify-center flex-grow gap-2 px-6 text-sm font-medium cursor-pointer rounded-3xl' selectedClassName='bg-white text-black' >
                    Rubys
                  </Tab>
                  <Tab className='inline-flex items-center justify-center flex-grow gap-2 px-6 text-sm font-medium cursor-pointer rounded-3xl' selectedClassName='bg-white text-black'>
                    Diamonds
                  </Tab>
                </TabList>
              </div>

              <TabPanel>
                <div className='px-6 py-8 mb-16 border md:mx-auto md:max-w-md rounded-xl border-base-400 xl:mx-0'>
                  <h2 className='pb-2 mb-6 text-xl text-black border-b border-base-400'>Ruby Balance</h2>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-6">
                    <div className='inline-flex items-center self-center sm:self-auto'>
                      <RubyIcon className='w-10 h-10' />

                      <span className='text-3xl text-black'>
                        {rubyBalance}
                      </span>
                    </div>

                    <AppButton onClick={() => updateModals({ isBuyRubiesModalOpen: true })}>Buy Rubys</AppButton>
                  </div>
                </div>

                <RubysPurchasedTable />
                <RubysSentTable />
              </TabPanel>

              <TabPanel>
                <div className='px-6 py-8 mb-16 border md:mx-auto md:max-w-md rounded-xl border-base-400 xl:mx-0'>
                  <div className='flex justify-between mb-6 border-b border-base-400 '>
                    <h2 className='pb-2 text-xl text-black '>Diamond Balance</h2>

                    <h3 className='pb-2 text-xl text-black'>${Number(earning?.cashValue).toFixed(2)}</h3>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-6">
                    <div className='inline-flex items-center self-center sm:self-auto'>
                      <DiamondIcon className='w-10 h-10' />

                      <span className='text-3xl text-black'>
                        {diamondBalance}
                      </span>
                    </div>

                    {user.roles?.includes('role-host-verified') 
                    ? 
                      <AppButton onClick={() => updateModals({ isPayoutRequestModalOpen: true })}>Request a payout</AppButton>
                    : 
                      <AppButton onClick={() => updateModals({ isBuyRubiesWithDiamondsModalOpen: true })}>Buy Rubys w/diamonds</AppButton>
                    }
                  </div>
                </div>

                
                <DiamondsReceivedTable />
                {user.roles?.includes('role-host-verified') 
                  ? <PayoutRequestsTable />
                  : null
                } 
              </TabPanel>
            </Tabs>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ui: { ...state.ui },
  user: { ...state.user.current },
  settings: { ...state.settings }
});

const mapDispatchToProps = {
  updateModals,
  updateTabValue
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
