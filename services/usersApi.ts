/* eslint-disable prefer-destructuring */
const NEXT_PUBLIC_BASE_URL_SERVER_SIDE = process.env.NEXT_PUBLIC_BASE_URL_SERVER_SIDE;
const NEXT_PUBLIC_BASE_AUTH_URL_SERVER_SIDE = process.env.NEXT_PUBLIC_BASE_AUTH_URL_SERVER_SIDE;

console.log(NEXT_PUBLIC_BASE_AUTH_URL_SERVER_SIDE);

export const getUserApi = (accessToken: string, userId: string,
  url: string = NEXT_PUBLIC_BASE_URL_SERVER_SIDE as string): Promise<Response> => fetch(`${url}/users/${userId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${accessToken}`,
  },
});

export const checkToken = (token: string, roles: string,
  url: string = NEXT_PUBLIC_BASE_AUTH_URL_SERVER_SIDE as string): Promise<Response> => fetch(`${url}/checkAccess`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  },
  body: JSON.stringify({ roles }),
});

export const logoutUser = (url: string = NEXT_PUBLIC_BASE_AUTH_URL_SERVER_SIDE as string)
: Promise<Response> => {
  const token = localStorage.getItem('accessToken');
  return fetch(`${url}/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer: ${token}`,
    },
  });
};
