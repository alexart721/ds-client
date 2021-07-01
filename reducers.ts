import { Channel } from './interface';

const initialState: Channel[] = [
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

export const channelsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'channels/ADD':
      return state.concat(action.payload);
    case 'channels/REMOVE':
      const removeChannelIds = action.payload.map((channel: Channel) => channel.id);
      return state.filter((channel) => !removeChannelIds.includes(channel.id));
    default:
      return state;
  }
};
