import { io, Socket } from "socket.io-client";

const URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const socket: Socket = io(URL, {
  withCredentials: true,
});

export default socket;