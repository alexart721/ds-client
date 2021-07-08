const { BASE_URL_SERVER_SIDE, BASE_AUTH_URL_SERVER_SIDE } = process.env;

export const getUserApi = (accessToken: string, userId: string,
  url: string = BASE_URL_SERVER_SIDE as string): Promise<Response> => fetch(`${url}/users/${userId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${accessToken}`,
  },
});

export const checkToken = (token: string, roles: string,
  url: string = BASE_AUTH_URL_SERVER_SIDE as string): Promise<Response> => fetch(`${url}/checkAccess`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  },
  body: JSON.stringify({ roles }),
});

export const logoutUser = (url: string = BASE_AUTH_URL_SERVER_SIDE as string)
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
