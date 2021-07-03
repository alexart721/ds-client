import { IssueState } from './stateTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: IssueState[] = [
  {
    id: '1',
    title: 'Bleeding fingernails',
  },
  {
    id: '2',
    title: 'Varicose veins',
  },
  {
    id: '3',
    title: 'Arrhythmia',
  }
];

const addIssueToChannel = createAsyncThunk(
  'issues/addToChannel',
  async (issue, (channelId: string)) => {

  }
);

const closeIssue = createAsyncThunk(
  'issues/close',
  async (issue) => {

  }
);

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
