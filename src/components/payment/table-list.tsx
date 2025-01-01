/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Table, Tag } from 'antd';
import { ITransaction } from 'src/interfaces';
import { formatDate } from '@lib/date';

interface IProps {
  dataSource: ITransaction[];
  pagination: {};
  rowKey: string;
  loading: boolean;
  onChange: Function;
}

const PaymentTableList = ({
  dataSource, pagination, rowKey, loading, onChange
}: IProps) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render(id) {
        return <span style={{ whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{id.slice(16, 24)}</span>;
      }
    },
    {
      title: 'Date',
      dataIndex: 'updatedAt',
      sorter: true,
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
      }
    },
    {
      title: 'Source of Funds',
      dataIndex: 'type',
      key: 'type',
      render(type: string) {
        switch (type) {
          case 'token_package':
            return <Tag color="blue">Paypal</Tag>;
          case 'trade_diamond':
            return <Tag color="pink">Wallet</Tag>;

          default:
            return <Tag>{type}</Tag>;
        }
      }
    },
    {
      title: 'Rubys Purchase',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      render(data, record:any) {
        return (
          <span>
            <img alt="token-img" src="/static/gem.png" height="15px" />
            {record && record?.products?.length && (record?.products[0].tokens || 0)}
          </span>
        );
      }
    },
    {
      title: 'Paid',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      render(data, record:any) {
        return (
          <span>
            {record?.paymentGateway === 'paypal' ? <img alt="dolar" src="/static/dollar.png" width="15px" /> : <img alt="token-img" src="/static/diamond.png" height="15px" />}
            {record?.paymentGateway === 'paypal' ? (data.toFixed(2) || 0) : (data || 0) }
          </span>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(status: string) {
        switch (status) {
          case 'success':
            return <Tag color="green">Completed</Tag>;
          case 'fail':
            return <Tag color="red">Fail</Tag>;
          case 'processing':
            return <Tag color="orange">Processing</Tag>;
          case 'canceled':
            return <Tag color="pink">Cancelled</Tag>;
          case 'refunded':
            return <Tag color="violet">Refunded</Tag>;
          case 'created':
            return <Tag color="default">Created</Tag>;
          case 'require_authentication':
            return <Tag color="default">Require Authentication</Tag>;
          default:
            break;
        }
        return <Tag color="red">{status}</Tag>;
      }
    }

  ];
  return (
    <div className="table-responsive">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ ...pagination, showSizeChanger: false }}
        rowKey={rowKey}
        loading={loading}
        onChange={onChange.bind(this)}
      />
    </div>
  );
};
export default PaymentTableList;
