import { X } from 'lucide-react';
import React from 'react'
import { useAuth } from '../../context/AuthContext';

interface IConfirmationBox {
    closeConfirmationBox: () => void;
    firstName: string;
    lastName: string;
    chatId: string;
}

const ConfirmationBox: React.FC<IConfirmationBox> = ({ closeConfirmationBox, chatId, firstName, lastName }) => {
    const { deleteChat } = useAuth();

    const handleDelete = () => deleteChat(chatId);
    return (
        <div className='fixed z-10 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='w-96 mx-auto bg-cyan-50 p-6 rounded-lg'>
                <div
                    className='cursor-pointer flex justify-end mb-2'
                    onClick={closeConfirmationBox}
                >
                    <X />
                </div>
                <div className='text-center mb-4 text-xl'>Do you really want to delete chat with <span className='font-semibold'>{`${firstName} ${lastName}`}</span> and all the messages?</div>
                <div className='flex justify-center'>
                    <button
                        className='block bg-cyan-500 text-white py-2 px-3 hover:bg-cyan-400 transition duration-300 font-medium rounded-sm mx-1'
                        onClick={closeConfirmationBox}
                    >
                        Cancel
                    </button>
                    <button
                        className='block bg-red-500 text-white py-2 px-3 hover:bg-red-400 transition duration-300 font-medium rounded-sm mx-1'
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationBox
