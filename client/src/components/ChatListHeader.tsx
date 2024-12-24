import { useState } from 'react'
import { Link } from 'react-router-dom'

const ChatListHeader = () => {
  const [searchingChat, setSearchingChat] = useState<string>('');
  return (
    <div className='h-32 bg-[#FBF8F9] border-b border-gray-300 p-3 flex flex-col justify-between'>
      <div className='flex justify-between items-center'>
        <div className='w-10 h-10 bg-white rounded-full'></div>
        <Link
          to='/login'
          className='bg-white p-2 rounded-lg block text-cyan-500 hover:text-cyan-400 transition duration-300 border border-gray-300 text-sm font-semibold'
        >
          Log in
        </Link>
      </div>
      <input
        type="text"
        className='block w-full py-1 px-4 rounded-full text-sm border border-gray-300 outline-gray-400'
        placeholder='Search or start new chat'
      />
    </div>
  )
}

export default ChatListHeader
