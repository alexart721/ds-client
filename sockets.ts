import socketClient from 'socket.io-client';

const NEXT_PUBLIC_BASE_CLIENT_URL_SOCKET = process.env.BASE_CLIENT_SOCKET;

let socket: any;

function init() {
  socket = socketClient(NEXT_PUBLIC_BASE_CLIENT_URL_SOCKET as string, { path: '/api/socket.io' });
  socket.on('connection', () => {});
  socket.on('test', () => {});

  return socket;
}

<<<<<<< HEAD
export default {
  init, socket
};
=======
const exportValue = {
  init, socket,
};

export default exportValue;
>>>>>>> main
