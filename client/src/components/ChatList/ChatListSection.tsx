import React from 'react'
import ChatItem from './ChatItem'

const ChatListSection = () => {
  return (
    <div className='w-full'>
      <h2 className='text-cyan-500 mb-2 pl-3 pr-2 py-6'>Chats</h2>
      <ChatItem username='Alice Freeman' />
      <ChatItem username='Josefina' />
    </div>
  )
}

export default ChatListSection
