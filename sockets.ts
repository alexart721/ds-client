import socketClient from 'socket.io-client';
import { BASE_CLIENT_URL } from './services';

let socket: any;

function init() {
  console.log('init');
<<<<<<< HEAD
  socket = socketClient(BASE_CLIENT_URL, { path: '/api/socket.io' });
=======
  socket = socketClient('http://localhost:4000');
>>>>>>> eeadd2febf6b3e3e19643b6e342e89f92f4073f8
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