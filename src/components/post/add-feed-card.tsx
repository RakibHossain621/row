import { PureComponent } from 'react';
import {
  PlusOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import './index.less';

interface IProps {
  tab :string
}

export class AddFeedCard extends PureComponent<IProps> {
  render() {
    const { tab } = this.props;

    return (
      <div className="feed-grid-card">
        <Link
          href={{ pathname: '/model/my-post/create', query: { post: tab } }}
        >
          <div className={tab === 'photo' ? 'card-thumb' : 'card-thumb video'}>
            {/* eslint-disable-next-line no-nested-ternary */}
            <div className="card-bg-add" />
            <div className="card-middle">
              <PlusOutlined />
            </div>
            <div className="card-bottom" />
          </div>
        </Link>
      </div>
    );
  }
}
