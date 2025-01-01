import Link from 'next/link';
import { IPerformer } from 'src/interfaces';
import { Button, Avatar } from 'antd';
import { connect } from 'react-redux';
import './content-sidebar-layout.less';
import { ShakeHandIcon } from 'src/icons';
import { ROLE_PERMISSIONS } from 'src/constants';
import { useEffect, useState } from 'react';

interface IProps {
  performer: IPerformer;
  currentUser:IPerformer;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  currentPage?: string;
  // eslint-disable-next-line react/require-default-props
  crossPromotion?:any;
  loggedIn : any;
}

const ContentLeftbarLayout = ({
  performer,
  crossPromotion = null,
  currentUser,
  loggedIn
}: IProps) => {
  const [isVisiblePromote, setVisiblePromote] = useState(false);

  useEffect(() => {
    if (loggedIn && (currentUser?._id !== performer?._id) && currentUser?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) && currentUser?.roles.includes(ROLE_PERMISSIONS.ROLE_ALL_RISING_MODEL) && performer?.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_CROSSPROMOTE)) {
      setVisiblePromote(true);
    }
  }, [currentUser]);

  return (
    <div className="p-3 h-2/3 md:h-full flex flex-col items-center justify-start gap-3 absolute top-0 md:-left-20 left-0 w-20">
      <>
        <div className="lib-icons max-w-full">
          {(performer.privateChat !== 0) ? (
            <Link
              href={{
                pathname: '/user/private-waiting-room',
                query: { username: performer?.username || performer?._id }
              }}
              as={`/private-waiting-room/${performer?.username || performer?._id}`}
            >
              <span className="block p-2 rounded text-center cursor-pointer bg-red-700 text-white">Private Now</span>
            </Link>
          ) : (
            ''
          )}
        </div>
        <div className="lib-icons max-w-full">
          {(performer.live !== 0) ? (
            <Link
              href={{
                pathname: '/stream',
                query: { username: performer?.username || performer?._id }
              }}
              as={`/stream/${performer?.username || performer?._id}`}
            >
              <span className="block p-2 rounded text-center cursor-pointer text-white md:text-black/90">Live Now</span>
            </Link>
          ) : (
            ''
          )}
        </div>
        {isVisiblePromote
          && (
            <div className="lib-icons max-w-full">
              <Link
                href={{
                  pathname: '/model/profile',
                  query: { username: crossPromotion?.sourceInfo?.username || crossPromotion?.sourceInfo?._id }
                }}
                as={`/model/profile?username=${crossPromotion?.sourceInfo?.username || crossPromotion?.sourceInfo?._id}`}
              >
                <div className="text-center">
                  <img src={crossPromotion?.sourceInfo?.avatar || '/static/no-image.jpg'} className='w-16 h-16 bg-blue-700 p-2 rounded' style={{objectFit: 'cover', aspectRatio: '1 / 1'}} />
                  <span className="block py-2 rounded text-center cursor-pointer text-white md:text-black/90">
                    Visit my supporter
                  </span>
                </div>
              </Link>
            </div>
          )}
        {/* <div className="gr-icons">
          {isVisiblePromote && (
          <div className="icons-gr">
            <Link
              href={{
                pathname: '/cross-promotion',
                query: { id: performer?._id }
              }}
              as={`/cross-promotion?id=${performer?._id}`}
            >
              <ShakeHandIcon />
            </Link>
          </div>
          )}
        </div> */}
      </>
    </div>
  );
};

const mapStates = (state: any) => ({
  currentUser: state.user.current,
  loggedIn: state.auth.loggedIn
});

export default connect(mapStates)(ContentLeftbarLayout);
