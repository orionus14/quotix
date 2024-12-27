import { useEffect, useRef, useState } from "react";
import socket from "../../utils/socket";
import { Message } from "../../context/AuthContext";
import { MoveDown } from "lucide-react";

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

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      console.log("Received message:", newMessage);
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
    return <div className="text-gray-500 p-4">No messages yet.</div>;
  }

  return (
    <div
      className="flex-grow overflow-y-auto thin-scrollbar"
      ref={messagesContainerRef}
      onScroll={handleScroll}
    >
      {chatMessages.map((msg) => (
        <div key={msg._id} className="p-2">
          <span className="font-bold">{msg.senderType === "user" ? "You" : msg.author}:</span>
          <p>{msg.text}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
      <button
        onClick={scrollToBottomSmoothly}
        className={`fixed bottom-16 right-4 p-2 bg-gray-500 text-white rounded-full shadow-lg transition-opacity duration-300 ${showScrollToBottomButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <MoveDown size={16} />
      </button>
    </div>
  );
};

export default Messages;