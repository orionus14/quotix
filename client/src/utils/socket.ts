import { io, Socket } from "socket.io-client";

const URL = "http://localhost:4000";
const socket: Socket = io(URL, {
  withCredentials: true,
});

export default socket;