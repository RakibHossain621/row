/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getStreamConversation } from '@redux/stream-chat/actions';
import MessageList from './MessageList';
import './Messenger.less';

interface IProps {
  streamId?: string;
  activeConversation: any;
  isPerformerSrceen: boolean;
}
class StreamMessenger extends PureComponent<IProps> {
  render() {
    const { activeConversation, isPerformerSrceen } = this.props;

    return (
      <div className={isPerformerSrceen ? 'message-stream' : 'message-stream custom'}>
        {activeConversation && activeConversation.data && activeConversation.data.streamId ? <MessageList /> : <p>No conversation found.</p>}
      </div>
    );
  }
}
const mapStates = (state: any) => ({
  activeConversation: state.streamMessage.activeConversation
});
const mapDispatchs = { getStreamConversation };
export default connect(mapStates, mapDispatchs)(StreamMessenger);
