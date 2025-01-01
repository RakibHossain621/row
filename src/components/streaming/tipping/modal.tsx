import React from 'react';
import { Modal, Alert } from 'antd';
import Form from './form';

interface TippingModalProps {
  visible: boolean;
  submiting: boolean;
  error: boolean;
  errorMessage: string;
  sendTip: Function;
  cancle: any;
}

const TippingModal = ({
  visible, sendTip, cancle, error, errorMessage, submiting
}: TippingModalProps) => {
  const [token, setToken] = React.useState(0);
  const onOK = () => {
    sendTip(token);
  };

  const onChange = (data: any) => {
    setToken(data.token);
  };

  return (
    <Modal visible={visible} title="Tip" onOk={onOK} onCancel={cancle} confirmLoading={submiting}>
      {error && <Alert type="error" message={errorMessage} showIcon />}
      <Form onChange={onChange} />
    </Modal>
  );
};

export default TippingModal;
