import { useState, useEffect } from 'react';
import { formatDate, formatLocaleDate } from '@lib/date';
import { messageService } from '@services/message.service';
import { ROLE_PERMISSIONS } from 'src/constants';
import { IPerformer } from '@interfaces/performer';
import { AppButton } from '@components/ui/shared/AppButton';
import { NoVerifiedIcon } from 'src/icons';

interface IProps {
  onFinish: (values: any) => void;
  user: IPerformer;
  updating?: boolean;
}

const mockDataSource = [
  {
    _id: '1',
    avatar: '/static/avatar1.png',
    name: 'John Doe',
    username: 'johndoe',
    createdAt: new Date('2023-09-01T10:00:00Z')
  },
  {
    _id: '2',
    avatar: '/static/avatar2.png',
    name: 'Jane Smith',
    username: 'janesmith',
    createdAt: new Date('2023-08-15T12:30:00Z')
  },
  {
    _id: '3',
    avatar: null, // Sem avatar
    name: null, // Sem nome
    username: 'unknownuser',
    createdAt: new Date('2023-07-20T14:15:00Z')
  }
];

export const PerformerSettingsForm: React.FC<IProps> = ({ onFinish, user, updating }) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sort, setSort] = useState('desc');
  const [filter, setFilter] = useState({});

  useEffect(() => {
    getMutes();
  }, []);

  const getMutes = async (page = 1) => {
    setLoading(true);
    try {
      const resp = await messageService.loadMuteUsers({
        ...filter,
        limit,
        offset: (page - 1) * limit,
        sort,
        sortBy
      });
      setDataSource(resp.data.data);
      setPagination({
        ...pagination,
        total: resp.data.total,
        current: page,
        pageSize: limit
      });
      setLoading(false);
    } catch (e) {
      alert('An error occurred, please try again!');
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Are you sure to remove it?')) return;
    try {
      await messageService.unMuteUser(id);
      getMutes();
      alert('Unmute user successfully');
    } catch (e) {
      alert('An error occurred, please try again!');
    }
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (userInfo: any) => (
        <span className='font-bold text-black text-md'>
          {userInfo?.name || userInfo?.username || 'N/A'}
        </span>
      )
    },
    {
      title: 'Username',
      key: 'username',
      render: (userInfo: any) => <span className='text-md'>@{userInfo?.username || 'N/A'}</span>
    },
    {
      title: 'Date Added',
      key: 'createdAt',
      render: (date: string) => <span className='text-md'>{formatLocaleDate(date)}</span>
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (id: string) => (
        <button onClick={() => onDelete(id)} style={{ color: 'red' }}>
          <NoVerifiedIcon />
        </button>
      )
    }
  ];
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
        onFinish(values);
      }}
    >
     {
      user?.roles?.includes(ROLE_PERMISSIONS.ROLE_ALL_RISING_MODEL) && user?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_PRIVATE) && user?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_LIVE) && user?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_VERIFIED) && user?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_CROSSPROMOTE) && user?.roles?.includes(ROLE_PERMISSIONS.ROLE_HOST_DMMEFEE) && 
       <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch justify-center py-6'>
       <div className='border rounded-lg p-6'>
         <label className='text-xl text-black/90 pb-4 block'>My Private Chat fee</label>
         <div className='relative'>
           <input defaultValue={user.privateChatPrice} className='w-full rounded-lg border-gray-300 ' placeholder='# of Rubys' name="privateChatPrice" type="number" min="1" required />
           <div className='absolute top-0 bottom-0 right-0 m-auto px-2 flex items-center justify-center'>
             <img alt="" src="/static/gem.png" width="30" height="30" /> 
             <span className='block text-md text-black'>
               /min
             </span>
           </div>
         </div>
         <p className='py-4 text-gray-400'>Change fee for private chat</p>
         <footer className='pt-6 text-right border-t mt-auto w-full space-x-1'>
           <AppButton size='base' variant='tertiary' className='border-0'>
             Cancel 
           </AppButton>
           <AppButton size='base'>
             Submit 
           </AppButton>
         </footer>
       </div>
       {/* {user?.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_DMMEFEE) && ( */}
       <div className='border rounded-lg p-6'>
         <label className='text-xl text-black/90 pb-4 block'>My DM-Me-Fee</label>
         <div className='relative'>
           <input defaultValue={user.messagePrice} className='w-full rounded-lg border-gray-300 ' placeholder='# of Rubys' name="messagePrice" type="number" min="0" required />
           <div className='absolute top-0 bottom-0 right-0 m-auto px-2 flex items-center justify-center'>
             <img alt="" src="/static/gem.png" width="30" height="30" /> 
             <span className='block text-md text-black'>
               /50 characters
             </span>
           </div>
         </div>
         <p className='py-4 text-gray-400'>Includes all incoming messages and replies</p>
         <footer className='pt-6 text-right border-t mt-auto w-full space-x-1'>
           <AppButton size='base' variant='tertiary' className='border-0'>
             Cancel 
           </AppButton>
           <AppButton size='base'>
             Submit 
           </AppButton>
         </footer>
       </div>
       {/* )} */}
     </div>
     }
      {/* {user?.roles.includes(ROLE_PERMISSIONS.ROLE_HOST_LIVE) && ( */}
        <div className='border rounded-lg p-6'>
          <h2 className='text-xl text-black/90 pb-2 border-b'>Muted List</h2>
          <h3 className="text-start text-lg text-black/90 py-8">The following fans can not comment during your live broadcast. </h3>
          <div>
            <label htmlFor="addUsers">Add users</label>
            <input className='w-full rounded-lg border-gray-300 ' placeholder='Add users to muted list' type="text" />
          </div>
          <div className='py-4'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-black'>
                  {columns.map((col) => (
                    <th className='font-normal text-left' key={col.key}>{col.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataSource.map((item: any) => (
                  <tr className='border-b' key={item._id}>
                    {columns.map((col) => (
                      <td className='py-4 px-1' key={col.key}>{col.render(item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      {/* )} */}
    </form>
  );
};

