import { formatLocaleDate } from '@lib/date';
import { getResponseError } from '@lib/utils';
import { earningService } from '@services/earning.service';
import {
  FormInstance, message,
  DatePicker,
  Pagination,
  Spin
} from 'antd';
import { useEffect, useState } from 'react';
import { DiamondIcon } from 'src/icons';
import { calculatePaginationTable } from './table-handler';

const earningTypes = [
  {
    key: '',
    text: 'All'
  },
  {
    key: 'private_chat',
    text: 'Private Chat fee'
  },
  {
    key: 'tip',
    text: 'Direct Tip'
  },
  {
    key: 'sponsorship',
    text: 'Cross Promotion'
  },
  {
    key: 'dm-me-fee',
    text: 'DM Me-Fee'
  },
  {
    key: 'bonus',
    text: 'Bonus'
  },
  {
    key: 'transaction',
    text: 'Transfer'
  }
];

export const DiamondsReceivedTable = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [giftEarning, setGiftEarning] = useState<any[]>([])
  const [type, setType] = useState('')
  const [date, setDate] = useState({
    fromDate: '',
    toDate: ''
  })

  const getGiftEarningData = async () => {
    setLoading(true)
    try {
      const giftEarning = await earningService.performerSearch({
        limit: 10,
        offset: (currentPage - 1) * 10,
        sort: 'asc',
        sortBy: 'createdAt',
        type,
        isToken: true,
        ...date
      });
      setGiftEarning(giftEarning.data.data)
      setTotalItems(giftEarning.data.total)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      message.error(getResponseError(await error));
    }
  }

  useEffect(() => {
    const calcPages = calculatePaginationTable(totalItems)
    setTotalPages(calcPages)
  }, [totalItems])

  useEffect(() => {
    getGiftEarningData()
  }, [currentPage, date, type])

  return (
    <div className='pb-8 border-b border-base-400'>
      <div className='flex flex-col gap-6 mb-8 md:items-center md:justify-between md:flex-row'>
        <h2 className='text-xl text-black'>Diamonds received</h2>

        <div className='flex flex-col gap-6 sm:flex-row'>
          <select 
            className="flex-grow md:min-w-[180px] md:max-w-[208px] h-10 px-4 text-sm border-base-400 rounded-lg   focus:outline-none focus:border-purple-800 focus:ring-purple-800 focus:ring-inset focus:ring-1"
            value={type}
            onChange={(e) => setType(e.target.value)} 
          >
            <option value="">All Sources</option>
            {earningTypes.map((transactionType) => (
              <option key={transactionType.key} value={transactionType.key}>{transactionType.text}</option>
            ))}
          </select>

          <DatePicker.RangePicker 
            onChange={(values, formatString) => {
              setDate({
                fromDate: formatString[0],
                toDate: formatString[1]
              })
            }} 
            className='flex-grow md:max-w-[280px] px-5 py-2 border border-base-400 rounded-lg h-10' 
          />
        </div>
      </div>

      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
          <thead className='text-left'>
            <tr>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Id</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Amount received</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">From</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Type</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Date</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Activity</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {giftEarning.map((diamondsToken, index) => (
              <tr key={diamondsToken._id}>
                <td className="px-4 py-5 font-semibold text-gray-900 whitespace-nowrap">{index}</td> {/* can be the ID, or need to format to do some filters: TO-DO*/}
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">
                  <div className='inline-flex items-center gap-1'>
                    <DiamondIcon className='w-4 h-4' />

                    <span>
                      {diamondsToken.netPrice}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{diamondsToken.userInfo.username}</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{earningTypes.find(Ttype => diamondsToken.sourceType === Ttype.key)?.text
                }</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{formatLocaleDate(diamondsToken.createdAt)}</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{diamondsToken.transactionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="text-center pt-2">
            <Spin />
          </div>
        )}
      </div>
      

      <div className="flex justify-center sm:justify-end">
        {totalPages > 1 && 
          <Pagination onChange={(page, pageSize) => setCurrentPage(page)} className='align-middle max-w-max'  current={currentPage} defaultCurrent={1} total={totalItems} />
        }
      </div>
    </div>
  )
}