/* eslint-disable react/require-default-props */
/* eslint-disable default-case */
import { PureComponent } from 'react';
import { Table, Tag } from 'antd';
import { formatDate } from '@lib/date';
import { IEarning } from 'src/interfaces';

interface IProps {
  dataSource: IEarning[];
  rowKey: string;
  pagination: {};
  onChange: Function;
  loading: boolean;
}

export class TableListGiftEarning extends PureComponent<IProps> {
  render() {
    const {
      dataSource, rowKey, pagination, onChange, loading
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
        title: 'Activity',
        dataIndex: 'type',
        render(type: string) {
          switch (type) {
            case 'private_chat_gift':
              return <Tag color="violet">Private</Tag>;
            case 'stream_gift':
              return <Tag color="orange">Live</Tag>;
          }
          return <Tag color="success">{type}</Tag>;
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
