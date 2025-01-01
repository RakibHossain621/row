/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import {
  Form, Input, Button, message, Popover, Image
} from 'antd';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import { IPerformer } from 'src/interfaces';
import { Emotions } from '@components/messages/emotions';
import { FormInstance } from 'antd/lib/form';
import { ICreateComment } from 'src/interfaces/comment';
import Router from 'next/router';
import './comment.less';
import { AppButton } from '@components/ui/shared/AppButton';

interface IProps {
  objectId: string;
  onSubmit: Function;
  creator: IPerformer;
  objectType?: string;
  isReply?: boolean;
  siteName?: string;
}

export default class CommentForm extends PureComponent<IProps> {
  formRef: FormInstance;

  state = {
    text: ''
  };

  onFinish(values: ICreateComment) {
    const {
      onSubmit: handleComment,
      objectId,
      objectType,
      creator
    } = this.props;
    const data = values;

    if (!creator || !creator._id) {
      message.error('Please login!');
      return Router.push('/');
    }
    if (!data.content) {
      return message.error('Please add a comment!');
    }
    if (data.content.length > 150) {
      return message.error('Comment is over 150 characters');
    }
    data.objectId = objectId;
    data.objectType = objectType || 'video';
    this.formRef.resetFields(['content']);
    return handleComment(data);
  }

  async onEmojiClick(emoji) {
    const { creator } = this.props;
    if (!creator || !creator._id) return;
    const { text } = this.state;
    const instance = this.formRef as FormInstance;
    instance.setFieldsValue({
      content: `${instance.getFieldValue('content')} ${emoji} `
    });
    this.setState({ text: `${text} ${emoji} ` });
  }

  render() {
    const {
      creator, isReply, siteName, objectId
    } = this.props;
    return (
      <Form
        ref={(ref) => {
          this.formRef = ref;
        }}
        name="comment-form"
        onFinish={this.onFinish.bind(this)}
        initialValues={{
          content: ''
        }}
        style={{ width: '100%', margin: 'auto'}}
      >
        <div className="flex flex-col items-stretch">
          <div className="relative pb-4">
            <Form.Item className='m-0' name="content">
              <Input
              className='rounded-full p-2'
                onPressEnter={(e: any) => {
                  if (e.target.value.length < 2) return;
                  this.formRef.submit();
                }}
                disabled={!creator || !creator._id}
                maxLength={150}
                minLength={2}
                placeholder={
                  !isReply ? 'Add a comment here' : 'Add a reply here'
                }
              />
            </Form.Item>
            {/* <Popover
              key={objectId}
              className="absolute right-4 m-auto top-0 bottom-0 flex items-center justify-center z-10"
              title={null}
              trigger="click"
              content={(
                <Emotions
                  onEmojiClick={this.onEmojiClick.bind(this)}
                  siteName={siteName}
                />
              )}
            >
              <div className="grp-emotions">
                <SmileOutlined />
              </div>
            </Popover> */}
          </div>
          <AppButton
            style={{ fontSize: '12px' }}
            className={''}
            type='submit'
          >
            
            {!isReply ? 'Post' : 'Reply'}
          </AppButton>
        </div>
      </Form>
    );
  }
}
