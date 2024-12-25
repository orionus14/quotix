import React from 'react'

interface IChatItem {
    username: string;
}

const ChatItem: React.FC<IChatItem> = ({ username }) => {
    return (
        <div
            className='border-b border-gray-300 flex justify-between items-center pl-3 pr-2 py-6 hover:bg-gray-100 cursor-pointer'
        >
            <div className='flex items-center'>
                <div className='w-10 h-10 bg-gray-300 rounded-full mr-2'></div>
                <div>
                    <div>{username}</div>
                    <div className='text-xs text-gray-400'>How was your meeting?</div>
                </div>
            </div>
            <div className='text-xs text-gray-600'>Aug 17, 2022</div>
        </div>
    )
}

export default ChatItem
