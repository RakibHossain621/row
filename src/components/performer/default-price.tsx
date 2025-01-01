import { IPerformer } from '@interfaces/performer';
import { performerService } from '@services/performer.service';
import {
  Button,
  Col, Form, InputNumber, Row,
  message
} from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
import { updatePerformer } from '@redux/user/actions';

interface IProps {
  performer: IPerformer;

  // Dispatch redux
  updatePerformer: Function;
}

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const DefaultPrice = ({ performer, updatePerformer: handleUpdatePerformer }: IProps) => {
  const [submitting, setSubmitting] = useState(false);

  const updateDefaultPrice = async ({ costPerMessage }) => {
    try {
      setSubmitting(true);
      await performerService.updateMe(performer._id, { ...performer, costPerMessage });
      handleUpdatePerformer({
        ...performer,
        costPerMessage
      });
      message.success('Changes saved');
      setSubmitting(false);
    } catch (err) {
      const error = await Promise.resolve(err);
      message.error(error.message);
      setSubmitting(false);
    }
  };

  return (
    <Form
      {...layout}
      initialValues={{
        costPerMessage: performer.costPerMessage
      }}
      onFinish={updateDefaultPrice}
      scrollToFirstError
    >
      <Row>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Form.Item name="costPerMessage" label="Cost Per Message">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item>
            <Button
              className="primary"
              type="primary"
              htmlType="submit"
              disabled={submitting}
              loading={submitting}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const mapStates = () => ({});

const mapDispatchToProps = {
  updatePerformer
};

export default connect(mapStates, mapDispatchToProps)(DefaultPrice);
