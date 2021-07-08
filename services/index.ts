<<<<<<< HEAD
// export const BASE_URL = 'http://localhost/api';
// export const BASE_AUTH_URL = 'http://localhost/auth';
// export const BASE_CLIENT_URL = 'http://localhost';
// export const BASE_CLIENT_URL_SOCKET = 'http://localhost';
// export const BASE_AUTH_URL_SERVER_SIDE = 'http://auth:4002';
// export const BASE_URL_SERVER_SIDE = 'http://server:4000';
export const BASE_URL = 'http://localhost:4000';
export const BASE_AUTH_URL = 'http://localhost:4002';
export const BASE_CLIENT_URL = 'http://localhost:3001';
export const BASE_CLIENT_URL_SOCKET = 'http://localhost:4000';
export const BASE_AUTH_URL_SERVER_SIDE = 'http://localhost:4002';
export const BASE_URL_SERVER_SIDE = 'http://localhost:4000';

export * from './channelsApi';
export * from './issuesApi';
export * from './usersApi';
=======
// export const NEXT_PUBLIC_BASE_URL = 'http://localhost:4000';
// export const NEXT_PUBLIC_BASE_AUTH_URL = 'http://localhost:4002';
// export const NEXT_PUBLIC_BASE_CLIENT_URL = 'http://localhost:3001';
// export const NEXT_PUBLIC_BASE_CLIENT_URL_SOCKET = 'http://localhost:4000';
// export const NEXT_PUBLIC_BASE_AUTH_URL_SERVER_SIDE = 'http://localhost:4002';
// export const NEXT_PUBLIC_BASE_URL_SERVER_SIDE = 'http://localhost:4000';
export { addChannelsToUserApi, getSubscribeChannels, removeChannelFromUserApi } from './channelsApi';
export { addIssueToChannelApi, addIssueToUserApi, archiveIssueApi, closeIssueApi, getChannelIssuesApi, getIssueByIdApi, updateUserIssueMetaApi } from './issuesApi';
export { checkToken, logoutUser } from './usersApi';
>>>>>>> main
