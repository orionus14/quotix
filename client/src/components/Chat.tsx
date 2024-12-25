import { useEffect, useState } from "react"
import ChatListHeader from "./ChatList/ChatListHeader"
import ChatListSection from "./ChatList/ChatListSection"
import MessageHeader from "./MessageSection/MessageHeader"
import MessageInput from "./MessageSection/MessageInput"
import Messages from "./MessageSection/Messages"
import axios from "axios"
import { AuthProvider } from "../context/AuthContext"

const Chat = () => {

    useEffect(() => {
        axios.get('/profile', { withCredentials: true })
            .then(() => {
                console.log('User Logged In');
            })
            .catch(() => {
                console.error("User is not logged in");
            })
    }, []);

    return (
        <AuthProvider>
            <div className="flex h-screen">
                <div className="w-1/3">
                    <ChatListHeader />
                    <ChatListSection />
                </div>
                <div className="w-2/3 border-l border-gray-300 flex flex-col">
                    <MessageHeader username='Alice Freeman' />
                    <Messages />
                    <MessageInput />
                </div>
            </div>
        </AuthProvider>
    )
}

export default Chat