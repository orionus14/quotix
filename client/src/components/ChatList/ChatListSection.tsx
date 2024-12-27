import { Plus } from 'lucide-react'
import ChatItem from './ChatItem'
import React, { useState } from 'react'
import DialogBox from './DialogBox';
import { Chat, useAuth } from '../../context/AuthContext';

interface IChatListSection {
  searchQuery: string;
  handleSelectChat: (chat: Chat) => void;
}

const ChatListSection: React.FC<IChatListSection> = ({ searchQuery, handleSelectChat }) => {
  const [isDialogBox, setIsDialogBox] = useState(false);
  const { getChats, isAuthenticated, getLastMessage } = useAuth();
  const chats = getChats();

  const closeDialogBox = () => {
    setIsDialogBox(false);
  };

  const filteredChats = chats.filter((chat) => {
    const fullName = `${chat.firstName} ${chat.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  })
  .sort((a, b) => {
    const lastMessageA = getLastMessage(a._id);
    const lastMessageB = getLastMessage(b._id);

    const dateA = lastMessageA ? new Date(lastMessageA.createdAt).getTime() : new Date(a.createdAt).getTime();
    const dateB = lastMessageB ? new Date(lastMessageB.createdAt).getTime() : new Date(b.createdAt).getTime();

    return dateB - dateA;
  });

  return (
    <div className='w-full h-full border-r border-gray-300'>
      <div className='flex items-center justify-between pl-3 pr-2 py-6'>
        <h2 className='text-cyan-500'>Chats</h2>
        {isAuthenticated && (
          <button
            className='flex items-center text-sm text-cyan-500 hover:text-cyan-400 transition duration-300 border border-gray-300 font-semibold p-2 rounded-lg'
            onClick={() => setIsDialogBox(true)}
          >
            <Plus size={16} />
            <span className='ml-1'>New Chat</span>
          </button>
        )}
      </div>
      <div>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div key={chat._id}
              onClick={() => handleSelectChat(chat)}
            >
              <ChatItem
                firstName={chat.firstName}
                lastName={chat.lastName}
                chatId={chat._id}
              />
            </div>
          ))
        ) : (
          <div className="pl-3 pr-2 text-gray-400 cursor-default">No chats available</div>
        )}
      </div>
      {!isAuthenticated && (
        <div className="pl-3 pr-2 text-gray-400 cursor-default">
          Please, log in to get the chats. It takes only 30 seconds :)
        </div>
      )}
      {isDialogBox && (
        <DialogBox
          closeDialogBox={closeDialogBox}
          type='create'
        />
      )}
    </div>
  )
}

export default ChatListSection