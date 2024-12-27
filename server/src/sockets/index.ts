import { Server } from "socket.io";
import Message from "../models/Message";
import { fetchRandomQuote } from "../utils/fetchRandomQuote";

const initSockets = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join_chat", (chatId) => {
            socket.join(chatId);
            console.log(`User connected to the chat: ${chatId}`);
        });

        socket.on("send_message", async (data) => {
            const { chatId, text } = data;
          
            const userMessage = await Message.create({
              chatId,
              text,
              senderType: "user",
            });
          
            io.to(chatId).emit("new_message", userMessage);
            console.log("Message sent to chat:", chatId, userMessage);
          
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