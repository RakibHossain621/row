/* eslint-disable react/require-default-props */
import { message, Row, Col, Table, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { payoutRequestService, performerService } from '@services/index';
import { IPerformer } from 'src/interfaces';
import './index.less';
import { getResponseError } from '@lib/utils';
import Link from 'next/link';
import { CheckedIcon, LiveIcon, NoVerifiedIcon } from 'src/icons';
import {
  NotificationOutlined,
  VideoCameraOutlined,
  LineChartOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CheckCircleFilled
} from '@ant-design/icons';
import { ROLE_PERMISSIONS, ROLE_UNLOCKED_FEATURE } from 'src/constants';
import { AnalyticsIcon, GoLiveIcon, GoPrivateIcon, PayoutRequestsIcon } from './icons';
import { updateModals } from '@redux/modals/actions';

interface IProps {
  currentUser: IPerformer;
}

const DashBoard = ({ currentUser }: IProps) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);
  const [mockRole, setMockRole] = useState<any>({});
  const [nextRole, setNextRole] = useState<any>({});
  const [roles, setRoles] = useState<any[]>([]);
  const [showPayoutRequest, setShowPayoutRequest] = useState(false);

  useEffect(() => {
    getPayoutRequest();
    getMilestone();
  }, []);

  const getPayoutRequest = async () => {
    try {
      setLoading(true);
      const resp = await payoutRequestService.search({});
      if (resp.data) {
        setShowPayoutRequest(resp.data.total > 0);
      }
    } catch (error) {
      const e = Promise.resolve(error);
      message.error(getResponseError(e));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getMilestone = async () => {
    try {
      setLoading(true);
      const resp = await performerService.getMileStones();
      const fetchedMockRole = resp.data;
      setMockRole(fetchedMockRole);

      const roleKeys = Object.keys(fetchedMockRole);
      const currentRole = [];
      const hasRoleLevel = [];
      let nextLevel = {} as any;

      roleKeys.forEach((key) => {
        if (fetchedMockRole[key].hasRole) {
          hasRoleLevel.push(fetchedMockRole[key].level);
        }
      });

      if (hasRoleLevel.length) {
        const highestLevel = hasRoleLevel[hasRoleLevel.length - 1];
        for (const key in fetchedMockRole) {
          if (fetchedMockRole[key].level <= highestLevel) {
            currentRole.push({ role: key, feature: ROLE_UNLOCKED_FEATURE[key], ...fetchedMockRole[key] });
          } else {
            nextLevel = { role: key, feature: ROLE_UNLOCKED_FEATURE[key], ...fetchedMockRole[key] };
            currentRole.push(nextLevel);
            break;
          }
        }
      } else {
        nextLevel = { ...fetchedMockRole[roleKeys[0]], role: roleKeys[0], feature: ROLE_UNLOCKED_FEATURE[roleKeys[0]] };
        currentRole.push(nextLevel);
      }

      setRoles(currentRole);
      setNextRole(nextLevel);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      message.error('An error occurred, please try again!');
    }
  };

  const roleColumns = [
    {
      title: '#',
      dataIndex: 'level',
      key: 'level',
      render: (level: any) => <span>{level}</span>
    },
    {
      title: 'Status',
      dataIndex: 'hasRole',
      key: 'status',
      render: (data, record: any) => (
        <div>
          {record.level === roles.length && nextRole?.role ? (
            <CloseCircleTwoTone twoToneColor="red" />
          ) : (
            <CheckCircleTwoTone twoToneColor={data ? 'limegreen' : 'yellow'} />
          )}
        </div>
      )
    },
    {
      title: 'Requirement',
      dataIndex: 'requirement',
      render(requirement: any) {
        return (
          <div>
            <span>
              {requirement && requirement?.minValue
                ? `${requirement.minValue} ${requirement?.field}`
                : requirement?.field}
            </span>
          </div>
        );
      }
    },
    {
      title: 'Unlocked Feature Description',
      dataIndex: 'feature',
      render(feature: any) {
        return (
          <div>
            {feature && (
              feature?.name === 'Broadcaster Analytics' ? (
                <span>{feature?.name}</span>
              ) : (
                <Link href={feature?.url} as={feature?.url}>
                  <a href={feature?.url}>{feature?.name}</a>
                </Link>
              )
            )}
          </div>
        );
      }
    }
  ];

  const userColumns = [
    {
      title: 'Fans',
      dataIndex: 'totalFans',
      key: 'fans',
      render: (data) => (
        <div>
          <span>{data}</span>
        </div>
      )
    },
    {
      title: 'Videos',
      dataIndex: 'totalVideos',
      key: 'videos',
      render(data) {
        return (
          <div>
            <span>{data}</span>
          </div>
        );
      }
    },
    {
      title: 'Photos',
      dataIndex: 'totalPhotos',
      key: 'photos',
      render(data) {
        return (
          <div>
            <span>{data}</span>
          </div>
        );
      }
    },
    {
      title: 'Total Views',
      dataIndex: 'totalViews',
      key: 'totalViews',
      render(data) {
        return (
          <div>
            <span>{data}</span>
          </div>
        );
      }
    }
  ];

  const userData = {
    totalFans: currentUser.stats.totalFollower,
    totalVideos: currentUser.stats.totalVideos,
    totalPhotos: currentUser.stats.totalPhotos,
    totalViews: currentUser.stats.views
  }

  return (
    <div className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        <div className="border rounded-lg p-5">
          <div className="text-lg text-black/90 pb-4 border-b pt-2">Fans</div>
          <div className="text-4xl text-purple-800 pt-4 pb-2">{userData.totalFans}</div>
        </div>
        <div className="border rounded-lg p-5">
          <div className="text-lg text-black/90 pb-4 border-b pt-2">Videos</div>
          <div className="text-4xl text-purple-800 pt-4 pb-2">{userData.totalVideos}</div>
        </div>
        <div className="border rounded-lg p-5">
          <div className="text-lg text-black/90 pb-4 border-b pt-2">Photos</div>
          <div className="text-4xl text-purple-800 pt-4 pb-2">{userData.totalPhotos}</div>
        </div>
        <div className="border rounded-lg p-5">
          <div className="text-lg text-black/90 pb-4 border-b pt-2">Total Views</div>
          <div className="text-4xl text-purple-800 pt-4 pb-2">{userData.totalViews}</div>
        </div>
      </div>
      <div className="flex items-start justify-between sm:justify-center md:justify-start sm:gap-8 md:gap-12 py-8 px-2">
        {currentUser?.roles.includes(ROLE_PERMISSIONS.ROLE_ALL_RISING_MODEL) && (
            <Link href="/model/broadcard-analytics" as="/model/broadcard-analytics">
              <div className="flex flex-col items-center justify-center max-w-[4rem] cursor-pointer">
                <div className='p-4 rounded-full bg-black/90'>
                  <AnalyticsIcon />
                </div>
                <span className='block text-center font-semibold pt-4'>
                  BroadCaster 
                  Analytics
                </span>
              </div>
            </Link>
          )} 
        {currentUser?.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_LIVE) && (
        <button onClick={() => dispatch(updateModals({
          isGoLiveModalOpen: true
        }))} className="flex flex-col items-center justify-center max-w-[4rem] cursor-pointer">
          <div className='p-4 rounded-full bg-black/90'>
            <GoLiveIcon />
          </div>
          <span className='block text-center font-semibold pt-4 max-w-[2rem]'>
            Go live
          </span>
        </button>
        )} 
        {currentUser?.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) && (
          <Link href="/model/live/create-private-chat" as="/model/live/create-private-chat">
            <div className="flex flex-col items-center justify-center max-w-[4rem] cursor-pointer">
              <div className='p-4 rounded-full bg-black/90'>
                <GoPrivateIcon />
              </div>
              <span className='block text-center font-semibold pt-4 max-w-[3rem]'>
                Go private
              </span>
            </div>
          </Link>
        )} 
        {/* {showPayoutRequest && ( */}
            <Link href="/wallet" as="/wallet">
              <div className="flex flex-col items-center justify-center max-w-[4rem] cursor-pointer">
                <div className='p-4 rounded-full bg-black/90'>
                  <PayoutRequestsIcon />
                </div>
                <span className='block text-center font-semibold pt-4'>
                  Payout requests
                </span>
              </div>
            </Link>
         {/* )}  */}
      </div>
      {/* {roles.length > 0 && (
        <>
          <h2 className="title">Milestones</h2>
          <h3 className="text-center" style={{ color: 'black' }}>
            Unlock Broadcaster Features
          </h3>
          <div className="table-responsive">
            <Table
              dataSource={roles}
              columns={roleColumns}
              rowKey="_id"
              loading={loading}
              pagination={false}
            />
          </div>
        </>
      )} */}
      <div className='w-full p-4 border rounded-lg'>
        <h2 className='text-xl py-2 border-b text-black'>Milestones</h2>
        <p className='py-6 text-lg text-black'>Unlock broadcaster features</p>
        <table className='w-full table-fixed'>
          <thead>
            <th className='border-b border-black font-normal text-left text-black'>Number</th>
            <th className='border-b border-black font-normal text-left text-black'>Status</th>
            <th className='border-b border-black font-normal text-left text-black'>Minimum requirement</th>
            <th className='border-b border-black font-normal text-left text-black'>Unlocked feature description</th>
          </thead>
          <tbody>
            <tr>
              <td className='py-4 px-1 text-black border-b font-semibold'>01</td>
              <td className='py-4 px-1 text-black border-b'>
                {currentUser.roles.includes(ROLE_PERMISSIONS.ROLE_ALL_RISING_MODEL) ? 
                  <CheckedIcon />
                : 
                  <NoVerifiedIcon />
                }
              </td>
              <td className='py-4 px-1 text-black border-b'>10 public videos</td>
              <td className='py-4 px-1 text-black border-b'>
                <Link href={''}>
                  <span className='text-purple-700 font-semibold cursor-pointer'>Broadcaster analytics</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className='py-4 px-1 text-black border-b font-semibold'>02</td>
              <td className='py-4 px-1 text-black border-b'>
                {currentUser.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) ? 
                  <CheckedIcon />
                : 
                  <NoVerifiedIcon />
                }
              </td>
              <td className='py-4 px-1 text-black border-b'>100 fans</td>
              <td className='py-4 px-1 text-black border-b'>
                <Link href={''}>
                  <span className='text-purple-700 font-semibold cursor-pointer'>Host private live</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className='py-4 px-1 text-black border-b font-semibold'>03</td>
              <td className='py-4 px-1 text-black border-b'>
                {currentUser.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_LIVE) ? 
                  <CheckedIcon />
                : 
                  <NoVerifiedIcon />
                }
              </td>
              <td className='py-4 px-1 text-black border-b'>1000 fans</td>
              <td className='py-4 px-1 text-black border-b'>
                <Link href={''}>
                  <span className='text-purple-700 font-semibold cursor-pointer'>Host public live</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className='py-4 px-1 text-black border-b font-semibold'>04</td>
              <td className='py-4 px-1 text-black border-b'>
                {currentUser.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_VERIFIED) ? 
                  <CheckedIcon />
                : 
                  <NoVerifiedIcon />
                }
              </td>
              <td className='py-4 px-1 text-black border-b'>Verified Host</td>
              <td className='py-4 px-1 text-black border-b'>
                <Link href={''}>
                  <span className='text-purple-700 font-semibold cursor-pointer'>Get verified to proceed</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className='py-4 px-1 text-black border-b font-semibold'>05</td>
              <td className='py-4 px-1 text-black border-b'>
                { currentUser.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_CROSSPROMOTE) ? 
                  <CheckedIcon />
                : 
                  <NoVerifiedIcon />
                }
              </td>
              <td className='py-4 px-1 text-black border-b'>1500 fans</td>
              <td className='py-4 px-1 text-black border-b'>
                <Link href={''}>
                  <span className='text-purple-700 font-semibold cursor-pointer'>Cross promotion</span>
                </Link>
              </td>
            </tr>
            <tr>
              <td className='py-4 px-1 text-black border-b font-semibold'>06</td>
              <td className='py-4 px-1 text-black border-b'>
                { currentUser.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_DMMEFEE) ? 
                  <CheckedIcon />
                : 
                  <NoVerifiedIcon />
                }
              </td>
              <td className='py-4 px-1 text-black border-b'>2500 fans</td>
              <td className='py-4 px-1 text-black border-b'>
                <Link href={''}>
                  <span className='text-purple-700 font-semibold cursor-pointer'>Cross promotion</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="text-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

const mapStates = (state: any) => ({
  ui: { ...state.ui },
  currentUser: { ...state.user.current },
  settings: { ...state.settings }
});

export default connect(mapStates)(DashBoard);
