/* eslint-disable react/require-default-props */
import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  loadStreamMessages,
  loadMoreStreamMessages,
  receiveStreamMessageSuccess,
  muteUser,
  muteUserSuccess,
  deleteMessage,
  deleteMessageSuccess,
  loadMuteUsers,
  loadMuteUsersSuccess
} from '@redux/stream-chat/actions';
import { SocketContext } from 'src/socket';
import { IUser, IPerformer } from 'src/interfaces';
import './MessageList.less';
import { ObservableQueue } from '@lib/hook/observable-queue';
import { of, delay } from 'rxjs';
import Compose from './Compose';
import Message from './Message';

const queue = new ObservableQueue();

interface IProps {
  loadMoreStreamMessages: Function;
  receiveStreamMessageSuccess: Function;
  message: any;
  conversation: any;
  user: IUser & IPerformer;
  deleteMessage: Function;
  deleteMessageSuccess: Function;
  muteUser: Function;
  loggedIn?: boolean;
}

class MessageList extends PureComponent<IProps> {
  messagesRef: any;

  state = {
    offset: 1,
    onloadmore: false
  };

  async componentDidMount() {
    if (!this.messagesRef) this.messagesRef = createRef();
    const { conversation, loggedIn } = this.props;

    const socket = this.context;

    if (loggedIn && conversation && conversation._id) {
      socket && socket.on(
        `message_created_conversation_${conversation._id}`,
        (data) => {
          this.onMessage(data, 'created');
        }
      );
      socket && socket.on(
        `message_deleted_conversation_${conversation._id}`,
        (data) => {
          this.onMessage(data, 'deleted');
        }
      );
    }
  }

  componentWillUnmount() {
    const { conversation } = this.props;
    const socket = this.context;
    socket && socket.off(`message_created_conversation_${conversation._id}`);
    socket && socket.off(`message_deleted_conversation_${conversation._id}`);
  }

  async handleScroll(conversation, event) {
    const {
      message: { fetching, items, total },
      loadMoreStreamMessages: loadMore
    } = this.props;
    const { offset } = this.state;
    const canloadmore = total > items.length;
    const ele = event.target;
    if (!canloadmore) return;
    if (ele.scrollTop === 0 && conversation._id && !fetching && canloadmore) {
      await this.setState({ offset: offset + 1, onloadmore: true });
      loadMore({
        conversationId: conversation._id,
        limit: 25,
        offset: (offset - 1) * 25,
        type: conversation.type
      });
    }
  }

  onDelete(messageId) {
    const { deleteMessage: _deleteMessage } = this.props;
    if (!messageId) return;
    _deleteMessage({ messageId });
  }

  onMute(userId) {
    const { conversation, muteUser: onMuteUser, user } = this.props;
    onMuteUser({
      conversationId: conversation._id,
      performerId: user._id,
      userId
    });
  }

  createObservable = (data, playingTime) => of(data).pipe(delay(playingTime));

  addNew = (data: any, playingTime: number) => {
    const original = this.createObservable(data, playingTime);
    return queue.addItem(original);
  };

  renderMsg = (result) => {
    const { receiveStreamMessageSuccess: create } = this.props;
    if (result && result?.type === 'created') create(result);
  };

  onMessage = (message, type) => {
    const { user } = this.props;

    if (!message) {
      return;
    }
    const {
      receiveStreamMessageSuccess: create,
      deleteMessageSuccess: remove
    } = this.props;
    if (type === 'deleted') {
      remove(message);
    }
    if (type === 'created') {
      const { durationInChat } = (message?.meta && message?.meta?.gift) || 0;
      // eslint-disable-next-line no-nested-ternary
      durationInChat
        ? this.addNew({ ...message, type }, durationInChat * 1000).subscribe(
          this.renderMsg
        )
        : !message.isMuted || user._id === message.senderId
          ? create(message)
          : null;
    }
  };

  canDelete = ({ isDeleted, senderId, performerId }, user): boolean => {
    if (isDeleted) return false;
    let check = false;
    if (user && user._id) {
      if (user.roles && user.roles.includes('admin')) {
        check = true;
      } else if (
        user.roles
        && user.roles.includes('user')
        && senderId === user._id
      ) {
        check = true;
      } else if (performerId === user._id) {
        check = true;
      }
    }
    return check;
  };

  renderMessages = () => {
    const { message, conversation, user } = this.props;
    const messages = message.items;
    let i = 0;
    const messageCount = messages && messages.length;
    const tempMessages = [];
    while (i < messageCount) {
      const previous = messages[i - 1];
      const current = messages[i];
      const next = messages[i + 1];
      const isMine = user && current.senderId === user._id;
      const currentMoment = moment(current.createdAt);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;
      const isOwner = conversation && conversation.performerId === current.senderId;
      if (previous) {
        const previousMoment = moment(previous.createdAt);
        const previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.senderId === current.senderId;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        const nextMoment = moment(next.createdAt);
        const nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.senderId === current.senderId;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }
      if (current._id && (!current.isMuted || current.senderId === user._id)) {
        tempMessages.push(
          <Message
            onDelete={this.onDelete.bind(this, current._id)}
            onMute={this.onMute.bind(this, current.senderId)}
            canDelete={this.canDelete(current, user)}
            canMute={conversation?.performerId === user._id}
            isOwner={isOwner}
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
          />
        );
      }
      // Proceed to the next message.
      i += 1;
    }
    this.scrollToBottom();
    return tempMessages;
  };

  scrollToBottom() {
    const { onloadmore } = this.state;
    if (onloadmore) {
      return;
    }
    if (this.messagesRef && this.messagesRef.current) {
      const ele = this.messagesRef.current;
      window.setTimeout(() => {
        ele.scrollTop = ele.scrollHeight;
      }, 200);
    }
  }

  render() {
    const { conversation } = this.props;
    const {
      message: { fetching }
    } = this.props;
    if (!this.messagesRef) this.messagesRef = createRef();
    return (
      <div
        className="message-list bg-white border border-gray-300"
        ref={this.messagesRef}
        onScroll={this.handleScroll.bind(this, conversation)}
      >
        {conversation && conversation._id && (
          <>
            <div className="message-list-container">
              {fetching && <p className="text-center">fetching...</p>}
              {this.renderMessages()}
            </div>
            <Compose conversation={conversation} />
          </>
        )}
      </div>
    );
  }
}

MessageList.contextType = SocketContext;

const mapStates = (state: any) => {
  const { conversationMap, activeConversation, muteMessage } = state.streamMessage;
  const messages = activeConversation.data && conversationMap[activeConversation.data._id]
    ? conversationMap[activeConversation.data._id].items || []
    : [];
  const totalMessages = activeConversation.data && conversationMap[activeConversation.data._id]
    ? conversationMap[activeConversation.data._id].total || 0
    : 0;
  const fetching = activeConversation.data && conversationMap[activeConversation.data._id]
    ? conversationMap[activeConversation.data._id].fetching || false
    : false;
  return {
    message: {
      items: messages,
      total: totalMessages,
      fetching
    },
    conversation: activeConversation.data,
    user: state.user.current,
    muteMessage,
    loggedIn: state.auth.loggedIn

  };
};

const mapDispatch = {
  loadStreamMessages,
  loadMoreStreamMessages,
  receiveStreamMessageSuccess,
  deleteMessage,
  deleteMessageSuccess,
  muteUser,
  muteUserSuccess,
  loadMuteUsers,
  loadMuteUsersSuccess
};
export default connect(mapStates, mapDispatch)(MessageList);
