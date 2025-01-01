import { Badge, Avatar, Tooltip } from 'antd';
import { TickIcon } from 'src/icons';
import { formatDateFromnow } from '@lib/index';
import { IConversation } from '@interfaces/message';
import './ConversationListItem.less';
import Router from 'next/router';
import { IPerformer } from '@interfaces/performer';

interface IProps {
  data: IConversation;
  setActive: Function;
  selected: boolean;
  user: IPerformer;
}

export default function ConversationListItem(props: IProps) {
  const { data, setActive, selected, user } = props;

  const {
    recipientInfo, lastMessage, _id, totalNotSeenMessages = 0, lastMessageCreatedAt, updatedAt, diamondsArePending
  } = data;
  
  const className = selected ? 'conversation-list-item active' : 'conversation-list-item';
  
  if (!lastMessage) { return null; }

  return (
    <div aria-hidden className={className} onClick={() => { setActive(_id); Router.push('/messages'); }}>
      <div className="conversation-left-corner">
        <Avatar className="conversation-photo" src={recipientInfo?.avatar || '/static/no-avatar.png'} alt="avatar" />
        <span className={recipientInfo?.isOnline > 0 ? 'online-status active' : 'online-status'} />
      </div>
      <div className="conversation-info">
        <h1 className="conversation-title">
          <span className="re-name" title={recipientInfo?.name || recipientInfo?.username || 'N/A'}>
            {recipientInfo?.name || recipientInfo?.username || 'N/A'}
            {recipientInfo?.verifiedAccount && <TickIcon />}
          </span>
          {user.roles.indexOf('role-host-dmefee') !== -1 && diamondsArePending ? (
          <Tooltip title="You must respond within 24 hours in order to collect this fee">
          <span>
            <small>{diamondsArePending}</small>
              {' '}
              <img src="./static/diamond.png" width="20px" alt="ruby" />
          </span>
          </Tooltip>
          ) : null}
        </h1>
        <p className="conversation-snippet">
          <div className="short-content">{lastMessage}</div>
          <div className="right-content">
            <span className="conversation-time">{formatDateFromnow(lastMessageCreatedAt || updatedAt)}</span>
            {' '}
            <Badge
              className="notification-badge"
              count={totalNotSeenMessages}
            />
          </div>
        </p>
      </div>
    </div>
  );
}
