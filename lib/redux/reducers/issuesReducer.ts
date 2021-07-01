import { IssueState } from './stateTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IssueState[] = [
  {
    id: '1',
    title: 'Bleeding fingernails'
  },
  {
    id: '2',
    title: 'Varicose veins'
  },
  {
    id: '3',
    title: 'Arrhythmia'
  }
];

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    addIssue(state, action) {
      state.concat(action.payload);
    },
    closeIssue(state, action) {
      state.filter(issue => issue.id !== action.payload.id);
    }
  }
})
