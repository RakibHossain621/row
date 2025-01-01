import { TokenTransactionsType } from "src/globalDtos"
import {
  FormInstance, message,
  DatePicker,
  Pagination,
  Spin
} from 'antd';
import { RubyIcon } from "src/icons";
import { formatDateNew, formatDateToMMMDDYYYY } from "@lib/date";
import { useEffect, useState } from "react";
import { calculatePaginationTable } from "./table-handler";
import { tokenTransctionService } from "@services/token-transaction.service";
import { getResponseError } from "@lib/utils";

const tokenTransactionTypes = [
  {
    key: '',
    text: 'All'
  },
  {
    key: 'token_package',
    text: 'Paypal'
  },
  {
    key: 'trade_diamond',
    text: 'Wallet'
  }
];

export const RubysPurchasedTable = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [tokenTransactions, setTokenTransactions] = useState<TokenTransactionsType[]>([])
  const [type, setType] = useState('')
  const [date, setDate] = useState({
    fromDate: '',
    toDate: ''
  })

  const getTokenTransactions = async () => {
    setLoading(true)
    try {
      const resp = await tokenTransctionService.userTransactions({
        sort: 'asc',
        sortBy: 'createdAt',
        type,
        limit: 10,
        offset: (currentPage - 1) * 10,
        ...date
      });
      setTokenTransactions(resp.data.data)
      setTotalItems(resp.data.total)
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
    getTokenTransactions()
  }, [currentPage, type, date])
  
  return (
    <div className='pb-8 mb-8 border-b border-base-400'>
      <div className='flex flex-col gap-6 mb-8 md:items-center md:justify-between md:flex-row'>
        <h2 className='text-xl text-black'>Rubys Purchased</h2>

        <div className='flex flex-col gap-6 sm:flex-row'>
          <select 
            className="flex-grow md:min-w-[180px] md:max-w-[208px] h-10 px-4 text-sm border-base-400 rounded-lg focus:outline-none focus:border-purple-800 focus:ring-purple-800 focus:ring-inset focus:ring-1"
            value={type}
            onChange={(e) => setType(e.target.value)} 
          >
            {tokenTransactionTypes.map((transactionType) => (
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
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Rubys purchased</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Amount paid</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Source of funds</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Date</th>
              <th className="px-4 py-2 font-medium text-base-900 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tokenTransactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td className="px-4 py-5 font-semibold text-gray-900 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">
                  <div className='inline-flex items-center gap-1'>
                    <RubyIcon className='w-4 h-4' />

                    <span>
                      {transaction.products[0]?.tokens * transaction.products[0]?.quantity}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{transaction.totalPrice}</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{tokenTransactionTypes.find(token => transaction.target === token.key)?.text}</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{formatDateToMMMDDYYYY(transaction.createdAt)}</td>
                <td className="px-4 py-5 text-base-700 whitespace-nowrap">{transaction.status === 'created' ? "" : transaction.status}</td>
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
          <Pagination onChange={(page, pageSize) => setCurrentPage(page)} className='align-middle max-w-max'  current={currentPage} defaultCurrent={1} total={totalItems} pageSize={10} />
        }
        
      </div>
    </div>
  )
}