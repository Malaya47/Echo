import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socket = null;

export const createSocketConnection = () => {
  if (!socket) {
    socket = io(BASE_URL);
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
