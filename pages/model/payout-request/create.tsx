import React from 'react';
import Head from 'next/head';
// import PageHeading from '@components/common/page-heading';
import PayoutRequestForm from '@components/payout-request/form';
import { Col, Row, message } from 'antd';
import { connect } from 'react-redux';
import { payoutRequestService } from 'src/services';
import Router from 'next/router';
import { IUIConfig, IPerformer } from 'src/interfaces/index';
import { walletService } from '@services/wallet.service';
import { getResponseError } from '@lib/utils';
import { ROLE_PERMISSIONS } from 'src/constants';
import PayoutRequestList from '@components/payout-request/table';

interface Props {
  ui: IUIConfig;
  user: IPerformer;
}

interface States {
  submiting: boolean;
  loading: boolean;
  totalCashValue: number;
  statsPayout: {
    totalEarnedTokens: number;
    previousPaidOutTokens: number;
    remainingUnpaidTokens: number;
  }
  items: any;
  pagination: {
    pageSize: number;
    current: number;
    total: number;
  };
  sort: string;
  sortBy: string;
  filter: any;
}

class PayoutRequestCreatePage extends React.PureComponent<Props, States> {
  static authenticate = true;

  static onlyPerformer = true;

  constructor(props: Props) {
    super(props);
    this.state = {
      items: [],
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0
      } as any,
      sort: 'desc',
      sortBy: 'updatedAt',
      filter: {},
      submiting: false,
      loading: false,
      totalCashValue: 0,
      statsPayout: {
        totalEarnedTokens: 0,
        previousPaidOutTokens: 0,
        remainingUnpaidTokens: 0
      }
    };
  }

  async componentDidMount() {
    try {
      const { user } = this.props;
      if (!user.verifiedAccount || user?.analytics?.diamondsEarned < 10000) {
        message.error("You don't have permission or not enough 10000 diamond Lifetime earning to request payout", 10);
        Router.push('/wallet');
      } else {
        this.calculateStatsPayout();
        this.getWallet();
        this.getData();
      }
    } catch (error) {
      message.error(
        getResponseError(await error) || 'An error occured. Please try again.'
      );
    }
  }

  async handleTabChange(data) {
    const { pagination } = this.state;
    await this.setState({
      pagination: { ...pagination, current: data.current }
    });
    this.getData();
  }

  getWallet = async () => {
    try {
      const { user } = this.props;
      this.setState({ loading: true });
      const resp = await walletService.findById(user._id);
      if (resp?.data) {
        this.setState({ totalCashValue: resp.data.cashValue, loading: false });
      }
    } catch (error) {
      message.error(getResponseError(await error));
      this.setState({ loading: false });
    }
  };

  async getData() {
    try {
      const {
        filter, sort, sortBy, pagination
      } = this.state;
      await this.setState({ loading: true });
      const resp = await payoutRequestService.search({
        ...filter,
        sort,
        sortBy,
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize
      });
      await this.setState({
        loading: false,
        items: resp.data.data,
        pagination: { ...pagination, total: resp.data.total }
      });
    } catch (error) {
      message.error(
        getResponseError(await error) || 'An error occured. Please try again.'
      );
      this.setState({ loading: false });
    }
  }

  calculateStatsPayout = async () => {
    const resp = await payoutRequestService.calculate();
    resp?.data && this.setState({ statsPayout: resp.data });
  };

  async submit(data) {
    const { user } = this.props;
    if (data.requestTokens < 100) {
      message.error('Withdrawal amounts of less than 100.00$');
      return;
    }
    const diamondRequestTokens = data.requestTokens * 100;

    if (diamondRequestTokens > user.balance) {
      message.error('Requested amount must be less than or equal USD value of your Diamonds available');
      return;
    }
    try {
      await this.setState({ submiting: true });
      const body = { ...data, requestTokens: diamondRequestTokens, source: 'performer' };
      await payoutRequestService.create(body);
      message.success('Your payout request was sent!');
      Router.push('/model/payout-request');
    } catch (e) {
      const error = await Promise.resolve(e);
      Router.push('/wallet');
      message.error(error?.message || 'Error occured, please try again later');
      this.setState({ submiting: false });
    }
  }

  render() {
    const {
      submiting, statsPayout, totalCashValue, loading, pagination, items
    } = this.state;
    const { ui, user } = this.props;
    return (
      <>
        <Head>
          <title>{`${ui?.siteName} | New Payout Request`}</title>
        </Head>
        <div className="main-container">
          {/* <PageHeading title="New Payout Request" icon={<BankOutlined />} /> */}
          <div className="title-payout" style={{ textAlign: 'center' }}>
            <h2 style={{ fontWeight: 'bold', padding: '10px', color: '#000' }}>
              <img src="/static/bank.png" alt="" height={25} width={25} />
              {' '}
              New Payout Request
            </h2>
          </div>
          <Row>
            <Col span={16}>
              <PayoutRequestForm
                payout={{
                  requestNote: '',
                  requestTokens: 1,
                  status: 'pending'
                }}
                statsPayout={statsPayout}
                submit={this.submit.bind(this)}
                submiting={submiting || loading}
                totalCashValue={totalCashValue}
                user={user}
                // pendingAmount={}
              />
            </Col>
            {!user.roles.includes(ROLE_PERMISSIONS.ROLE_MANAGED_ACCOUNT) && (
              <Col span={8}>
                <div className="pro-tip" style={{ padding: '20px', border: '1px solid #000', borderRadius: '5px' }}>
                  <h3>Pro Tip - Grow Faster</h3>
                  <p>
                    Always use 10% of your withdrawal to promote yourself with
                    {' '}
                    <a style={{ textDecoration: 'underline' }} href="/help/models/cross-promotion" target="_blank" rel="noreferrer">Cross Promotion</a>
                    .
                  </p>
                  <div className="text-center">
                    <a href="/diamond-to-ruby">
                      Buy
                      {' '}
                      <img src="/static/gem.png" alt="" height={37} width={37} />
                      {' '}
                      with
                      {' '}
                      <img src="/static/diamond.png" alt="" height={30} width={37} />
                    </a>
                  </div>
                </div>
              </Col>
            )}
          </Row>
          <div className="table-responsive">
            <span>Processing:</span>
            <PayoutRequestList
              payouts={items}
              searching={loading}
              total={pagination.total}
              onChange={this.handleTabChange.bind(this)}
              pageSize={pagination.pageSize}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ui: state.ui,
  user: state.user.current,
  settings: state.settings
});

export default connect(mapStateToProps)(PayoutRequestCreatePage);
