import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import DialogBox from './DialogBox';
import Confirmation from './ConfirmationBox';

interface IChatItem {
    firstName: string;
    lastName: string;
    chatId: string;
}

const ChatItem: React.FC<IChatItem> = ({ firstName, lastName, chatId }) => {
    const [isDialogBox, setIsDialogBox] = useState(false);
    const [isConfirmationBox, setIsConfirmationBox] = useState(false);

    const closeDialogBox = () => {
        setIsDialogBox(false);
    };

    const closeConfirmationBox = () => {
        setIsConfirmationBox(false);
    }

    return (
        <div
            className='border-b border-gray-300 flex justify-between items-center pl-3 pr-2 py-6 hover:bg-gray-100 cursor-pointer'
        >
            <div className='flex items-center'>
                <div className='w-10 h-10 bg-gray-300 rounded-full mr-2'></div>
                <div>
                    <div>{`${firstName} ${lastName}`}</div>
                    <div className='text-xs text-gray-400'>How was your meeting?</div>
                </div>
            </div>
            <div className='text-gray-600 flex flex-col items-end justify-center'>
                <div className='flex '>
                    <div
                        title='Update Chat'
                        onClick={() => setIsDialogBox(true)}
                    >
                        <Pencil size={16} className='cursor-pointer mr-2 text-gray-600 hover:text-gray-500' />
                    </div>
                    <div
                        title='Delete Chat'
                        onClick={() => setIsConfirmationBox(true)}
                    >
                        <Trash2 size={16} className='cursor-pointer text-gray-600 hover:text-gray-500' />
                    </div>
                </div>
                <div className='text-xs mt-2'>Aug 17, 2022</div>
            </div>

            {isDialogBox && (
                <DialogBox
                    closeDialogBox={closeDialogBox}
                    type='update'
                    firstName={firstName}
                    lastName={lastName}
                    chatId={chatId}
                />
            )}

            {isConfirmationBox && (
                <Confirmation
                    closeConfirmationBox={closeConfirmationBox}
                    firstName={firstName}
                    lastName={lastName}
                    chatId={chatId}
                />
            )}
        </div>
    )
}

export default ChatItem