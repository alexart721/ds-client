import { SocketState } from './stateTypes';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import sockets from '../../../sockets';

const initialState: {
  socket: SocketState
} = { socket: sockets.init() };

let socket = initialState.socket;
socket.on('connection', () => {
  console.log('Connected in room');
});

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {}
});
