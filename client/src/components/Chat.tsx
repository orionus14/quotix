import ChatListHeader from "./ChatListHeader"
import ChatListSection from "./ChatListSection"
import MessageHeader from "./MessageHeader"
import MessageInput from "./MessageInput"
import Messages from "./Messages"


const Chat = () => {
    return (
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
    )
}

export default Chat
