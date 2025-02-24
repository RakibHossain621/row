import { PureComponent, createRef } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import {
  searchConversations, getConversations, setActiveConversation,
  getConversationDetail, receiveMessageSuccess
} from '@redux/message/actions';
import { Event } from 'src/socket';
import { debounce } from 'lodash';
import { IPerformer } from 'src/interfaces';
// import ConversationSearch from './ConversationSearch';
import ConversationListItem from './ConversationListItem';
import './ConversationList.less';

interface IProps {
  searchConversations: Function;
  getConversations: Function;
  setActiveConversation: Function;
  getConversationDetail: Function;
  receiveMessageSuccess: Function;
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
  toSource: string;
  toId: string;
  user: IPerformer;
}
class ConversationList extends PureComponent<IProps> {
  conversationsRef: any;

  state = {
    conversationPage: 0,
    keyword: ''
  }

  async componentDidMount() {
    if (!this.conversationsRef) this.conversationsRef = createRef();
    const {
      getConversations: getConversationsHandler,
      setActiveConversation: setActiveConversationHandler,
      toSource,
      toId,
      user
    } = this.props;
    const { conversationPage, keyword } = this.state;
    getConversationsHandler({
      limit: 25, offset: conversationPage * 25, type: 'private', keyword
    });
    if (toSource && toId) {
      setTimeout(() => {
        setActiveConversationHandler({
          source: toSource,
          sourceId: toId,
          recipientId: user._id
        });
      }, 1000);
    }
  }

  onMessage = (message: { conversationId: string | number; }) => {
    if (!message) {
      return;
    }
    const {
      conversation,
      getConversations: getConversationsHandler,
      getConversationDetail: getConversationDetailHandler,
      receiveMessageSuccess: receiveMessageSuccessHandler,
      setActiveConversation: setActiveConversationHandler,
      user
    } = this.props;
    const { conversationPage, keyword } = this.state;
    const { mapping } = conversation;
    if (!mapping[message.conversationId]) {
      getConversationDetailHandler({
        id: message.conversationId
      });
    }
    const { conversationId } = message;
    setActiveConversationHandler({ conversationId, recipientId: user._id });
    getConversationsHandler({
      limit: 25, offset: conversationPage * 25, type: 'private', keyword
    });
    receiveMessageSuccessHandler(message);
  };

  onSearchConversation = debounce(async (e) => {
    const { value } = e.target;
    const { searchConversations: getConversationsHandler } = this.props;
    await this.setState({ keyword: value, conversationPage: 0 });
    if (value) {
      return getConversationsHandler({
        keyword: value, limit: 25, offset: 0, type: 'private'
      });
    }
    return getConversationsHandler({ limit: 25, offset: 0, type: 'private' });
  }, 500);

  handleScroll = async (event: { target: any; }) => {
    const { conversation, getConversations: getConversationsHandler } = this.props;
    const { requesting, data, total } = conversation.list;
    const { conversationPage, keyword } = this.state;
    const canloadmore = total > data.length;
    const ele = event.target;
    if (!canloadmore) return;
    if (ele.scrollHeight - ele.scrollTop === ele.clientHeight && !requesting && canloadmore) {
      this.setState({ conversationPage: conversationPage + 1 }, () => {
        const { conversationPage: newPage } = this.state;
        getConversationsHandler({
          keyword, limit: 25, offset: newPage * 25, type: 'private'
        });
      });
    }
  }

  setActive = (conversationId: any) => {
    const {
      setActiveConversation: setActiveConversationHandler,
      user
    } = this.props;
    setActiveConversationHandler({ conversationId, recipientId: user._id });
  };

  render() {
    const { conversation, user } = this.props;
    const { data: conversations, requesting } = conversation.list;
    const { mapping, activeConversation = {} } = conversation;
    if (!this.conversationsRef) this.conversationsRef = createRef();

    return (
      <div className="conversation-list" ref={this.conversationsRef} onScroll={this.handleScroll.bind(this)}>
        <Event event="message_created" handler={this.onMessage} />
        {/* <ConversationSearch
          onSearch={(e) => {
            e.persist();
            this.onSearchConversation(e);
          }}
        /> */}
        {conversations.length > 0
          && conversations.map((conversationId) => (
            <ConversationListItem
              key={conversationId}
              data={mapping[conversationId]}
              setActive={this.setActive}
              selected={activeConversation._id === conversationId}
              user={user}
            />
          ))}
        {requesting && (
        <div className="text-center"><Spin /></div>
        )}
        {!requesting && !conversations.length && (
          <p style={{ margin: '20px 0' }} className="text-center">No conversation found.</p>
        )}
      </div>
    );
  }
}

const mapStates = (state: any) => ({
  conversation: { ...state.conversation },
  message: { ...state.message },
  user: { ...state.user.current },
  sendMessageStatus: state.message.sendMessage
});

const mapDispatch = {
  searchConversations,
  getConversations,
  setActiveConversation,
  getConversationDetail,
  receiveMessageSuccess
};
export default connect(mapStates, mapDispatch)(ConversationList);
