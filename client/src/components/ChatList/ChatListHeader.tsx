import { Search } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface IChatListHeader {
  firstName: string;
}

const ChatListHeader: React.FC<IChatListHeader> = ({ firstName }) => {
  const [searchingChat, setSearchingChat] = useState<string>('');
  return (
    <div className='h-32 bg-[#FBF8F9] border-b border-gray-300 p-3 flex flex-col justify-between'>
      <div className='flex justify-between items-center'>
        <div className='w-10 h-10 bg-white rounded-full'></div>
        {firstName}
        <Link
          to='/login'
          className='bg-white p-2 rounded-lg block text-cyan-500 hover:text-cyan-400 transition duration-300 border border-gray-300 text-sm font-semibold'
        >
          Log in
        </Link>
      </div>
      <div className='relative'>
        <Search
          className='absolute top-1/2 -translate-y-1/2 left-2'
          size={16}
          color='#d1d5db'
        />
        <input
          type="text"
          className='block w-full py-1 pl-8 pr-4 rounded-full text-sm border border-gray-300 outline-gray-400'
          placeholder='Search or start new chat'
        />
      </div>

    </div>
  )
}

export default ChatListHeader
