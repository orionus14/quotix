import ChatListHeader from "./ChatList/ChatListHeader"
import ChatListSection from "./ChatList/ChatListSection"
import MessageHeader from "./MessageSection/MessageHeader"
import MessageInput from "./MessageSection/MessageInput"
import Messages from "./MessageSection/Messages"
import Notification from "./Notification/Notification"
import { AuthProvider, Message } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { Chat as ChatModel } from "../context/AuthContext"
import socket from "../utils/socket"
import axios from "axios"

const Chat = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [chat, setChat] = useState<null | ChatModel>(null);
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [notifications, setNotifications] = useState<string[]>([]);
    const [showMessages, setShowMessages] = useState(false);

    useEffect(() => {
        if (chat) {
            socket.emit("join_chat", chat._id);

            return () => {
                socket.emit("leave_chat", chat._id);
            };
        }
    }, [chat]);

    const fetchMessages = async (chatId: string) => {
        try {
            const response = await axios.get(`/chat/${chatId}/messages`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            return [];
        }
    };

    const handleSelectChat = async (selectedChat: ChatModel) => {
        const messages = await fetchMessages(selectedChat._id);
        setChat({ ...selectedChat, messages });
        setChatMessages(messages);
        setShowMessages(true);
    };

    useEffect(() => {
        socket.on("notification", (notification) => {
            setNotifications((prevNotifications) => [...prevNotifications, notification.message]);
        });

        return () => {
            socket.off("notification");
        };
    }, []);

    return (
        <AuthProvider>
            <div className="flex h-screen bg-[#FBF8F9] ">
                <div className={`${showMessages ? 'hidden' : 'block'} sm:block w-full sm:w-1/2 lg:w-1/3 h-full flex flex-col overflow-y-auto thin-scrollbar`}>
                    <ChatListHeader setSearchQuery={setSearchQuery} />
                    <div className="flex-grow w-full">
                        <ChatListSection
                            searchQuery={searchQuery}
                            handleSelectChat={handleSelectChat}
                        />
                    </div>
                </div>
                {chat && showMessages && (
                    <div
                        className='w-full sm:w-1/2 lg:w-2/3 border-l border-gray-300 flex flex-col'
                    >
                        <MessageHeader chatId={chat._id} setShowMessages={setShowMessages} />
                        <Messages chatId={chat._id} chatMessages={chatMessages} setChatMessages={setChatMessages} />
                        <MessageInput chatId={chat._id} />
                    </div>
                )}
            </div>

            {notifications.map((message, index) => (
                <Notification key={index} message={message} />
            ))}
        </AuthProvider>
    )
}

export default Chat