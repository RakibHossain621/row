import React from 'react';
import moment from 'moment';
import { Image } from 'antd';
import { IUser } from '@interfaces/index';
import './Message.less';

interface IProps {
  data: any;
  isMine: boolean;
  startsSequence: boolean;
  endsSequence: boolean;
  showTimestamp: boolean;
  currentUser: IUser;
  recipient: IUser;
}

export default function Message(props: IProps) {
  const {
    data, isMine, startsSequence, endsSequence, showTimestamp, currentUser, recipient
  } = props;

  const friendlyTimestamp = moment(data.createdAt).format('LLLL');
  return (
    <div
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}
    >

      {data.text && (
        <div className="bubble-container">
          {!isMine && <Image alt="" className="avatar" src={recipient?.avatar || '/static/no-avatar.png'} />}
          <div className="bubble" title={friendlyTimestamp}>
            {!data.imageUrl && data.text}
            {' '}
            {data.imageUrl && <Image fallback="/static/no-avatar.png" alt="" src={data.imageUrl} preview />}
          </div>
          {isMine && <Image alt="" src={currentUser?.avatar || '/static/no-avatar.png'} className="avatar" />}
        </div>
      )}
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}
    </div>
  );
}
