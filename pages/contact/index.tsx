/* eslint-disable react/no-did-update-set-state */
import { PureComponent, createRef } from 'react';
import {
  Form, Button, Layout, Input, message, Col, Row, Avatar
} from 'antd';
import Head from 'next/head';
import { performerService } from '@services/performer.service';
import { setActiveConversation, sendMessage } from '@redux/message/actions';
import { connect } from 'react-redux';
import { IPerformer, IUIConfig } from 'src/interfaces';
import '../auth/index.less';
import Router from 'next/router';
import { settingService } from '@services/setting.service';
import Link from 'next/link';

const { TextArea } = Input;

interface IProps {
  ui: IUIConfig;
  currentUser: IPerformer;
  sendMessage: Function;
  setActiveConversation: Function;
  conversation: any;
  sendMessageStatus:any
}

class ContactPage extends PureComponent<IProps> {
  static authenticate = true;

  static noredirect = true;

  _intervalCountdown: any;

  formRef: any;

  state = {
    submiting: false,
    loading: false,
    countTime: 60,
    supportAccount: {} as IPerformer
  }

  componentDidMount() {
    this.getSupportInfo();
    if (!this.formRef) this.formRef = createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendMessageStatus } = this.props;
    if (prevProps?.sendMessageStatus?.success !== sendMessageStatus?.success && sendMessageStatus?.success) {
      message.success('Thank you for contact us, we will reply within 48hrs.');
      this.handleCountdown();
      Router.push('/messages');
    }
    if (prevState.countTime === 0) {
      this._intervalCountdown && clearInterval(this._intervalCountdown);
      this.setState({ countTime: 60 });
    }
  }

  componentWillUnmount() {
    this._intervalCountdown && clearInterval(this._intervalCountdown);
  }

  handleCountdown = async () => {
    const { countTime } = this.state;
    if (countTime === 0) {
      clearInterval(this._intervalCountdown);
      this.setState({ countTime: 60 });
      return;
    }
    this.setState({ countTime: countTime - 1 });
    this._intervalCountdown = setInterval(this.coundown.bind(this), 1000);
  }

  async onFinish(values) {
    const { sendMessage: handleSendMessage, currentUser } = this.props;
    const { conversation } = this.props;
    try {
      if (!currentUser?._id) {
        message.error('Please log in or register!', 5);
        return;
      }
      await this.setState({ submiting: true });
      await settingService.contact({ ...values, name: currentUser.name, email: currentUser.email });
      if (!values?.message) return;
      handleSendMessage({
        conversationId: conversation._id,
        data: { text: values.message }
      });
    } catch (e) {
      message.error('Error occured, please try again later');
    } finally {
      this.formRef.current.resetFields();
      this.setState({ submiting: false });
    }
  }

  getSupportInfo = async () => {
    try {
      const {
        setActiveConversation: setActiveConversationHandler,
        currentUser
      } = this.props;
      if (!currentUser?._id) {
        message.error('Please log in or register!', 5);
        return;
      }
      this.setState({ loading: true });
      const resp = await performerService.findByEmail('caster@caster.com');
      if (resp.data) {
        this.setState({ supportAccount: resp.data, loading: false });
        const { supportAccount } = this.state;
        setActiveConversationHandler({
          source: 'performer',
          sourceId: supportAccount._id,
          recipientId: currentUser._id
        });
      }
    } catch (error) {
      message.error('Error occured, please try again');
      this.setState({ loading: false });
    }
  }

  coundown() {
    const { countTime } = this.state;
    this.setState({ countTime: countTime - 1 });
  }


  render() {
    if (!this.formRef) this.formRef = createRef();
    const { ui, currentUser } = this.props;
    const {
      submiting, countTime, supportAccount, loading
    } = this.state;
    return (
      <Layout>
        <Head>
          <title>
            {' '}
            {ui?.siteName}
            {' '}
            | Contact Us
          </title>
        </Head>
        <div className="main-container">
          <div className="login-box">
            <Row>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                className="login-content right"
              >
                <p className="text-center">
                  <h2 className="contact-title">Contact Us</h2>
                </p>
                <h5
                  className="text-center contact-subtitle"
                >
                  Have a question?
                  <br />
                  Want to submit feedback?
                  <br />
                  Need Support?
                </h5>
                <Form
                  layout="vertical"
                  name="contact-from"
                  ref={this.formRef}
                  onFinish={this.onFinish.bind(this)}
                  scrollToFirstError
                >
                  <div className="contact-user">
                    <p>From : </p>
                    {' '}
                    <Link
                      href={{
                        pathname: '/model/profile',
                        query: { username: currentUser?.username || currentUser?._id }
                      }}
                    >
                      <a aria-hidden href="/model/profile">
                        <Avatar src={currentUser?.avatar || '/static/no-avatar.png'} size={28} />
                      </a>
                    </Link>
                    {' '}
                    {currentUser?.name || currentUser?.username || 'N/A'}
                  </div>
                  {!loading && (
                  <div className="contact-user">
                    <p>To : </p>
                    {' '}
                    <Link
                      href={{
                        pathname: '/model/profile',
                        query: { username: supportAccount?.username || supportAccount?._id }
                      }}
                    >
                      <a aria-hidden href="/model/profile">
                        <Avatar src={supportAccount?.avatar || '/static/no-avatar.png'} size={28} />
                      </a>
                    </Link>
                    {supportAccount?.name || supportAccount?.username || 'Caster Support'}
                  </div>
                  ) }
                  <Form.Item
                    name="message"
                    rules={[
                      { required: true, message: 'What can we help you?' },
                      {
                        min: 20,
                        message: 'Please input at least 20 characters.'
                      }
                    ]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Message"
                    />
                  </Form.Item>
                  <div className="text-center">
                    <Button
                      size="large"
                      className="primary"
                      type="primary"
                      htmlType="submit"
                      loading={submiting || countTime < 60}
                      disabled={submiting || countTime < 60}
                      style={{ fontWeight: 600, width: '100%' }}
                    >
                      {countTime < 60 ? 'RESEND IN' : 'SEND'}
                      {' '}
                      {countTime < 60 && `${countTime}s`}
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStates = (state: any) => {
  const { activeConversation } = state.conversation;
  return {
    ui: state.ui,
    conversation: activeConversation,
    currentUser: state.user.current,
    sendMessageStatus: state.message.sendMessage
  };
};
const mapDispatch = { sendMessage, setActiveConversation };

export default connect(mapStates, mapDispatch)(ContactPage);
