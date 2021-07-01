import { ChannelState } from './stateTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ChannelState[] = [
  {
    id: '1',
    name: 'vascular'
  },
  {
    id: '2',
    name: 'cardiology'
  },
  {
    id: '3',
    name: 'hemotology'
  },
];

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, action) {
      state.concat(action.payload);
    },
    removeChannel(state, action) {
      const removeChannelIds = action.payload.map((channel: ChannelState) => channel.id);
      state.filter(channel => !removeChannelIds.includes(channel.id));
    }
  }
});
