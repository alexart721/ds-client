export const addChannel = (newChannels: Array<object>) => ({
  type: 'channels/ADD',
  payload: newChannels 
})