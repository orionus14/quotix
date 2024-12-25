import axios from 'axios';
import { X } from 'lucide-react'
import React, { useState } from 'react'

interface IDialogBox {
    closeDialogBox: () => void;
    type: 'update' | 'create';
}

const DialogBox: React.FC<IDialogBox> = ({ closeDialogBox, type }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    type = type.charAt(0).toUpperCase() + type.slice(1);

    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (type = 'create') {
            try {
                await axios.post('/chat', {firstName, lastName}, { withCredentials: true });
                closeDialogBox();
            } catch (error) {
                console.error("Creating new chat failed", error);
            }
        } else {
            try {
                await axios.put(`/chat/`, { withCredentials: true });
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
                <h2 className='text-center mb-4 text-xl font-semibold'>{type} New Chat</h2>
                <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    type='text'
                    placeholder='first name'
                    className='w-full p-2 mb-4 border-2 border-cyan-500 rounded-sm outline-cyan-800'
                />
                <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
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