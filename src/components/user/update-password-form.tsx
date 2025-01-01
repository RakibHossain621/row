/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import {
  Form, Button, Input, Row, Col
} from 'antd';
import Link from 'next/link';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

interface IProps {
  onFinish: Function;
  updating: boolean;
}

export const UpdatePaswordForm = ({ onFinish, updating = false }: IProps) => (
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish.bind(this)}
    scrollToFirstError
    className="account-form"
  >
    <Row justify="end">
      <Col lg={12} md={12} xs={24} style={{ height: 'fit-content' }}>
        <Form.Item
          label="Current Password"
          name="currentPassword"
          hasFeedback
          rules={[
            {
              pattern: new RegExp(
                /^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/g
              ),
              message: 'Password must have minimum 8 characters, at least 1 number, 1 uppercase letter, 1 lowercase letter & 1 special character'
            }
          ]}
        >
          <Input.Password
            placeholder="Current Password"
          />
        </Form.Item>
        <div>
          <Link
            href={{
              pathname: '/auth/forgot-password'
            }}
          >
            <a href="/auth/forgot-password">Forgot password?</a>
          </Link>
        </div>
      </Col>
      <Col lg={12} md={12} xs={24}>
        <Form.Item
          label="New Password"
          name="password"
          hasFeedback
          rules={[
            {
              pattern: new RegExp(/^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/g),
              message: 'Password must have minimum 8 characters, at least 1 number, 1 uppercase letter, 1 lowercase letter & 1 special character'
            }
          ]}
        >
          <Input.Password placeholder="New password" />
        </Form.Item>
      </Col>
      <Col lg={12} md={12} xs={24}>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('Passwords do not match together!');
              }
            })
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item wrapperCol={{ ...layout.wrapperCol }} className="text-center">
      <Button
        className="primary"
        type="primary"
        htmlType="submit"
        loading={updating}
        disabled={updating}
      >
        Update Password
      </Button>
    </Form.Item>
  </Form>

);
