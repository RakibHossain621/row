import { PureComponent } from 'react';
import Head from 'next/head';
import {
  Button,
  Layout, message
} from 'antd';
import { connect } from 'react-redux';
import { IPerformer } from '@interfaces/performer';
import { redirect404 } from '@lib/utils';
import './index.less';
import PerformerGridCard from '@components/performer/grid-card';
import { crossPromotionService } from '@services/cross-promotion';
import moment from 'moment-timezone';
import { IPromotionBooking } from '@interfaces/cross-promotion';
import { performerService } from '@services/performer.service';
import { ShakeHandIcon } from 'src/icons';
import Link from 'next/link';

interface IProps {
  ui: any;
  myBooking :IPromotionBooking;
}

class CrossPromotionSuccess extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  _intervalCountdown: any;

  constructor(props: IProps) {
    super(props);
  }

  state ={
    time: 0,
    performer: {} as IPerformer
  }

  static async getInitialProps({ ctx }: any) {
    const { query } = ctx;
    try {
      if (query.id) {
        const [myBooking] = await Promise.all([
          crossPromotionService.getMyBooking(query.id)
        ]);
        return { myBooking: myBooking?.data };
      }
      return null;
    } catch (e) {
      return redirect404(ctx);
    }
  }

  async componentDidMount() {
    this.getPerformer();
    this.setCountDown();
  }

  async componentWillUnmount() {
    this._intervalCountdown && clearInterval(this._intervalCountdown);
  }

  async getPerformer() {
    try {
      const { myBooking } = this.props;
      const resp = await performerService.findOne(myBooking[0].performerId, {});
      if (resp?.data) {
        await this.setState({ performer: resp.data });
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  // async getMyBooking() {
  //   try {
  //     const { currentUser } = this.props;
  //     const resp = await crossPromotionService.getMyBooking(currentUser._id);
  //     if (resp?.data) {
  //       await this.setState({ myBooking: resp.data });
  //     }
  //   } catch (error) {
  //     message.error(error.message);
  //   }
  // }

  async setCountDown() {
    try {
      const { myBooking } = this.props;
      const eventTime = moment(myBooking[0].expiredAt);
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

  render() {
    const { ui } = this.props;
    const { time, performer } = this.state;
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
            <h1 className="contact-title">Cross Promotion Confirmed</h1>
            <h3 className="contact-title">Your campaign will start in :</h3>
            <p>
              {moment.duration(time).asDays() > 1 && (
              <span>
                {' '}
                {Math.floor(moment.duration(time).asDays())}
                {' '}
                Days
                {' '}
              </span>
              ) }
              {` ${moment(time).utc().format('HH:mm:ss')} `}
            </p>
          </div>
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
          <div className="text-center">
            <p>
              You can also prepurchase the next period here
            </p>
            <Link
              href={{
                pathname: '/cross-promotion',
                query: { id: performer?._id }
              }}
              as={`/cross-promotion?id=${performer?._id}`}
            >
              <Button className="button">
                {' '}
                <ShakeHandIcon />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapProps = (state: any) => ({
  ui: state.ui,
  currentUser: { ...state.user.current }

});

export default connect(mapProps)(CrossPromotionSuccess);
