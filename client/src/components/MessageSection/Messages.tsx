import { useEffect, useRef, useState } from "react";
import socket from "../../utils/socket";
import { Message } from "../../context/AuthContext";
import { MoveDown } from "lucide-react";
import { format } from "date-fns";

interface IMessages {
  chatId: string;
  chatMessages: Message[];
  setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Messages: React.FC<IMessages> = ({ chatId, chatMessages, setChatMessages }) => {
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottomInstantly = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const scrollToBottomSmoothly = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;

    if (container.scrollHeight - container.scrollTop - 10 <= container.clientHeight) {
      setShowScrollToBottomButton(false);
    } else {
      setShowScrollToBottomButton(true);
    }
  };

  const formatDate = (date: string) => {
    if (date)
      return format(new Date(date), 'M/dd/yyyy, h:mm a');
  }

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      if (newMessage.chatId === chatId) {
        setChatMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg._id === newMessage._id)) {
            return prevMessages;
          }
          return [...prevMessages, newMessage];
        });
        scrollToBottomInstantly();
      }
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [chatId]);

  useEffect(() => {
    scrollToBottomInstantly();
  }, [chatMessages]);

  if (!chatMessages || chatMessages.length === 0) {
    return <div className="flex-grow text-gray-500 p-4">No messages yet.</div>;
  }

  return (
    <div
      className="flex-grow overflow-y-auto thin-scrollbar relative p-8"
      ref={messagesContainerRef}
      onScroll={handleScroll}
    >
      {chatMessages.map((msg) => (
        <div key={msg._id} className={`my-2 ${msg.senderType === "user" ? 'pl-12' : 'pr-12'}`}>
          <span className={`font-bold  ${msg.senderType === "user" ? 'hidden' : 'block'}`}>{msg.author}</span>
          <div className={`${msg.senderType === "user" ? 'text-right' : 'text-left'}`}>
            <p className={`inline-block break-all p-2 rounded-md mt-1 ${msg.senderType === "user" ? 'bg-gray-200' : 'bg-[#3F4352] text-[#efefef]'}`}>
              {msg.text}
            </p>
            <p className="text-gray-500 cursor-default text-xs mt-1">{formatDate(msg.createdAt)}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      <button
        onClick={scrollToBottomSmoothly}
        className={`fixed bottom-20 right-4 p-2 bg-gray-500 text-white rounded-full shadow-lg transition-opacity duration-300 ${showScrollToBottomButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <MoveDown size={16} />
      </button>
    </div>
  );
};

export default Messages;