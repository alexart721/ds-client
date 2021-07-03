import { BASE_URL } from '.';
import { ChannelState } from '../lib/redux/reducers';


export const addChannelsToUserApi = (newChannels: ChannelState[]): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + '/users/channels/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ newChannels })
  });
};

export const removeChannelFromUserApi = (removeChannel: ChannelState): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + '/users/channels/:id', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ removeChannel })
  });
};
