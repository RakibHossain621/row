import {
  useEffect, useState
} from 'react';
import {
  Layout, Image, Modal
} from 'antd';
import { connect } from 'react-redux';
import Head from 'next/head';
import { clearCart } from '@redux/cart/actions';
import { IUIConfig } from 'src/interfaces';
import { paymentService } from '@services/index';
import Router, { useRouter } from 'next/router';

interface IProps {
  ui: IUIConfig;
}

const PaymentCallBack = ({ ui }:IProps) => {
  const [modalVisible] = useState(true);

  const router = useRouter();
  const { token } = router.query as any;

  const paymentSuccess = async () => {
    try {
      if (!token) Router.push('/payment/cancel');
      const resp = await paymentService.paypalCallback(token);
      if (resp) {
        Router.push('/wallet');
      } else {
        Router.push('/payment/cancel');
      }
    } catch (error) {
      Router.push('/payment/cancel');
    }
  };

  useEffect(() => {
    paymentSuccess();
  }, []);

  return (
    <Layout>
      <Head>
        <title>
          {ui && ui.siteName}
          {' '}
          | Payment successful
        </title>
      </Head>
      <div className="main-container">
        <Modal title="Paypal Process" visible={modalVisible} closable={false} footer={null}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              alt="paypal-loading"
              src="/static/animated-paypal-loading.gif"
              fallback="/static/no-image.jpg"
            />
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

const mapStates = (state: any) => ({
  user: state.user.current,
  ui: state.ui
});

const mapDispatch = { clearCart };
export default connect(mapStates, mapDispatch)(PaymentCallBack);
