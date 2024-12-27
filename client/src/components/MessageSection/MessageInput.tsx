import { SendHorizonal } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';

interface IMessageInput {
  chatId: string;
}

const MessageInput: React.FC<IMessageInput> = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useAuth();
  
  const handleSendMessage = () => {
    if (message) {
      sendMessage(chatId, message);
      setMessage('');
    }
  }
  return (
    <div className='h-20 bg-[#FBF8F9] px-3 border-t border-gray-300 flex items-center relative'>
      <SendHorizonal
        className='absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer text-gray-600 hover:text-gray-500'
        onClick={handleSendMessage}
      />
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        type="text"
        placeholder='Type your message'
        className='w-full py-3 px-4 rounded-full text-sm border border-gray-300 outline-gray-400'
      />
    </div>
  )
}

export default MessageInput