import { BASE_URL } from '.';
import { MyChannelState } from '../lib/redux/reducers';


export const addChannelsToUserApi = (newChannels: MyChannelState[]): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + '/users/channels/add', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ newChannels })
  });
};

export const removeChannelFromUserApi = (removeChannel: MyChannelState): Promise<Response> => {
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

export const getSubscribeChannels = (): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + '/channels', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
  });
};
