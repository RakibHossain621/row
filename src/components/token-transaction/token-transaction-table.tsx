/* eslint-disable react/destructuring-assignment */
import { Table, Tag } from 'antd';
import { ITransaction } from 'src/interfaces';
import { formatDate } from '@lib/date';
import Link from 'next/link';

interface IProps {
  dataSource: ITransaction[];
  pagination: {};
  rowKey: string;
  loading: boolean;
  onChange: Function;
}

const TokenTransactionList = ({
  dataSource,
  pagination,
  rowKey,
  loading,
  onChange
}: IProps) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
      render(id) {
        return <span style={{ whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{id.slice(16, 24)}</span>;
      }
    },
    {
      title: 'Date',
      key: 'createdAt',
      dataIndex: 'createdAt',
      sorter: true,
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
      }
    },
    {
      title: 'To',
      dataIndex: 'performerInfo',
      key: 'performer',
      render(data) {
        return (
          <Link href={{
            pathname: '/model/profile',
            query: {
              username: data?.username || data?._id
            }
          }}
          >
            <a href={`/model/profile/${data?.username || data?._id}`} style={{ whiteSpace: 'nowrap' }}>
              {data?.name || data?.username || 'N/A'}
            </a>
          </Link>
        );
      }
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render(type: string) {
        switch (type) {
          case 'private_chat':
            return <Tag color="violet">Private Chat</Tag>;
          case 'tip':
            return <Tag color="orange">Direct Tip</Tag>;
          case 'stream_gift':
            return <Tag color="green">Stream Gift</Tag>;
          case 'private_chat_gift':
            return <Tag color="red">Private Gift</Tag>;
          case 'message':
            return <Tag color="pink">Message</Tag>;
          case 'product':
            return <Tag color="blue">Product</Tag>;
          case 'gallery':
            return <Tag color="success">Gallery</Tag>;
          case 'sponsorship':
            return <Tag color="success">Cross Promotion</Tag>;
          default: return <Tag color="success">{type}</Tag>;
        }
      }
    },
    {
      title: 'Amount',
      dataIndex: 'totalPrice',
      key: 'tokens',
      render(totalPrice) {
        return (
          <span style={{ whiteSpace: 'nowrap' }}>
            <img alt="token-img" src="/static/gem.png" height="15px" />
            {(Math.round(totalPrice) || 0)}
          </span>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render(status: string) {
        switch (status) {
          case 'pending':
            return <Tag color="blue">Temporary Hold</Tag>;
          case 'success':
            return <Tag color="green">Completed</Tag>;
          case 'refunded':
            return <Tag color="red">Refunded</Tag>;
          default: return <Tag color="default">{status}</Tag>;
        }
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
export default TokenTransactionList;
