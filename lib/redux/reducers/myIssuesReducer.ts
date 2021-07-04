import { MyIssueState } from './stateTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as issuesApi from '../../../services/issuesApi';
import { Issue, IssueWithChannelId, User } from '../../../types';
import _ from 'lodash';

// const initialState: MyIssueState[] = [
//   {
//     id: '1',
//     title: 'Bleeding fingernails',
//   },
//   {
//     id: '2',
//     title: 'Varicose veins',
//   },
//   {
//     id: '3',
//     title: 'Arrhythmia',
//   }
// ];

const initialState: MyIssueState[] = [];

const addIssueToChannel = createAsyncThunk<MyIssueState[], IssueWithChannelId>(
  'issues/addToChannel',
  async (issueWithChannel: IssueWithChannelId) => {
    const { channelId } = issueWithChannel;
    const issue = _.omit(issueWithChannel, ['channelId']);
    const newIssue: Issue = await issuesApi.addIssueToChannelApi(issue, channelId).then(res => res.json());
    const userWithIssue: User = await issuesApi.addIssueToUserApi(newIssue).then(res => res.json());
    return userWithIssue.issueMeta;
  }
);

const closeIssue = createAsyncThunk(
  'issues/close',
  async (closingIssueWithChannel: IssueWithChannelId) => {
    const { channelId } = closingIssueWithChannel;
    const closingIssue = _.omit(closingIssueWithChannel, ['channelId']);
    await issuesApi.closeIssueApi(closingIssue).then(res => res.json());
    await issuesApi.archiveIssueApi(closingIssue, channelId).then(res => res.json());
    const userWithoutIssue: User = await issuesApi.updateUserIssueMetaApi(closingIssue).then(res => res.json());
    return userWithoutIssue.issueMeta;
    // Add to archive state, when written
  }
);

export const myIssuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    addIssue(state, action) {
      state.concat(action.payload);
    },
    closeIssue(state, action) {
      state.filter(issue => issue.id !== action.payload.id);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addIssueToChannel.fulfilled, (state, action) => {
      state.concat(action.payload);
    })
    .addCase(closeIssue.fulfilled, (state, action) => {
      const removeIssueIds = action.payload.map((issue: MyIssueState) => issue.id);
      state.filter(issue => !removeIssueIds.includes(issue.id));
    })
  }
})
