import socketClient from 'socket.io-client';

const { BASE_CLIENT_URL_SOCKET } = process.env;

let socket: any;

function init() {
  socket = socketClient(BASE_CLIENT_URL_SOCKET as string, { path: '/api/socket.io' });
  socket.on('connection', () => {});
  socket.on('test', () => {});

  return socket;
}

const exportValue = {
  init, socket,
};

export default exportValue;
