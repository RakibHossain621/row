import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cancelPrivateRequest } from '@redux/streaming/actions';
import { message } from 'antd';
import './private-request.less';

interface IProps {
  privateRequest: any;

  istimeDeline: boolean;
}

export const PrivateRequestTime = ({
  privateRequest, istimeDeline
}: IProps) => {
  const [time, setTime] = useState(70);
  const [loop, setLoop] = useState(istimeDeline);

  const dispatch = useDispatch();
  let Timer = null;

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
      setTime(15);
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

    <div />
  );
};
