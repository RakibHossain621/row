import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { sendStreamMessage } from '@redux/stream-chat/actions';
import { messageService } from 'src/services';
import { Input, Modal, message } from 'antd';
import { IPerformer } from '@interfaces/performer';
import VerifiedEmailForm from '@components/performer/verified-email-form';
import {
  SendOutlined,
  SmileOutlined
} from '@ant-design/icons';
import Emotions from './emotions';
import './Compose.less';

interface IProps {
  loggedIn: boolean;
  sendStreamMessage: Function;
  sendMessageStatus: any;
  conversation: any;
  user: IPerformer
  beenMuted:any
}

class Compose extends PureComponent<IProps> {
  uploadRef: any;

  _input: any;

  constructor(props) {
    super(props);
    this.uploadRef = React.createRef();
  }

  state = { text: '', isMuted: false, openVerifiedEmailModal: false };

  componentDidMount() {
    this.checkMuteUser();
    if (!this.uploadRef) this.uploadRef = React.createRef();
    if (!this._input) this._input = React.createRef();
  }

  componentDidUpdate(previousProps: IProps) {
    const { sendMessageStatus, beenMuted, conversation } = this.props;
    if (beenMuted.includes(conversation.performerId)) {
      this.setState({ isMuted: true });
    }

    if (sendMessageStatus.success && previousProps.sendMessageStatus.success !== sendMessageStatus.success) {
      this.updateMessage('');
      this._input && this._input.focus();
    }
  }

  onKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      this.send();
    }
  };

  checkMuteUser = async () => {
    const { conversation } = this.props;
    try {
      const resp = await messageService.checkMuteUser(conversation.performerId);
      if (resp.data) {
        this.setState({ isMuted: resp.data });
      }
    } catch (e) {
      const err = (await Promise.resolve(e)) || {};
      message.error(err || 'An error occurred, please try again!');
    }
  }

  onChange = (evt) => {
    this.setState({ text: evt.target.value });
  };

  onEmojiClick = (emojiObject) => {
    const { text } = this.state;
    this.updateMessage(text + emojiObject.emoji);
  }

  updateMessage(text: string) {
    this.setState({ text });
  }

  send() {
    const {
      loggedIn, sendStreamMessage: _sendStreamMessage, conversation, user
    } = this.props;
    const { text, isMuted } = this.state;
    if (!loggedIn) {
      message.error('Please login');
      return;
    }
    if (!user.verifiedEmail && conversation.type !== 'stream_private') {
      this.setState({ openVerifiedEmailModal: true });
      return;
    }
    if (!text) {
      return;
    }
    _sendStreamMessage({
      conversationId: conversation._id,
      data: {
        text, isMuted
      },
      type: conversation.type
    });
  }

  render() {
    const { loggedIn, conversation, user } = this.props;
    const { text, openVerifiedEmailModal } = this.state;
    const { sendMessageStatus: status } = this.props;
    if (!this.uploadRef) this.uploadRef = React.createRef();
    if (!this._input) this._input = React.createRef();
    return (
      <>

        <div className="compose flex items-center justify-between !border !border-gray-300 p-5">
          <Input
            value={text}
            className="rounded-xl border border-gray-200"
            placeholder="Enter message here."
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            disabled={!loggedIn || status.sending || (conversation.performerId === user._id && conversation.type === 'stream_public')}
            autoFocus
          // eslint-disable-next-line no-return-assign
            ref={(ref) => (this._input = ref)}
          />
          <div className="grp-icons text-center">
            {/* <div className="grp-emotions">
              <SmileOutlined className="send-emotion-btn" />
              <div className="emotion-icon">
                <Emotions onEmojiClick={this.onEmojiClick.bind(this)} />

              </div>
            </div> */}
            <div onClick={this.send.bind(this)} className="text-[#850079] text-sm">Send</div>
          </div>
        </div>
        <Modal
          key="verified_email"
          className="subscription-modal"
          title="Please verify your email address"
          visible={openVerifiedEmailModal}
          footer={null}
          destroyOnClose
          onCancel={() => this.setState({ openVerifiedEmailModal: false })}
        >
          <VerifiedEmailForm />
        </Modal>
      </>

    );
  }
}

const mapStates = (state: any) => ({
  user: state.user.current,
  sendMessageStatus: state.streamMessage.sendMessage,
  beenMuted: state.streaming.beenMuted,
  loggedIn: state.auth.loggedIn
});

const mapDispatch = { sendStreamMessage };
export default connect(mapStates, mapDispatch)(Compose);
