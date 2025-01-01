/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import { IPerformer, IUser } from 'src/interfaces';
import Link from 'next/link';
import { TickIcon } from 'src/icons';
import './performer.less';
import ButtonFollow from '@components/common/buttonFollow';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import Router from 'next/router';

interface IProps {
  performer: IPerformer;
  currentUser: IUser;
  pathname: string;
  modelNumber: number;
  as: string;
  getPerformerList: Function;
  showModelNumber?: boolean;
  hideFollower?: boolean;
}

const PrivateChatCard = ({
  performer,
  currentUser,
  pathname,
  modelNumber,
  as,
  getPerformerList,
  showModelNumber,
  hideFollower
} :IProps) => {
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [number] = useState(modelNumber || 0);

  useEffect(() => {
    setTotalFollowers(performer.stats.totalFollower);
  }, []);

  const joinRoom = () => {
    if (currentUser.rubyBalance < 1) {
      message.error('You have an insufficient ruby balance. Please top up.', 10);
      return false;
    }
    Router.push({
      pathname,
      query: {
        username: performer?.username || performer?._id
      }
    });
  };

  return (
    <div className="performer-card" aria-disabled="true">
      {showModelNumber && <div className="model-number"><span>{number || modelNumber || ''}</span></div>}
      <Link
        href={{
          pathname,
          query: {
            username: performer?.username || performer?._id
          }
        }}
        as={as}
      >
        <a href={pathname}>
          <div
            className="grid-card"
            style={{ backgroundImage: `url(${performer?.avatar || '/static/no-avatar.png'})` }}
          >
            <span className={performer?.isOnline > 0 ? 'online-status active' : 'online-status'} />
            {performer?.live > 0 && <span className="live-status">Live</span>}
          </div>
        </a>
      </Link>
      <div className="model-name">
        <p className="display-name">
          {performer?.name?.split(' ')[0].substring(0, 10) || performer?.username?.split(' ')[0].substring(0, 15) || 'N/A'}
          {performer?.verifiedAccount && <TickIcon />}
        </p>
        {!hideFollower && (
          <div className="display-name">
            <span className="price">{performer.privateChatPrice}</span>
            {' '}
            <img alt="" width={30} height={30} className="privateImg" src="/static/gem.png" />
            {' '}
            /m
          </div>
        )}
        <Button onClick={() => joinRoom()} className="primary"> Enter Room</Button>
      </div>
      <ButtonFollow
        performer={performer}
        isHideOnClick
        targetId={performer._id}
        sourceId={currentUser._id}
        isFollow={performer.isFollowed}
        getPerformerList={getPerformerList}
        updateFollower={(val) => setTotalFollowers(totalFollowers + val)}
      />
    </div>
  );
};
const mapStates = (state: any) => ({
  currentUser: { ...state.user.current }
});

export default connect(mapStates)(PrivateChatCard);
