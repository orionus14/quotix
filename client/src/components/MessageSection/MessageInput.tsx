import { SendHorizonal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';

interface IMessageInput {
  chatId: string;
}

const MessageInput: React.FC<IMessageInput> = ({ chatId }) => {
  const [placeholder, setPlaceholder] = useState('');
  const [message, setMessage] = useState('');
  const { sendMessage } = useAuth();

  const placeholderText = "Type 'quote' to get the random quote";

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let isCompleted = false;

    const interval = setInterval(() => {
      if (!isDeleting) {
        setPlaceholder(placeholderText.slice(0, index + 1));
        index += 1;
      } else {
        setPlaceholder(placeholderText.slice(0, index - 1));
        index -= 1;
      }

      if (index === placeholderText.length && !isCompleted) {
        isCompleted = true;

        setTimeout(() => {
          isDeleting = true;
        }, 3000);
      }

      if (index === 0 && isCompleted) {
        isDeleting = false;
        isCompleted = false;
      }
    }, 75);

    return () => clearInterval(interval);
  }, []);
  
  const handleSendMessage = () => {
    if (message) {
      sendMessage(chatId, message);
      setMessage('');
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message) {
      handleSendMessage();
    }
  }

  return (
    <div className='h-20 bg-[#FBF8F9] p-3 border-t border-gray-300 flex items-center relative'>
      <SendHorizonal
        className='absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer text-gray-600 hover:text-gray-500'
        onClick={handleSendMessage}
      />
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder={placeholder}
        className='w-full py-3 pl-4 pr-12 rounded-full text-sm border border-gray-300 outline-gray-400'
      />
    </div>
  )
}

export default MessageInput