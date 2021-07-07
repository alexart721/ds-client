import { MyChannelState } from './stateTypes';
import { User } from '../../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addChannelsToUserApi, BASE_URL, removeChannelFromUserApi } from '../../../services';
import _ from 'lodash';

const initialState: MyChannelState[] = [];

// For admin: add channel

export const addChannelsToUser = createAsyncThunk<MyChannelState[], MyChannelState[]>(
  'channels/addToUser',
  async (channels: MyChannelState[]) => {
    const channelsAdded: User = await addChannelsToUserApi(channels, BASE_URL).then(res => res.json());
    return channelsAdded.channels;
  }
);

export const removeChannelFromUser = createAsyncThunk<MyChannelState[], MyChannelState>(
  'channels/removeFromUser',
  async (channel: MyChannelState) => {
    const channelsRemoved: User = await removeChannelFromUserApi(channel, BASE_URL).then(res => res.json());
    return channelsRemoved.channels;
  }
);

export const myChannelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, action) {
      const stateChannelIds = state.map((channel: MyChannelState) => channel.id);
      const newChannels = action.payload.filter((channel: MyChannelState) => !stateChannelIds.includes(channel.id));
      return state.concat(newChannels);
    },
    removeChannel(state, action) {
      const sansRemovedChannelIds = action.payload.map((channel: MyChannelState) => channel.id);
      return state.filter(channel => sansRemovedChannelIds.includes(channel.id));
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addChannelsToUser.fulfilled, (state, action) => {
      const stateChannelIds = state.map((channel: MyChannelState) => channel.id);
      const newChannels = action.payload.filter((channel: MyChannelState) => !stateChannelIds.includes(channel.id));
      return state.concat(newChannels);
    })
    .addCase(removeChannelFromUser.fulfilled, (state, action) => {
      const sansRemovedChannelIds = action.payload.map((channel: MyChannelState) => channel.id);
      return state.filter(channel => sansRemovedChannelIds.includes(channel.id));
    })
  }
});
