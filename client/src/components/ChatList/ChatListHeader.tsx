import { Search } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

interface IChatListHeader {
  setSearchQuery: (query: string) => void;
}

const ChatListHeader: React.FC<IChatListHeader> = ({ setSearchQuery }) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const { user, isAuthenticated, logout } = useAuth();
  return (
    <div className='h-32 bg-[#FBF8F9] border-b border-r border-gray-300 p-3 flex flex-col justify-between'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <div className='w-10 h-10 bg-gray-300 rounded-full mr-2'></div>
          <div>
            {isAuthenticated ? (
              <span>{user?.firstName} {user?.lastName}</span>
            ) : (
              <span>Guest</span>
            )}
          </div>
        </div>
        <div>
          {isAuthenticated ? (
            <Link
              to='/login'
              onClick={logout}
              className='bg-white p-2 rounded-lg block text-red-500 hover:text-red-400 transition duration-300 border border-gray-300 text-sm font-semibold'
            >
              Log out
            </Link>
          ) : (
            <Link
              to='/login'
              className='bg-white p-2 rounded-lg block text-cyan-500 hover:text-cyan-400 transition duration-300 border border-gray-300 text-sm font-semibold'
            >
              Log in
            </Link>
          )
          }
        </div>
      </div>
      <div className='relative mt-2'>
        <Search
          className='absolute top-1/2 -translate-y-1/2 left-2'
          size={16}
          color='#d1d5db'
        />
        <input
          onChange={handleSearchChange}
          type="text"
          className='block w-full py-1 pl-8 pr-4 rounded-full text-sm border border-gray-300 outline-gray-400'
          placeholder='Search or start new chat'
        />
      </div>
    </div >
  )
}

export default ChatListHeader