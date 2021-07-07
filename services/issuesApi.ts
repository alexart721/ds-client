import { BASE_URL_SERVER_SIDE } from '.';
import { Issue } from '../types';

export const getChannelIssuesApi = (channelId: string, url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(url + `/channels/${channelId}/issues`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
  });
};

export const getIssueByIdApi = (issueId: string, url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(url + `/issues/${issueId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
  });
};

export const addIssueToChannelApi = (newIssue: Issue, channelId: string, url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  const formData = new FormData();
  formData.append('title',newIssue.title);
  formData.append('patientAge',`${newIssue.patientAge}`);
  formData.append('priority',newIssue.priority);
  formData.append('patientGender',newIssue.patientGender);
  formData.append('patientMedications',newIssue.patientMedications);
  formData.append('patientMedicalIssues',newIssue.patientMedicalIssues);
  formData.append('temperature',newIssue.patientVitals.temperature);
  formData.append('heartRate',newIssue.patientVitals.heartRate);
  formData.append('bloodPressure',newIssue.patientVitals.bloodPressure);
  if (newIssue.issueDescription) formData.append('issueDescription',newIssue.issueDescription);
  if (newIssue.imageFile) formData.append('image', newIssue.imageFile.file.originFileObj);
  return fetch (url + `/channels/${channelId}/issues`, {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
      'Authorization': `Bearer: ${token}`,
    },
    body: formData,
  })
};

export const addIssueToUserApi = (newIssue: Issue, url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(url + '/users/issues/add', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ newIssue })
  });
};

export const closeIssueApi = (closedIssue: Issue, url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(url + `/issues/${closedIssue._id}/resolve`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ closedIssue })
  });
};

export const archiveIssueApi = (archivedIssue: Issue, channelId: string, url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(url + `/channels/${channelId}/issues`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ archivedIssue })
  });
};

export const updateUserIssueMetaApi = (issueToRemove: Issue, url: string = BASE_URL_SERVER_SIDE): Promise<Response> => {
  let token = localStorage.getItem('accessToken');
  return fetch(url + '/users/issues/remove', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
    },
    body: JSON.stringify({ issueToRemove })
  });
};
