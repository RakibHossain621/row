import { PureComponent } from 'react';
import { message } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import PageHeading from '@components/common/page-heading';
import Router from 'next/router';
import Head from 'next/head';
import { connect } from 'react-redux';
import PayoutRequestList from 'src/components/payout-request/table';
import { getResponseError } from '@lib/utils';
import { payoutRequestService } from '@services/index';
import { IPerformer } from '@interfaces/performer';

interface IProps {
  user: IPerformer
}

class PerformerPayoutRequestPage extends PureComponent<IProps> {
  static onlyPerformer = true;

  state = {
    items: [],
    loading: false,
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0
    } as any,
    sort: 'desc',
    sortBy: 'updatedAt',
    filter: {}
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      this.getData();
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

  async handleRequestPayout() {
    const { user } = this.props;
    if (user?.balance < 10000) {
      return Router.push('/model/payout-request/qualified');
    }
    return Router.push('/model/payout-request/create');
  }

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

  render() {
    const {
      pagination, items, loading
    } = this.state;

    return (
      <>
        <Head>
          <title>Payout Requests</title>
        </Head>
        <div className="main-container">
          <PageHeading title="Payout Requests" icon={<NotificationOutlined />} />
          {/* <div style={{ margin: '10px 0' }}>
            <Button
              type="primary"
              onClick={this.handleRequestPayout.bind(this)}
            >
              Request a Payout
            </Button>
          </div> */}
          <div className="table-responsive">
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
  user: { ...state.user.current }

});
export default connect(mapStateToProps)(PerformerPayoutRequestPage);
