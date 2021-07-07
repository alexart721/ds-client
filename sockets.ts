import socketClient from 'socket.io-client';
import { BASE_URL } from './services';

let socket: any;

function init() {
  console.log('init');
  socket = socketClient('http://172.31.34.163', { path: '/api/socket.io' });
  socket.on('connection', () => {
    console.log('Connected to socketIO backend');
  });
  socket.on('test', (data: any) => {
    console.log('Message received', data);
  })
}


export default {
  init, socket
};