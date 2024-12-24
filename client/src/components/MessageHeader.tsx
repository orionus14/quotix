import React from 'react'

interface IMessageHeader {
    username: string;
}

const MessageHeader: React.FC<IMessageHeader> = ({ username }) => {
    return (
        <div className='flex items-center h-20 border-b border-gray-300 pl-3 pr-2 py-3 bg-[#FBF8F9]'>
            <div className='w-10 h-10 bg-white rounded-full mr-2'></div>
            <div className='font-medium'>{username}</div>
        </div>
    )
}

export default MessageHeader