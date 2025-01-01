import { formatLocaleDate } from '@lib/date';
import {
  FormInstance, message,
  DatePicker,
  Pagination,
  Spin
} from 'antd';
import { useEffect, useState } from 'react';
import { calculatePaginationTable } from './table-handler';
import { payoutRequestService } from '@services/payout-request.service';
import { userService } from '@services/user.service';

export const PayoutRequestsTable = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [payoutHistory, setPayoutHistory] = useState<any[]>([])
  const [paypalEmail, setPaypalEmail] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState({
    fromDate: '',
    toDate: ''
  })

  const getPerformerData = async () => {
    try {
      const userResponse = await userService.me();
      setPaypalEmail(userResponse.data.paypalSetting.value)
    } catch (error) {
      console.log(`getPerformerData error`, error)
    }
  }

  const getPayoutRequests = async () => {
    setLoading(true)
    const getPayoutsHistory = await payoutRequestService.search({
      limit: 10,
      offset: (currentPage - 1) * 10,
      sort: 'asc',
      sortBy: 'createdAt',
      type,
      ...date
    })
    setPayoutHistory(getPayoutsHistory.data.data)
    setTotalItems(getPayoutsHistory.data.total)
    setLoading(false)
  }

  useEffect(() => {
    const calcPages = calculatePaginationTable(totalItems)
    setTotalPages(calcPages)
  }, [totalItems])

  useEffect(() => {
    getPayoutRequests()
    getPerformerData()
  }, [currentPage, date])

  return (
    <div className='py-8 border-b border-base-400'>
      <div className='flex flex-col gap-6 mb-8 md:items-center md:justify-between md:flex-row'>
        <h2 className='text-xl text-black'>Payout Requests</h2>

        <div className='flex flex-col gap-6 sm:flex-row'>
          <select className="flex-grow md:min-w-[180px] md:max-w-[208px] h-10 px-4 text-sm border-base-400 rounded-lg focus:outline-none focus:border-purple-800 focus:ring-purple-800 focus:ring-inset focus:ring-1">
            <option value="">All Sources</option>
            <option value="paypal">paypal</option>
          </select>

          <DatePicker.RangePicker
            onChange={(values, formatString) => {
              setDate({
                fromDate: formatString[0],
                toDate: formatString[1]
              })
            }}  
            className='flex-grow md:max-w-[280px] px-5 py-2 border border-base-400 rounded-lg h-10' />
        </div>
      </div>

      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
          <thead className='text-left'>
            <tr>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Id</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Ruby USD value</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Gateway</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Receiving account</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Requested on</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Last updated on</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {payoutHistory.length ? payoutHistory.map((payoutItem, index) => (
              <tr key={payoutItem._id}>
                <td className="px-4 py-5 font-semibold text-gray-900 whitespace-nowrap">{index + 1}</td> {/* can be the ID, or need to format to do some filters: TO-DO*/}
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">
                  <div className='inline-flex items-center gap-1'>
                    $
                    <span>
                      {payoutItem.requestTokens * payoutItem.tokenConversionRate}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{payoutItem.paymentAccountType}</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{paypalEmail}</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{formatLocaleDate(payoutItem.createdAt)}</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{formatLocaleDate(payoutItem.updatedAt)}</td>
              </tr>
            )) : null}
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