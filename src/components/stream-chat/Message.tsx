import React from 'react';
import moment from 'moment';
import { CrownTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import classnames from 'classnames';
import './Message.less';
import Link from 'next/link';

interface IProps {
  data: any;
  isMine: boolean;
  startsSequence: boolean;
  endsSequence: boolean;
  showTimestamp: boolean;
  isOwner: boolean;
  canDelete: boolean;
  canMute:boolean;
  onDelete: Function;
  onMute : Function
}

export default function Message(props: IProps) {
  const {
    data, isMine, startsSequence, endsSequence, showTimestamp, isOwner, canDelete, canMute = false, onMute, onDelete
  } = props;
  const friendlyTimestamp = moment(data.timestamp).format('LLLL');
  // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const menu = (
    <Menu>
      {canDelete && <Menu.Item onClick={() => onDelete()}>Delete</Menu.Item>}
      {canMute && !data?.isMuted && <Menu.Item onClick={() => onMute()}>Click to mute</Menu.Item>}
    </Menu>
  );

  const classNames = classnames(
    'message',
    { mine: isMine },
    { tip: data.type === 'tip' },
    { start: !!startsSequence },
    { end: !!endsSequence },
    { gift: data.type === 'gift' }
  );
  return (
    <div className={classNames}>
      {data.text && !data.isSystem && (
        <div className="bubble-container">
          <Link
            href={{
              pathname: '/model/profile/',
              query: { username: data?.senderInfo?.username || data?.senderInfo?._id }
            }}
            as={`/${data?.senderInfo?.username || data?.senderInfo?._id}`}
          >
            <a target="_blank" rel="noopener noreferrer">
              <img src={(data?.senderInfo?.avatar && data?.senderInfo?.avatar !== '') ? data?.senderInfo?.avatar : '/static/no-avatar.png'} className="messageAvatar" alt="avatar" />
            </a>
          </Link>
          <div className="bubble" title={friendlyTimestamp}>
            {(canDelete || (canMute && !data?.isMuted)) && (
            <Dropdown overlay={menu} placement="topRight">
              <span>
                <InfoCircleOutlined />
                {' '}
              </span>
            </Dropdown>
            ) }
            {data.senderInfo && (
              <Link
                href={{
                  pathname: '/model/profile/',
                  query: { username: data?.senderInfo?.username || data?.senderInfo?._id }
                }}
                as={`/${data?.senderInfo?.username || data?.senderInfo?._id}`}
              >
                <span className="u-name">
                  {isOwner && <CrownTwoTone twoToneColor="#eb2f96" />}
                  <span style={{ cursor: 'pointer' }}>
                    {' '}
                    {data?.senderInfo?.username}
                  </span>
                  {data.type !== 'tip' ? ': ' : ' '}
                </span>
              </Link>
            )}
            {!data.imageUrl && data.text}
            {' '}
            {data.imageUrl && (
              <a
                title="Click to view full content"
                href={data.imageUrl.indexOf('http') === -1 ? '#' : data.imageUrl}
                target="_blank"
                rel="noreferrer"
              >
                <img src={data.imageUrl} width="180px" alt="" />
              </a>
            )}
          </div>
        </div>
      )}
      {data.text && data.isSystem && <p style={{ textAlign: 'center', fontSize: '10px' }}>{data.text}</p>}
      {showTimestamp && !data.isSystem && <div className="timestamp">{friendlyTimestamp}</div>}
    </div>
  );
}
