import socketClient from 'socket.io-client';
import { BASE_URL } from './services';

let socket: any;

function init() {
  console.log('init');
  socket = socketClient('http://localhost:4000');
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