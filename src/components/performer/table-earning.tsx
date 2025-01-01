/* eslint-disable react/require-default-props */
/* eslint-disable default-case */
import { PureComponent } from 'react';
import { Table, Tag } from 'antd';
import { formatDate } from '@lib/date';
import { IEarning } from 'src/interfaces';
import Link from 'next/link';

interface IProps {
  dataSource: IEarning[];
  rowKey: string;
  pagination: {};
  onChange: Function;
  loading: boolean;
  isToken: boolean;
  exchangeRateWebValue?:number
}

export class TableListEarning extends PureComponent<IProps> {
  render() {
    const {
      dataSource, rowKey, pagination, onChange, loading, isToken, exchangeRateWebValue
    } = this.props;
    const columns = [
      {
        title: 'Date',
        dataIndex: 'createdAt',
        sorter: true,
        render(date: Date) {
          return <span>{formatDate(date)}</span>;
        }
      },
      {
        title: 'From',
        dataIndex: 'userInfo',
        render(userInfo) {
          return (
            <Link href={{
              pathname: '/model/profile',
              query: {
                username: userInfo?.username || userInfo?._id
              }
            }}
            >
              <a href={`/model/profile/?username=${userInfo?.username || userInfo?._id}`}>
                {userInfo?.name || userInfo?.username || 'N/A'}
              </a>
            </Link>
          );
        }
      },
      {
        title: 'Type',
        dataIndex: 'type',
        render(type: string) {
          switch (type) {
            case 'private_chat':
              return <Tag color="violet">Private Chat</Tag>;
            case 'group_chat':
              return <Tag color="violet">Group Chat</Tag>;
            case 'public_chat':
              return <Tag color="violet">Public Chat</Tag>;
            case 'feed':
              return <Tag color="green">Post</Tag>;
            case 'tip':
              return <Tag color="orange">Direct Tip</Tag>;
            case 'gift':
              return <Tag color="orange">Gift</Tag>;
            case 'message':
              return <Tag color="pink">Message</Tag>;
            case 'bonus':
              return <Tag color="green">Bonus</Tag>;
            case 'transaction':
              return <Tag color="green">Transfer</Tag>;
            case 'sponsorship':
              return <Tag color="success">Cross Promotion</Tag>;
          }
          return <Tag color="success">{type}</Tag>;
        }
      },
      {
        title: 'Amount',
        dataIndex: 'netPrice',
        render(netPrice: number) {
          return (
            <span style={{ whiteSpace: 'nowrap' }}>
              {isToken ? <img alt="coin" src="/static/diamond.png" width="15px" /> : '$'}
              {isToken ? (netPrice || 0) : (netPrice * (exchangeRateWebValue || 1) || 0) }
            </span>
          );
        }
      }
    ];
    return (
      <div className="table-responsive">
        <Table
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          rowKey={rowKey}
          pagination={{ ...pagination, showSizeChanger: false }}
          onChange={onChange.bind(this)}

        />
      </div>
    );
  }
}
