import { MyChannelState } from './stateTypes';
import { User } from '../../../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addChannelsToUserApi, removeChannelFromUserApi } from '../../../services';

// const initialState: MyChannelState[] = [
//   {
//     id: '1',
//     name: 'vascular'
//   },
//   {
//     id: '2',
//     name: 'cardiology'
//   },
//   {
//     id: '3',
//     name: 'hemotology'
//   },
// ];
const initialState: MyChannelState[]=[]

// For admin: add channel

const addChannelsToUser = createAsyncThunk<MyChannelState[], MyChannelState[]>(
  'channels/addToUser',
  async (channels: MyChannelState[]) => {
    const channelsAdded: User = await addChannelsToUserApi(channels).then(res => res.json());
    return channelsAdded.channels;
  }
);

const removeChannelFromUser = createAsyncThunk<MyChannelState[], MyChannelState>(
  'channels/removeFromUser',
  async (channel: MyChannelState) => {
    const channelsRemoved: User = await removeChannelFromUserApi(channel).then(res => res.json());
    return channelsRemoved.channels;
  }
);

export const myChannelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel(state, action) {
      state.concat(action.payload);
    },
    removeChannel(state, action) {
      const removeChannelIds = action.payload.map((channel: MyChannelState) => channel.id);
      state.filter(channel => !removeChannelIds.includes(channel.id));
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addChannelsToUser.fulfilled, (state, action) => {
      state.concat(action.payload);
    })
    .addCase(removeChannelFromUser.fulfilled, (state, action) => {
      const removeChannelIds = action.payload.map((channel: MyChannelState) => channel.id);
      state.filter(channel => !removeChannelIds.includes(channel.id));
    })
  }
});
