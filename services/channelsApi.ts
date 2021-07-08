/* eslint-disable prefer-destructuring */
import { MyChannelState } from '../lib/types';

const NEXT_PUBLIC_BASE_URL_SERVER_SIDE = process.env.NEXT_PUBLIC_BASE_URL_SERVER_SIDE;

export const addChannelsToUserApi = (newChannels: MyChannelState[],
  url: string = NEXT_PUBLIC_BASE_URL_SERVER_SIDE as string): Promise<Response> => {
  const token = localStorage.getItem('accessToken');
  return fetch(`${url}/users/channels/add`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer: ${token}`,
    },
    body: JSON.stringify({ newChannels }),
  });
};

export const removeChannelFromUserApi = (removeChannel: MyChannelState,
  url: string = NEXT_PUBLIC_BASE_URL_SERVER_SIDE as string): Promise<Response> => {
  const token = localStorage.getItem('accessToken');
  return fetch(`${url}/users/channels/:id`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer: ${token}`,
    },
    body: JSON.stringify({ removeChannel }),
  });
};

export const getSubscribeChannels = (url: string = NEXT_PUBLIC_BASE_URL_SERVER_SIDE as string)
: Promise<Response> => {
  const token = localStorage.getItem('accessToken');
  return fetch(`${url}/channels`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer: ${token}`,
    },
  });
};
