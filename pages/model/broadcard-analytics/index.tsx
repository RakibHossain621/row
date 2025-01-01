import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { IPerformer, IUIConfig } from 'src/interfaces';
import { earningService, performerService } from 'src/services';
import { getResponseError } from '@lib/utils';
import moment from 'moment';
import './index.less';
import { DownChangeIcon, UpChangeIcon } from '@components/dashboard/icons';

interface IProps {
  ui: IUIConfig;
  currentUser: IPerformer;
}

export const getMonthName = (monthNumber: number) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[monthNumber - 1];
};

const formatDateToISO = (year: number, month: number) => {
  return moment({ year, month: month - 1, day: 1 }).toISOString();
};


export const EARNINGS_SOURCE_TYPES = [
  {
    label: 'All sources',
    value: '',
  },
  {
    label: 'Direct Tip',
    value: 'performer',
  },
  {
    label: 'DM-me-fee',
    value: 'transfer',
  },
  {
    label: 'Bonus',
    value: 'bonus',
  },
  {
    label: 'Gift',
    value: 'trade_diamond',
  },
  {
    label: 'Most Supported',
    value: 'bonus_most_supported',
  },
  {
    label: 'Cross Promote',
    value: 'bonus_introducers'
  },
]

export const BroadcardAnalytics = ({ ui, currentUser }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [nMonth] = useState(8);
  const [pagination, setPagination] = useState({ total: 0, current: 1, pageSize: 10 });
  const [sortBy] = useState('createdAt');
  const [sort] = useState('desc');
  const [dates, setDates] = useState<any[]>([]);
  const [type, setType] = useState('ranking');
  const [sourceType, setSourceType] = useState('')
  const [dataRanking, setDataRanking] = useState<any[]>([]);
  const [dataActivity, setDataActivity] = useState<any[]>([]);
  const [totalEarning, setTotalEarning] = useState(0);

  const [mEarning, setMEarning] = useState(null);
  const [mRanking, setMRanking] = useState(null);
  const [mActivity, setMActivity] = useState(null);
  const [dateEarningISO, setDateEarningISO] = useState('');
  const [dateRankingISO, setDateRankingISO] = useState('');
  const [dateActivityISO, setDateActivityISO] = useState('');

  useEffect(() => {
    const names = [];
    for (let i = 0; i <= nMonth; i += 1) {
      const monthFormat = moment(new Date()).subtract(i, 'month').startOf('month').format('MM');
      const yearFormat = moment(new Date()).subtract(i, 'month').startOf('month').format('YYYY');
      names.push({ year: Number(yearFormat), month: Number(monthFormat) });
    }
    setDates(names);


    setDataRanking([
      { datapoint: 'Most Fans', data: currentUser.analytics.mostFansPosition, change: currentUser.analytics.mostFansPosition - currentUser.analytics.mostFansPositionLastMonth },
      { datapoint: 'Most Supported This Month', data: currentUser.analytics.mostSupportedPosition, change: currentUser.analytics.mostSupportedPosition - currentUser.analytics.mostSupportedPositionLastMonth },
      { datapoint: 'All Time video/photo views', data: currentUser.analytics.feedViewsPosition, change: currentUser.analytics.feedViewsPosition - currentUser.analytics.feedViewsPositionLastMonth }
    ]);

    setDataActivity([
      { datapoint: 'Fans', data: currentUser.analytics.totalFollowerThisMonth, change: currentUser.analytics.totalFollowerThisMonth - currentUser.analytics.totalFollowerLastMonth },
      { datapoint: 'Video views', data: currentUser.analytics.videoViewsThisMonth, change: currentUser.analytics.videoViewsThisMonth - currentUser.analytics.videoViewsLastMonth },
      { datapoint: 'Photo views', data: currentUser.analytics.photoViewsThisMonth, change: currentUser.analytics.photoViewsThisMonth - currentUser.analytics.photoViewsLastMonth }
    ]);

    getDataActivityEarning()
    getDataFilter()
  }, [nMonth, currentUser]);

  const handleAMonthChange = (picker: string, year: number, month: number) => {
    const isoDate = formatDateToISO(year, month);

    if (picker === 'mEarning') {
      setMEarning({ year, month })
      setDateEarningISO(isoDate)
    }
    if (picker === 'mRanking') {
      setMRanking({ year, month })
      setDateRankingISO(isoDate)
    }
    if (picker === 'mActivity') {
      setMActivity({ year, month })
      setDateActivityISO(isoDate)
    }
  };

  const getDataActivityEarning = async () => {
    try {
      const respActivity = await performerService.getBoardCasterAnalytics('new_activity', {
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
        sort,
        sortBy,
        sourceType: '', // filtro - new_activity
      });
      setDataActivity([
        { datapoint: 'Fans', data: respActivity.data.totalFans },
        { datapoint: 'Video views', data: respActivity.data.totalPhotoViews },
        { datapoint: 'Photo views', data: respActivity.data.totalVideoViews },
      ]);
      setLoading(false);
      
      const respEarning = await performerService.getBoardCasterAnalytics('earning', {
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
        sort,
        sortBy,
        sourceType: '', // filtro - new_activity
      });
      setTotalEarning(respEarning.data.earning);
    } catch (error) {
      console.error(getResponseError(await error));
      setLoading(false);
    }
  };

  const getDataFilter = async () => {
    const getRightDateFilter = () => {
      if (type === 'ranking') return dateRankingISO
      if (type === 'new_activity') return dateActivityISO
      if (type === 'earning') return dateEarningISO
    }

    const requestDate = getRightDateFilter()

    try {
      const resp = await performerService.getBoardCasterAnalytics(type, {
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
        sort,
        sortBy,
        date: requestDate,
        sourceType,
      });
      setLoading(false);

      if (type === 'earning') {
        setTotalEarning(resp.data.earning);
      } else if (type === 'ranking') {
        setDataRanking([
          { datapoint: 'Most Fans', data: resp.data.followRanking },
          { datapoint: 'Most Supported This Month', data: resp.data.earningRanking },
          { datapoint: 'All Time video/photo views', data: resp.data.feedViewRanking },
        ]);
      } else if (type === 'new_activity') {
        setDataActivity([
          { datapoint: 'Fans', data: resp.data.totalFans },
          { datapoint: 'Video views', data: resp.data.totalPhotoViews },
          { datapoint: 'Photo views', data: resp.data.totalVideoViews },
        ]);
      }
    } catch (error) {
      console.error(getResponseError(await error));
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFilter()
  }, [mEarning, mRanking, mActivity, type, sourceType])

  return (
    <>
      <Head>
        <title>{ui?.siteName} | Broadcard Analytics</title>
      </Head>
      <section className="space-y-5 pb-8">
        <h1 className="text-black/90 text-2xl pb-8">Broadcaster Analytics</h1>
        <div className="border rounded-lg p-6">
          <div className='flex flex-col items-start md:flex-row md:items-center justify-between border-b pb-4'>
            <h2 className="text-black/90 text-lg pb-6 md:pb-0">Earnings</h2>
            <div className="flex items-center justify-end gap-2">
              <select
                onChange={(e) => {
                  setType('earning')
                  setSourceType(e.target.value)
                }} 
                className="block text-sm border-gray-200 w-[140px] rounded-lg p-2" name="sources" id="sources"
              >
                {EARNINGS_SOURCE_TYPES.map((sourceItem) => (
                  <option key={sourceItem.value} style={{backgroundColor: '#F3E6F1', color: '#121212'}} value={sourceItem.value}>{sourceItem.label}</option>
                ))}
              </select>
              <select
                value={mEarning ? `${mEarning.year}-${mEarning.month}` : ''}
                onChange={(e) => {
                  setType('earning')
                  if (!e.target.value) {
                    setMEarning(null)
                    setDateEarningISO('')
                    return
                  } 
                  const [year, month] = e.target.value.split('-');
                  handleAMonthChange('mEarning', Number(year), Number(month));
                }}
                className="block text-sm border-gray-200 w-[140px] rounded-lg p-2"
              >
                <option value="" style={{backgroundColor: '#F3E6F1', color: '#121212'}} key={""}>All time</option>
                {dates.map((date, idx) => (
                  <option style={{backgroundColor: '#F3E6F1', color: '#121212'}} key={idx} value={`${date.year}-${date.month}`}>
                    {getMonthName(date.month)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-3xl pt-6 text-black">
            <span className=''>$</span>
            <span>{(totalEarning || 0).toFixed(2)}</span>
          </p>
        </div>
        
        <div className="border rounded-lg p-6 space-y-4">
          <div className='flex items-center justify-between border-b pb-4'>
            <h2 className="text-black/90 text-lg">Ranking</h2>
            <div className="flex items-center justify-end gap-2">
              <select
                className="block text-sm border-gray-200 w-[140px] rounded-lg p-2"
                value={mRanking ? `${mRanking.year}-${mRanking.month}` : ''}
                onChange={(e) => {
                  setType('ranking')
                  if (!e.target.value) {
                    setMRanking(null)
                    setDateRankingISO('')
                    return
                  } 
                  const [year, month] = e.target.value.split('-');
                  handleAMonthChange('mRanking', Number(year), Number(month));
                }}
                >
                {dates.map((date, idx) => (
                  <option style={{backgroundColor: '#F3E6F1', color: '#121212'}} key={idx} value={`${date.year}-${date.month}`}>
                    {getMonthName(date.month)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <table className='w-full pb-8'>
            <thead>
              <tr className='border-b border-black'>
                <th className='font-normal text-left'>Filter</th>
                <th className='font-normal text-left'>Rank</th>
                <th className='font-normal text-left'>Change</th>
              </tr>
            </thead>
            <tbody>
              {dataRanking.map((item, index) => (
                <tr className='border-b' key={index}>
                  <td className='py-4 px-1 font-semibold text-black/90'>{item.datapoint}</td>
                  <td className='py-4 px-1'>{item.data}</td>
                  <td className='py-4 px-1'>
                    {item.change ? (
                      <span className="flex items-center justify-start">
                        {item.change < 0 ? <DownChangeIcon /> : <UpChangeIcon />}
                        {Math.abs(item.change)}
                      </span>
                    ) : (
                      <span>–</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <div className='flex items-center justify-between border-b pb-4'>
            <h2 className="text-black/90 text-lg">Earnings</h2>
            <div className="flex items-center justify-end gap-2">
              <select
                value={mActivity ? `${mActivity.year}-${mActivity.month}` : ''}
                onChange={(e) => {
                  setType('new_activity')
                  if (!e.target.value) {
                    setMActivity(null)
                    setDateActivityISO('')
                    return
                  } 
                  const [year, month] = e.target.value.split('-');
                  handleAMonthChange('mActivity', Number(year), Number(month));
                }}
                className="block text-sm border-gray-200 w-[140px] rounded-lg p-2"
              >
                <option value="" style={{backgroundColor: '#F3E6F1', color: '#121212'}} key={""}>All time</option>
                {dates.map((date, idx) => (
                  <option style={{backgroundColor: '#F3E6F1', color: '#121212'}} key={idx} value={`${date.year}-${date.month}`}>
                    {getMonthName(date.month)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <table className='w-full pb-8'>
            <thead>
              <tr className='border-b border-black'>
                <th className='font-normal text-left'>Activity</th>
                <th className='font-normal text-left'>Count</th>
                <th className='font-normal text-left'>Change</th>
              </tr>
            </thead>
            <tbody>
              {dataActivity.map((item, index) => (
                <tr className='border-b' key={index}>
                  <td className='py-4 px-1 font-semibold text-black/90'>{item.datapoint}</td>
                  <td className='py-4 px-1'>{item.data}</td>
                  <td className='py-4 px-1'>
                    {item.change ? (
                      <span className="flex items-center justify-start">
                        {item.change < 0 ? <DownChangeIcon /> : <UpChangeIcon />}
                        {Math.abs(item.change)}
                      </span>
                    ) : (
                      <span>–</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ui: state.ui,
  currentUser: state.user.current,
});

export default connect(mapStateToProps)(BroadcardAnalytics);
