import { ChannelState } from "../lib/redux/reducers";

export const addChannelsToUser = (newChannels: ChannelState[]) => {
  let token = localStorage.getItem('accessToken');
  return fetch('url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify(newChannels)
  })
}