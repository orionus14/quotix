import { Server } from "socket.io";
import Message from "../models/Message";
import { fetchRandomQuote } from "../utils/fetchRandomQuote";
import Chat from "../models/Chat";

const initSockets = (io: Server) => {
  io.on("connection", (socket) => {

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
    });

    socket.on("send_message", async (data) => {
      const { chatId, text } = data;

      const userMessage = await Message.create({
        chatId,
        text,
        senderType: "user",
      });

      io.to(chatId).emit("new_message", userMessage);

      if (text.trim().toLowerCase() === "quote") {
        try {
          const { content, author } = await fetchRandomQuote();

          const apiMessage = await Message.create({
            chatId,
            text: content,
            senderType: "api",
            author,
          });

          io.to(chatId).emit("new_message", apiMessage);

          const chat = await Chat.findById(chatId);

          if (chat) {
            const fullName = `${chat.firstName} ${chat.lastName}`;
            io.emit("notification", {
              message: `New quote received in chat with ${fullName}: "${content}" - ${author}`
            });
          } else {
            console.error(`Chat with ID ${chatId} not found`);
          }
        } catch (error) {
          console.error("Error with getting quote:", error);
          io.to(chatId).emit("new_message", {
            text: "Error during fetching a quote",
            senderType: "api",
          });
        }
      }
    });


    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default initSockets;