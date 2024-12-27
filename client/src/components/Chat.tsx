import ChatListHeader from "./ChatList/ChatListHeader"
import ChatListSection from "./ChatList/ChatListSection"
import MessageHeader from "./MessageSection/MessageHeader"
import MessageInput from "./MessageSection/MessageInput"
import Messages from "./MessageSection/Messages"
import { AuthProvider, Message } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { Chat as ChatModel } from "../context/AuthContext"
import socket from "../utils/socket"
import axios from "axios"

const Chat = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [chat, setChat] = useState<null | ChatModel>(null);
    const [chatMessages, setChatMessages] = useState<Message[]>([]);

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
    };


    return (
        <AuthProvider>
            <div className="flex h-screen bg-[#FBF8F9]">
                <div className="w-1/3 h-full flex flex-col">
                    <ChatListHeader setSearchQuery={setSearchQuery} />
                    <div className="flex-grow overflow-y-auto thin-scrollbar">
                        <ChatListSection
                            searchQuery={searchQuery}
                            handleSelectChat={handleSelectChat}
                        />
                    </div>
                </div>
                {chat && (
                    <div className="w-2/3 border-l border-gray-300 flex flex-col">
                        <MessageHeader chatId={chat._id} />
                        <Messages chatId={chat._id} chatMessages={chatMessages} setChatMessages={setChatMessages} />
                        <MessageInput chatId={chat._id} />
                    </div>
                )}
            </div>
        </AuthProvider>
    )
}

export default Chat