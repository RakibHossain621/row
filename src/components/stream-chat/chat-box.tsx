import React from 'react';
import StreamMessenger from '@components/stream-chat/Messenger';
import { TabPane, Tabs } from '@components/common/base/tabs';
import './chat-box.less';

interface IProps {
  activeConversation?: any;
  totalParticipant?: number;
  isPerformerScreen? : boolean;
}

const ChatBox = ({
  activeConversation,
  totalParticipant,
  isPerformerScreen
}: IProps) => (
  <>
    <div className="w-full">
        <div >
          {activeConversation
              && activeConversation.data
              && activeConversation.data.streamId && (
                <StreamMessenger
                  isPerformerSrceen={isPerformerScreen}
                  streamId={activeConversation.data.streamId}
                />
          )}
        </div>
    </div>
  </>
);

ChatBox.defaultProps = {
  totalParticipant: 0,
  activeConversation: null,
  isPerformerScreen: false
};

export default ChatBox;
