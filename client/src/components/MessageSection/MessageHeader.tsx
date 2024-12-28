import React, { useEffect, useState } from 'react'
import { Chat, useAuth } from '../../context/AuthContext';
import { MoveLeft } from 'lucide-react';

interface IMessageHeader {
    chatId: string;
    setShowMessages: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageHeader: React.FC<IMessageHeader> = ({ chatId, setShowMessages }) => {
    const { user } = useAuth();
    const [chat, setChat] = useState<null | Chat>(null);

    useEffect(() => {
        if (user) {
            const foundChat = user.chats.find((chat) => chat._id === chatId);
            setChat(foundChat || null);
        }
    }, [user, chatId]);

    if (!chat) {
        return null;
    }
    return (
        <div className='flex items-center h-20 border-b border-gray-300 pl-3 pr-2 py-3 bg-[#FBF8F9]'>
            <MoveLeft
                className='text-gray-400 mr-4 cursor-pointer'
                onClick={() => setShowMessages(false)}
            />
            <div className='w-10 h-10 bg-white rounded-full mr-2'></div>
            <div className='font-medium'>{chat.firstName} {chat.lastName}</div>
        </div>
    )
}

export default MessageHeader