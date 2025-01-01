import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cancelPrivateRequest } from '@redux/streaming/actions';
import { Image, message, Radio } from 'antd';
import './private-request.less';
import { streamService } from '@services/stream.service';

interface IProps {
  privateRequest: any;
  onSelectRequest: Function;
  selected: boolean;
  istimeDeline: boolean;
  isChecked: boolean
}

export const PrivateRequest = ({
  privateRequest, onSelectRequest, selected, istimeDeline, isChecked
}: IProps) => {
  let Timer = null;

  const [time, setTime] = useState(120);
  const [loop, setLoop] = useState(istimeDeline);

  const dispatch = useDispatch();

  const countDown = () => {
    Timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => {
      clearTimeout(Timer);
    };
  };

  const handleCancelRequest = async (conversationId: string) => {
    // socket.emit('privateChat/requestTimeout', { conversationId, performerId });

    try {
      dispatch(cancelPrivateRequest(conversationId));
      clearTimeout(Timer);
      await streamService.cancelPrivateChat(conversationId);
    } catch (e) {
      const err = e;
      message.error(err?.message || 'Error occured, please try again later');
    }
  };

  useEffect(() => {
    if (!time) {
      handleCancelRequest(privateRequest.conversationId);
    }
    if (loop) {
      setTime(120);
      clearTimeout(Timer);
      setLoop(false);
    } else {
      countDown();
    }
  }, [time]);

  useEffect(() => {
    if (!time) {
      handleCancelRequest(privateRequest.conversationId);
    }
    countDown();
  }, []);

  useEffect(() => {
    setLoop(istimeDeline);
  }, [istimeDeline]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={selected ? 'private-request-item active' : 'private-request-item'} onClick={() => onSelectRequest()}>
      <Radio className="status-user" checked={isChecked} />
      <p>{time}</p>
      <Image
        className="avatar"
        src={privateRequest.user?.avatar ? privateRequest.user.avatar : '/static/no-avatar.png'}
        alt=""
      />
      {' '}
      <span className="display-name">{privateRequest.user?.username}</span>
    </div>
  );
};
