import socketClient from 'socket.io-client';
import { BASE_CLIENT_URL_SOCKET } from './services';

let socket: any;

function init() {
  console.log('init');
  socket = socketClient(BASE_CLIENT_URL_SOCKET);//, { path: '/api/socket.io' });
  socket.on('connection', () => {
    console.log('Connected to socketIO backend');
  });
  socket.on('test', (data: any) => {
    console.log('Message received', data);
  })

  return socket;
}


export default {
  init, socket
};