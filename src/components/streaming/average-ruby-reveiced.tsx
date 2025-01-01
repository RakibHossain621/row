import React from 'react';
import { DashboardOutlined } from '@ant-design/icons';
import './average-ruby-reveiced.less';

interface IProps {
  averageRubyReceived: number;
}

const AverageRubyReceivedInStream = ({ averageRubyReceived }: IProps) => {
  return (
    <div className='prm-container'>
      <div className='prm-content'>
        <DashboardOutlined style={{ color: 'red', fontSize: 20 }} />
        <small>RPM</small>
        <span>{averageRubyReceived.toFixed(2) || 0}</span>
      </div>
    </div>
  );
}

export default AverageRubyReceivedInStream;