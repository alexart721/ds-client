import { ChannelState } from './stateTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: ChannelState[] = [
  {
    id: '1',
    name: 'vascular',
    selected: false
  },
  {
    id: '2',
    name: 'cardiology',
    selected: false
  },
  {
    id: '3',
    name: 'hemotology',
    selected: false
  },
];

const addChannelsToUser = createAsyncThunk(
  'channels/addToUser',
  async (channelIds: ChannelState[], thunkAPI) => {
    // wait for and return response of new user object
  }
);

const removeChannelsFromUser = createAsyncThunk(
  'channels/removeFromUser',
  async (channelIds: ChannelState[], thunkAPI) => {
    // wait for and return reponse of new user object
  }
)

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
  // extraReducers: (builder) => {
  //   builder.addCase(addChannelsToUser.fulfilled, (state, action) => {
  //     state.concat(action.payload);
  //   })
  // }
});
