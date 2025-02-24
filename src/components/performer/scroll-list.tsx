import InfiniteScroll from 'react-infinite-scroll-component';
import { IPerformer } from 'src/interfaces';
import PerformerCard from '@components/performer/grid-card';
import {
  Row, Col, Alert, Spin
} from 'antd';

interface IProps {
  performers: IPerformer[];
  total: number;
  loadMore(): Function;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  notFoundText?: string;
}

const ScrollListPerformers = ({
  loadMore, performers, total, loading, notFoundText
}: IProps) => (
  <>
    <InfiniteScroll
      dataLength={performers.length}
      hasMore={performers && performers.length < total}
      loader={null}
      next={loadMore}
      endMessage={null}
      scrollThreshold={0.9}
    >
      <Row>
        {performers.length > 0
          && performers.map((p: any) => (
            <Col xs={12} sm={12} md={6} lg={6} key={p._id}>
              <PerformerCard
                modelNumber={null}
                performer={p}
                pathname="/model/profile"
                as={`/${p?.username || p?._id}`}
                showButtonFollow={false}
                getPerformerList={() => {}}
                showModelNumber={false}
              />
            </Col>
          ))}
      </Row>
    </InfiniteScroll>
    {!performers.length && !loading && <div className="main-container custom text-center"><Alert type="info" message={notFoundText || 'No profile was found'} /></div>}
    {loading && (
      <div className="text-center">
        <Spin />
      </div>
    )}
  </>
);

export default ScrollListPerformers;
