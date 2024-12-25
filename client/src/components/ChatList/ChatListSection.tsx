import { Plus } from 'lucide-react'
import ChatItem from './ChatItem'
import { useState } from 'react'
import DialogBox from './DialogBox';

const ChatListSection = () => {
  const [isDialogBox, setIsDialogBox] = useState(false);

  const closeDialogBox = () => {
    setIsDialogBox(false);
  };

  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-between pl-3 pr-2 py-6'>
        <h2 className='text-cyan-500'>Chats</h2>
        <button
          className='flex items-center text-sm text-cyan-500 hover:text-cyan-400 transition duration-300 border border-gray-300 font-semibold p-2 rounded-lg'
          onClick={() => setIsDialogBox(true)}
        >
          <Plus size={16} />
          <span className='ml-1'>New Chat</span>
        </button>
      </div>
      <div>
        <ChatItem username='Alice Freeman' />
      </div>

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