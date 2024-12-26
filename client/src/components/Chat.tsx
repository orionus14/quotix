import ChatListHeader from "./ChatList/ChatListHeader"
import ChatListSection from "./ChatList/ChatListSection"
import MessageHeader from "./MessageSection/MessageHeader"
import MessageInput from "./MessageSection/MessageInput"
import Messages from "./MessageSection/Messages"
import { AuthProvider } from "../context/AuthContext"

const Chat = () => {

    return (
        <AuthProvider>
            <div className="flex h-screen">
                <div className="w-1/3 h-full flex flex-col">
                    <ChatListHeader />
                    <div className="flex-grow overflow-y-auto thin-scrollbar">
                        <ChatListSection />
                    </div>
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