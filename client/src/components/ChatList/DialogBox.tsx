import axios from 'axios';
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';

interface IDialogBox {
    closeDialogBox: () => void;
    type: 'update' | 'create';
    firstName?: string;
    lastName?: string;
    chatId?: string;
}

const DialogBox: React.FC<IDialogBox> = ({ closeDialogBox, type, firstName, lastName, chatId }) => {
    const [userFirstName, setUserFirstName] = useState(firstName || '');
    const [userLastName, setUserLastName] = useState(lastName || '');
    const { addChat, updateChat } = useAuth();

    type = type.charAt(0).toUpperCase() + type.slice(1);

    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (type === 'Create') {
            try {
                const response = await axios.post('/chat', { userFirstName, userLastName }, { withCredentials: true });
                const newChat = response.data.newChat;
                addChat(newChat);
                closeDialogBox();
            } catch (error) {
                console.error("Creating new chat failed", error);
            }
        } else {
            try {
                const response = await axios.put(`/chat/${chatId}`, { userFirstName, userLastName }, { withCredentials: true });
                const updatedChat = response.data.updatedChat;
                updateChat(updatedChat);
                closeDialogBox();
            } catch (error) {
                console.error("Updating new chat failed", error);
            }
        }
    }

    return (
        <div className='fixed z-10 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='w-72 mx-auto bg-cyan-50 p-6 rounded-lg'>
                <div
                    className='cursor-pointer flex justify-end mb-2'
                    onClick={closeDialogBox}
                >
                    <X />
                </div>
                <h2 className='text-center mb-4 text-xl font-semibold'>{type} Chat</h2>
                <input
                    value={userFirstName}
                    onChange={e => setUserFirstName(e.target.value)}
                    type='text'
                    placeholder='first name'
                    className='w-full p-2 mb-4 border-2 border-cyan-500 rounded-sm outline-cyan-800'
                />
                <input
                    value={userLastName}
                    onChange={e => setUserLastName(e.target.value)}
                    type='text'
                    placeholder='last name'
                    className='w-full p-2 mb-4 border-2 border-cyan-500 rounded-sm outline-cyan-800'
                />
                <div className='flex justify-center'>
                    <button
                        className='block bg-orange-500 text-white py-2 px-3 hover:bg-orange-400 transition duration-300 font-medium rounded-sm mx-1'
                        onClick={closeDialogBox}
                    >
                        Cancel
                    </button>
                    <button
                        className='block bg-cyan-500 text-white py-2 px-3 hover:bg-cyan-400 transition duration-300 font-medium rounded-sm mx-1'
                        onClick={handleClick}
                    >
                        {type}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DialogBox;