import { Channel, Action } from './interface';

export const addChannel = (newChannels: Array<Channel>): Action => ({
  type: 'channels/ADD',
  payload: newChannels
});

export const removeChannel = (newChannels: Array<Channel>): Action => ({
  type: 'channels/REMOVE',
  payload: newChannels
});
