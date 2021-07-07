import { BASE_URL, BASE_AUTH_URL } from '.';

export const getUserApi = (accessToken: string, userId: string): Promise<Response> => {
  return fetch(BASE_URL + `/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${accessToken}`
    },
  });
};

export const checkToken = (token: string, roles: string): Promise<Response> => {
  return fetch(BASE_AUTH_URL + '/checkAccess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ roles }),
  });
};

export const logoutUser = (): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_AUTH_URL + '/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
  });
};