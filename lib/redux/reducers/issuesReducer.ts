import { IssueState } from './stateTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IssueState[] = [
  {
    id: '1',
    title: 'Bleeding fingernails',
    expanded: false
  },
  {
    id: '2',
    title: 'Varicose veins',
    expanded: false
  },
  {
    id: '3',
    title: 'Arrhythmia',
    expanded: false
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
