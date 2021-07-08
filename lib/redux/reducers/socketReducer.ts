import { createSlice } from '@reduxjs/toolkit';
import { SocketState } from '../../types';
import sockets from '../../../sockets';

const initialState: {
  socket: SocketState
} = { socket: sockets.init() };

const { socket } = initialState;
socket.on('connection', () => {});

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
});
