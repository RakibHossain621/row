import { PureComponent, createRef } from 'react';
import {
  Input, Button, Form, Popover, message, Col, Row
} from 'antd';
import { IUser } from '@interfaces/index';
import moment from 'moment';
import { validateMessages } from '@lib/message';
import { authService } from '@services/auth.service';
import {
  updatePerformer
} from 'src/redux/user/actions';
import { connect } from 'react-redux';
import Router from 'next/router';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

interface IProps {
  updating: boolean;
  user:IUser
  updatePerformer:Function
}

class VerifiedEmailForm extends PureComponent<IProps> {
  state = {
    countTime: 60

  }

  _intervalCountdown: any;

  formRef: any;

  handleCountdown = async () => {
    const { countTime } = this.state;
    this.setState({ countTime: countTime - 1 });
    this._intervalCountdown = setInterval(this.coundown.bind(this), 1000);
  }

  async onVerifyEmail() {
    const { user } = this.props;
    try {
      const resp = await authService.verifyEmail({
        sourceType: 'user',
        source: user
      });
      this.handleCountdown();
      resp.data && resp.data.message && message.success(resp.data.message);
    } catch (e) {
      const error = await e;
      message.success(error?.message || 'An error occured, please try again later');
    }
  }

  coundown() {
    const { countTime } = this.state;
    if (countTime === 0) {
      this.setState({ countTime: 60 });
      clearInterval(this._intervalCountdown);
      return null;
    }

    return this.setState({ countTime: countTime - 1 });
  }

  // async submit(data: any) {
  // const { user, updatePerformer: handleUpdatePerformer } = this.props;
  // handleUpdatePerformer({
  //   ...user,
  //   ...data,
  //   isUpdateProfile: true
  // });
  // }

  render() {
    const {
      user, updating
    } = this.props;
    const {
      countTime
    } = this.state;

    if (!this.formRef) this.formRef = createRef();
    return (
      <div className="confirm-subscription-form">
        <div className="info-body">
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
            initialValues={{
              ...user,
              dateOfBirth: (user.dateOfBirth && moment(user.dateOfBirth)) || ''
            }}
            scrollToFirstError
            className="account-form"
            ref={(ref) => { this.formRef = ref; }}
          >
            <Row>
              <Col lg={24} md={24} xs={24}>
                <Form.Item
                  name="email"
                  label={(
                    <span style={{ fontSize: 10 }}>
                      Email Address
                      {'  '}
                      {user.verifiedEmail ? (
                        <Popover title="Your email address is verified" content={null}>
                          <span className="success-color">Verified!</span>
                        </Popover>
                      ) : (
                        <Popover
                          content={null}
                        >
                          <span className="error-color">Not verified!</span>
                        </Popover>
                      )}
                    </span>
              )}
                  rules={[{ type: 'email' }, { required: true, message: 'Please input your email address!' }]}
                  hasFeedback
                  validateTrigger={['onChange', 'onBlur']}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
              <Button
                type="primary"
                className="primary"
                onClick={() => this.onVerifyEmail()}
                disabled={updating || countTime < 60}
                loading={updating || countTime < 60}
              >
                {countTime < 60 ? 'Resend' : 'Send'}
                {' '}
                verification email
                {' '}
                {countTime < 60 && `${countTime}s`}
              </Button>
              <Button
                type="primary"
                className="primary"
                onClick={() => Router.push('/model/account')}
              >
                Change email
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStates = (state: any) => ({
  updating: state.user.updating,
  user: state.user.current
});

const mapDispatch = {
  updatePerformer

};
export default connect(mapStates, mapDispatch)(VerifiedEmailForm);
