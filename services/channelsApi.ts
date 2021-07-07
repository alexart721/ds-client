import { BASE_URL_SERVER_SIDE } from '.';
import { MyChannelState } from '../lib/redux/reducers';


export const addChannelsToUserApi = (newChannels: MyChannelState[], url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(url + '/users/channels/add', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ newChannels })
  });
};

export const removeChannelFromUserApi = (removeChannel: MyChannelState, url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(url + '/users/channels/:id', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ removeChannel })
  });
};

export const getSubscribeChannels = (url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(url + '/channels', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
  });
};
