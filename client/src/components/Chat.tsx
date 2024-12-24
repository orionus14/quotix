import { useEffect, useState } from "react"
import ChatListHeader from "./ChatList/ChatListHeader"
import ChatListSection from "./ChatList/ChatListSection"
import MessageHeader from "./MessageSection/MessageHeader"
import MessageInput from "./MessageSection/MessageInput"
import Messages from "./MessageSection/Messages"
import axios from "axios"

const Chat = () => {
    const [firstName, setFirstName] = useState<string>('No Name');

    useEffect(() => {
        axios.get('/profile', { withCredentials: true })
            .then(response => {
                console.log(response)
                setFirstName(response.data.firstName);
            })
            .catch(() => {
                console.error("User is not logged in");
            })
    }, []);
    return (
        <div className="flex h-screen">
            <div className="w-1/3">
                <ChatListHeader firstName={firstName} />
                <ChatListSection />
            </div>
            <div className="w-2/3 border-l border-gray-300 flex flex-col">
                <MessageHeader username='Alice Freeman' />
                <Messages />
                <MessageInput />
            </div>
        </div>
    )
}

export default Chat