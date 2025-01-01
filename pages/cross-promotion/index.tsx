import { PureComponent } from 'react';
import Head from 'next/head';
import {
  Button, Checkbox, Layout, Spin, message
} from 'antd';
import { connect } from 'react-redux';
import { IPerformer } from '@interfaces/performer';
import { performerService } from '@services/performer.service';
import { crossPromotionService } from '@services/cross-promotion';
import { tokenTransctionService } from '@services/token-transaction.service';
import { IBracket, ISettings } from 'src/interfaces';
import { redirect404 } from '@lib/utils';
import moment from 'moment-timezone';
import { ROLE_PERMISSIONS } from 'src/constants';
import './index.less';
import PerformerGridCard from '@components/performer/grid-card';
import Router from 'next/router';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

interface IProps {
  ui: any;
  performer :IPerformer;
  currentUser:IPerformer;
  timeZone:any;
  settings : ISettings
}

class CrossPromotion extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  _intervalCountdown: any;

  constructor(props: IProps) {
    super(props);
  }

  state = {
    bracketActive: null as IBracket,
    isConfirmed: false,
    loading: false,
    time: 0,
    listBooking: []
  };

  static async getInitialProps({ ctx }: any) {
    const { query } = ctx;
    try {
      const timeZone = moment.tz.guess();
      if (query.id) {
        const [performer] = await Promise.all([
          performerService.findOne(query.id, {
            Authorization: ctx.token || ''
          })
        ]);
        return { performer: performer?.data, timeZone };
      }
      return null;
    } catch (e) {
      return redirect404(ctx);
    }
  }

  async componentDidMount() {
    const { performer } = this.props;
    if (!performer?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_CROSSPROMOTE)) {
      message.error('Model not eligible to receive a cross promotion');
      Router.back();
    }
    this.getBrackets();
    this.getListBooking();
  }

  async componentWillUnmount() {
    this._intervalCountdown && clearInterval(this._intervalCountdown);
  }

  async getBrackets() {
    try {
      const { performer } = this.props;
      this.setState({ loading: true });
      const resp = await crossPromotionService.getBrackets(performer._id);
      if (resp?.data) {
        this.setState({ bracketActive: resp.data, loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
      message.error(error.message);
    }
  }

  async getListBooking() {
    try {
      const { performer } = this.props;
      this.setState({ loading: true });
      const resp = await crossPromotionService.getListBookingPerformer(performer._id);
      if (resp?.data) {
        await this.setState({ listBooking: resp.data, loading: false });
        this.setCountDown();
      }
    } catch (error) {
      this.setState({ loading: false });
      message.error(error.message);
    }
  }

  async setCountDown() {
    try {
      const { listBooking } = this.state;
      const eventTime = listBooking.length ? moment(listBooking[0].expiredAt) : moment().add(1, 'day').startOf('day');
      // based on time set in user's computer time / OS
      const currentTime = moment();
      // get duration between two times
      let duration = Number(moment.duration(eventTime.diff(currentTime)).valueOf());
      this._intervalCountdown = setInterval(() => {
        // get updated duration
        duration -= 1000;
        this.setState({ time: duration });
      }, 1000);
    } catch (error) {
      message.error(error.message);
    }
  }

  async boostPromotion() {
    try {
      const { bracketActive } = this.state;
      const { timeZone } = this.props;
      this.setState({ loading: true });
      const resp = await tokenTransctionService.boostPromotion(bracketActive._id, { timeZone });
      const bookingBracket = resp.data;
      message.success('Boost promotion successfully');
      Router.push({ pathname: '/cross-promotion/success', query: { id: bookingBracket._id } }, `/cross-promotion/success?id=${bookingBracket._id}`);
    } catch (e) {
      const error = await e;
      error.message === 'You have an insufficient ruby balance. Please top up.'
        ? message.error(
          {
            key: 'insufficient-balance',
            content:
          <span>
            You have an insufficient Ruby balance. Click
            {' '}
            <RouterContext.Provider value={Router}>
              <Link prefetch={false} href="ruby-package">
                <a aria-hidden>HERE</a>
              </Link>
            </RouterContext.Provider>
            {' '}
            to add more.
          </span>,
            onClick: (() => message.destroy('insufficient-balance'))
          }
        )
        : message.error(error.message || 'Error occured, please try again later');
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      ui, performer, currentUser, settings
    } = this.props;
    const {
      bracketActive, isConfirmed, time, loading
    } = this.state;
    const { crossPromotionDescription } = settings;

    return (
      <Layout>
        <Head>
          <title>
            {' '}
            {ui?.siteName}
            {' '}
            | Cross Promotion
          </title>
        </Head>
        <div className="main-container">
          <div className="text-center">
            <h2 className="contact-title">{crossPromotionDescription.title}</h2>
            <h4 className="contact-title">{crossPromotionDescription.introduce}</h4>
          </div>
          <a href="/page/mo-cross-promote">
            <QuestionCircleOutlined />
          </a>
          <div className="avatar-promotion">
            <PerformerGridCard
              modelNumber={0}
              performer={performer}
              pathname="/model/profile"
              as={`/${performer?.username || performer?._id}`}
              showButtonFollow={false}
              getPerformerList={() => { }}
              showModelNumber
            />
          </div>
          {!loading && (
          <>
            { bracketActive
              ? (
                <div className="wrapper-cross-promotion">
                  <div className="price-box">
                    <p style={{ fontSize: '30px' }}>
                      {bracketActive.period}
                      {' '}
                      {bracketActive.period > 1 ? 'Days' : 'Day'}
                    </p>
                    <div className="ruby-amount">
                      {bracketActive && (
                      <p>
                        {(bracketActive.rubyFeeRealTime > bracketActive.rubyFee) ? Math.ceil(bracketActive.rubyFeeRealTime) : Math.ceil(bracketActive.rubyFee) }
                        <img src="./static/gem.png" width="20px" alt="ruby" />
                      </p>
                      ) }
                    </div>
                  </div>
                  <div className="text-center">
                    <p>{crossPromotionDescription.descriptions}</p>
                    <p>
                      {moment.duration(time).asDays() > 1 && (
                      <span>
                        {' '}
                        {Math.floor(moment.duration(time).asDays())}
                        {' '}
                        {moment.duration(time).asDays() > 1 ? 'Days' : 'Day' }
                        {' '}
                      </span>
                      ) }
                      {` ${moment(time).utc().format('HH:mm:ss')} `}
                    </p>
                  </div>
                  {bracketActive && (
                  <div className="footer-cross-promotion">
                    <Button disabled={!isConfirmed || currentUser._id === performer._id} onClick={() => this.boostPromotion()} className="primary">Submit Order</Button>
                    <Checkbox onClick={() => this.setState({ isConfirmed: !isConfirmed })}>Confirmed</Checkbox>
                  </div>
                  )}
                </div>
              )
              : (
                <div className="text-center">
                  <p>
                    Performer not meet the conditions for boost cross promotion
                  </p>
                </div>
              )}
          </>
          ) }
        </div>
        {loading && (
        <div className="text-center">
          <Spin />
        </div>
        )}
      </Layout>
    );
  }
}
const mapProps = (state: any) => ({
  ui: state.ui,
  currentUser: { ...state.user.current },
  settings: { ...state.settings }
});

export default connect(mapProps)(CrossPromotion);
