/* eslint-disable react/require-default-props */
import {
  Form,
  Button,
  Space,
  Statistic,
  Tag,
  InputNumber
} from 'antd';
import { PAYOUT_STATUS, PayoutRequestInterface } from 'src/interfaces';

interface Props {
  submit: Function;
  submiting: boolean;
  payout: Partial<PayoutRequestInterface>;
  statsPayout: {
    totalEarnedTokens: number;
    previousPaidOutTokens: number;
    remainingUnpaidTokens: number;
  };
  totalCashValue?: number;
  user?: any;
}

const PayoutRequestForm = ({
  payout, submit, submiting, statsPayout, user
}: Props) => {
  const [form] = Form.useForm();
  const {
    requestNote, requestTokens, status, paymentAccountType
  } = payout;

  return (
    <Form
      form={form}
      layout="vertical"
      className="payout-request-form"
      name="payoutRequestForm"
      onFinish={(data) => submit(data)}
      initialValues={{
        requestNote: requestNote || '',
        requestTokens: requestTokens || statsPayout?.remainingUnpaidTokens || 0,
        paymentAccountType: paymentAccountType || 'paypal'
      }}
      scrollToFirstError
    >
      <div>
        <Space size="large">
          <Statistic
            title="USD value of Diamonds available"
            value={(statsPayout?.remainingUnpaidTokens * 0.01).toFixed(2) || 0}
            precision={2}
            prefix={<img src="/static/dollar.png" width="30px" alt="coinn" />}
          />
          {/* <Statistic
            title="Paid out diamonds"
            value={statsPayout?.previousPaidOutTokens || 0}
            precision={2}
            prefix={<img src="/static/diamond.png" width="20px" alt="coinn" />}
          /> */}
        </Space>
      </div>
      <Form.Item label="Requested withdrawal amount" name="requestTokens">
        <InputNumber precision={0} style={{ width: '100%' }} disabled={payout && payout.status === 'done'} min={1} />
      </Form.Item>
      {/* <p className="error-color">{`Conversion rate of tokens to dollars: $${(tokenConversionRate * tokens).toFixed(2)}`}</p> */}
      {/* <Form.Item label="Note to Admin" name="requestNote">
        <Input.TextArea disabled={payout && payout.status === 'done'} placeholder="Text something to admin here" rows={3} />
      </Form.Item> */}
      {/* {payout?.adminNote && (
      <Form.Item label="Admin noted">
        <Alert type="info" message={payout?.adminNote} />
      </Form.Item>
      )} */}
      {payout._id && (
        <Form.Item label="Status">
          <Tag color="orange" style={{ textTransform: 'capitalize' }}>{status}</Tag>
        </Form.Item>
      )}
      {/* <Form.Item label="Select payout method" name="paymentAccountType">
        <Select>
          <Select.Option value="stripe" key="stripe">
            <img src="/static/stripe-icon.jpeg" width="30px" alt="stripe" />
            {' '}
            Stripe
          </Select.Option>
          <Select.Option value="paypal" key="paypal">
            <img src="/static/paypal-ico.png" width="30px" alt="paypal" />
            {' '}
            Paypal
          </Select.Option>
        </Select>
      </Form.Item> */}
      <div className="paypal-setting" style={{ display: 'grid' }}>
        <img src="/static/paypal-ico.png" alt="paypal-icon" height="30px" />
        {user?.paypalSetting?.value?.email ? (
          <span style={{ fontSize: '14px', padding: '15px' }}>
            Receiving Paypal Account:
            {' '}
            <a>{user?.paypalSetting?.value?.email}</a>
          </span>
        ) : (
          <span style={{ fontSize: '14px', padding: '15px' }}>
            You don&apos;t have paypal account, please click
            {' '}
            <a href="/wallet">here</a>
            {' '}
            and type your paypal account
          </span>
        )}
      </div>
      {status === PAYOUT_STATUS.PENDING && (
      <Form.Item>
        <Button
          className="primary"
          loading={submiting}
          htmlType="submit"
          disabled={['done', 'approved'].includes(status) || submiting}
          style={{ margin: '0 5px' }}
        >
          {requestTokens !== 1 ? 'Update pending request' : 'Submit' }
        </Button>
      </Form.Item>
      ) }
    </Form>
  );
};

PayoutRequestForm.defaultProps = {};

export default (PayoutRequestForm);
