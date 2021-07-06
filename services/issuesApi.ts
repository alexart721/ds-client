import { BASE_AUTH_URL, BASE_URL } from '.';
import { Issue } from '../types';

export const getChannelIssuesApi = (channelId: string): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + `/channels/${channelId}/issues`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
  });
};

export const addIssueToChannelApi = (newIssue: Issue, channelId: string): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  // return fetch(BASE_URL + `/channels/${channelId}/issues`, {
  //   mode: 'no-cors',
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
  //     'Content-Type': 'multipart/form-data',
  //     'Authorization': `Bearer: ${token}`
  //   },
  //   body: JSON.stringify({ newIssue })
  // });
  const formData = new FormData();
  let key: keyof typeof newIssue; 
  for(key in newIssue) {
    formData.append(key, JSON.stringify(newIssue[key]))
  }
  return fetch (BASE_URL + `/channels/${channelId}/issues`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
    body: formData,
  })
};

export const addIssueToUserApi = (newIssue: Issue): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + '/users/issues/add', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ newIssue })
  });
};

export const closeIssueApi = (closedIssue: Issue): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + `/issues/${closedIssue._id}/resolve`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ closedIssue })
  });
};

export const archiveIssueApi = (archivedIssue: Issue, channelId: string): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + `/channels/${channelId}/issues`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ archivedIssue })
  });
};

export const updateUserIssueMetaApi = (issueToRemove: Issue): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(BASE_URL + '/users/issues/remove', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ issueToRemove })
  });
};
