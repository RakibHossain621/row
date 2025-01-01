import React, { useState } from 'react';
import Footer from '@components/common/layout/footer';
import { Button, Checkbox } from 'antd';
import {
  EyeOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import CommentForm from '@components/comment/comment-form';
import ListComments from '@components/comment/list-comments';

import { login } from '../../../../redux/auth/actions';
import './index.less';

interface IProps {
  loggedIn: boolean;
  user: boolean;
  login: Function;
}

const PerformerInfoBox = ({ user }: any) => (
  <div className="performer-info">
    <div className="infomation">
      <div className="buttons">
        <Button className="btn-follow">+ Follow</Button>
        <span>

          {user?.stats?.subscribers}
          {' '}
          Fans
        </span>
        <Button className="btn-live">
          <span>LIVE CAST</span>
          <span><EyeOutlined /></span>
          <span>
            (
            {user?.stats?.views || 0}
            )
          </span>
        </Button>
      </div>
      <div className="user-name">
        <img width={50} height={50} src={user.avatar || ''} alt="#" />
        <span>{user.name}</span>
      </div>
    </div>
  </div>
);

const GiftMessageBox = ({ user }: any) => (
  <div className="gift-message-box">
    <div className="notification-1">
      <div className="avt">
        <UserAddOutlined />
      </div>
      <div className="content">
        <h5>{user?.name || user?.name}</h5>
        <p>Sent Jet x2</p>
      </div>
    </div>
    <div className="notification-2">
      <div className="avt">
        <UserAddOutlined />
      </div>
      <div className="content">
        <h5>{user?.name || user?.name}</h5>
        <p>Sent Jet x2</p>
      </div>
    </div>
    <div className="notification-3">
      <div className="avt">
        <UserOutlined />
      </div>
      <div className="content">
        <h5>{user?.name || user?.name}</h5>
        <p>Sent Jet x2</p>
      </div>
    </div>
  </div>
);

const GiftListBox = ({ user }: any) => {
  const [confirmSendGift, setConfirm] = useState(false);
  const giftList = [1, 5, 10, 15, 20, 50, 100];

  return (
    <div className="gift-list-box">
      <div className="gift-list">
        {giftList?.map((list) => (
          <div className="tetete">
            <img src={user?.avatar} width={50} height={50} alt="" />
            <div className="price">
              {list}
            </div>
          </div>
        ))}
      </div>
      <div className="conform-send-gift">
        <Button className="send-gift" disabled={!confirmSendGift}>Send gift</Button>
        <Checkbox onChange={() => setConfirm(!confirmSendGift)}>Confirm</Checkbox>
      </div>
      <div className="total-tokens">
        <Button>
          (
          {user?.rubyBalance || 0}
          ) Ruby
        </Button>
      </div>
    </div>
  );
};

const CommentBox = ({ user, siteName }: any) => (
  <div className="comment-box">
    <ListComments
      requesting={false}
      comments={[]}
      onDelete={() => {}}
      user={user}
      canReply
    />
    <CommentForm
      creator={user}
      onSubmit={() => {}}
      objectId={null}
      objectType="feed"
      // requesting={commenting}
      siteName={siteName}
    />
    <Checkbox className="check-comment">Only Mods and Host</Checkbox>
  </div>
);

function StreamPageSidebar({ loggedIn, user, login: onLogin }: IProps) {
  const handleLogin = (data) => {
    onLogin(data);
  };

  return (
    <div className="sidebar-container">
      <PerformerInfoBox
        loggedIn={loggedIn}
        user={user}
        handleLogin={handleLogin}
      />
      <GiftMessageBox user={user} />
      <GiftListBox user={user} />
      <CommentBox user={user} />
      <Footer />
    </div>
  );
}

const mapSState = (state) => {
  const { commentMapping, comment } = state.comment;
  return {
    comment,
    commentMapping,
    siteName: state.ui.siteName,
    loggedIn: state.auth.loggedIn,
    user: state.user.current
  };
};

const mapdispatch = { login };

export default connect(mapSState, mapdispatch)(StreamPageSidebar);
