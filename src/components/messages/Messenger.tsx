/* eslint-disable react/require-default-props */
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { deactiveConversation } from '@redux/message/actions';
import { IPerformer } from '@interfaces/performer';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import './Messenger.less';
import { ConfirmProvider } from './confirm-message-context';
import ConfirmMessage from './confirm-message';
import classNames from 'classnames';

interface IProps {
  toSource?: string;
  toId?: string;
  activeConversation?: any;
  deactiveConversation: Function;
  conversation: {
    list: {
      requesting: boolean;
      error: any;
      data: any[];
      total: number;
      success: boolean;
    };
    mapping: Record<string, any>;
    activeConversation: Record<string, any>;
  };
  currentUser: IPerformer;
}
class Messenger extends PureComponent<IProps> {
  componentDidMount() {
    const { toSource, toId, deactiveConversation: handleDeactive } = this.props;
    if (!toSource && !toId) {
      handleDeactive();
    }
  }

  onClose() {
    const { deactiveConversation: handleDeactive } = this.props;
    handleDeactive();
  }

  render() {
    const {
      toSource, toId, activeConversation, conversation, currentUser
    } = this.props;
    const roleHostDmefee = currentUser.roles.indexOf('role-host-dmefee');
    const { data: conversations } = conversation.list;

    return (
      <div className="messenger">
        <div className={!activeConversation._id ? 'sidebar' : 'sidebar active'}>
          <ConversationList toSource={toSource} toId={toId} />
        </div>
        <ConfirmProvider>
          <div className='chat-container'>
            {conversations.length > 0 && (
            <div className={classNames('chat-content', activeConversation._id && 'active', !activeConversation?.recipientInfo?.costPerMessage && 'custom-layout')}>
              <MessageList  performer={activeConversation.recipientInfo}/>
            </div>
            ) }
            {roleHostDmefee === -1 && activeConversation && activeConversation?.recipientInfo?.costPerMessage > 0 ? (
              <ConfirmMessage performer={activeConversation.recipientInfo} currentUser={currentUser} />
            ) : null}
          </div>
        </ConfirmProvider>
      </div>
    );
  }
}
const mapStates = (state: any) => {
  const { activeConversation } = state.conversation;
  const currentUser = state.user.current;

  return {
    activeConversation,
    conversation: { ...state.conversation },
    currentUser
  };
};

const mapDispatch = { deactiveConversation };
export default connect(mapStates, mapDispatch)(Messenger);
