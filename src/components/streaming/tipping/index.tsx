/* eslint-disable react/require-default-props */
import React from 'react';
import { Button } from 'antd';
import { paymentTokenService } from 'src/services';
import { getResponseError } from '@lib/utils';
import Modal from './modal';

interface TippingProps {
  performerId: string;
  conversationId?: string;
}

interface TippingStates {
  visible: boolean;
  submiting: boolean;
  error: boolean;
  errorMessage: string;
}

class Tipping extends React.PureComponent<TippingProps, TippingStates> {
  constructor(props: TippingProps) {
    super(props);
    this.state = {
      visible: false,
      submiting: false,
      error: false,
      errorMessage: ''
    };
  }

  onCancle() {
    this.setState({ visible: false });
  }

  submit() {
    this.setState({ visible: true });
  }

  async sendTip(token) {
    try {
      const { performerId, conversationId } = this.props;
      this.setState({ submiting: true });
      await paymentTokenService.sendTip(performerId, { conversationId, token });
      this.setState({
        visible: false,
        error: false,
        errorMessage: ''
      });
    } catch (e) {
      const error = await Promise.resolve(e);
      this.setState({ error: true, errorMessage: getResponseError(error) });
    } finally {
      this.setState({ submiting: false });
    }
  }

  render() {
    const { performerId } = this.props;
    return (
      <>
        <Button
          type="primary"
          className="primary"
          onClick={this.submit.bind(this)}
          disabled={!performerId}
          block
        >
          Send Tip
        </Button>
        <Modal
          {...this.state}
          sendTip={this.sendTip.bind(this)}
          cancle={this.onCancle.bind(this)}
        />
      </>
    );
  }
}

export default Tipping;
