import { ChannelState } from './stateTypes';
import { User } from '../../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addChannelsToUserApi, removeChannelFromUserApi } from '../../../services';

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

const addChannelsToUser = createAsyncThunk<ChannelState[], ChannelState[]>(
  'channels/addToUser',
  async (channels: ChannelState[]) => {
    const channelsAdded: User = await addChannelsToUserApi(channels).then(res => res.json());
    return channelsAdded.channels;
  }
);

const removeChannelFromUser = createAsyncThunk<ChannelState[], ChannelState>(
  'channels/removeFromUser',
  async (channel: ChannelState) => {
    const channelsRemoved: User = await removeChannelFromUserApi(channel).then(res => res.json());
    return channelsRemoved.channels;
  }
);

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
  },
  extraReducers: (builder) => {
    builder
    .addCase(addChannelsToUser.fulfilled, (state, action) => {
      state.concat(action.payload);
    })
    .addCase(removeChannelFromUser.fulfilled, (state, action) => {
      const removeChannelIds = action.payload.map((channel: ChannelState) => channel.id);
      state.filter(channel => !removeChannelIds.includes(channel.id));
    })
  }
});
