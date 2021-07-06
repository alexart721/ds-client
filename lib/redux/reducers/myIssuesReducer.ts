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

export const addIssueToChannel = createAsyncThunk<MyIssueState[], IssueWithChannelId>(
  'issues/addToChannel',
  async (issueWithChannel: IssueWithChannelId) => {
    console.log('issueWithChannel: ', issueWithChannel);

    const { channelId } = issueWithChannel;
    const issue = _.omit(issueWithChannel, ['channelId']);
    console.log('issue: ', issue);

    const newIssue: Issue = await issuesApi.addIssueToChannelApi(issue, channelId).then(res => res.json());
    const userWithIssue: User = await issuesApi.addIssueToUserApi(newIssue).then(res => res.json());
    console.log('userWithIssue: ', userWithIssue);

    return userWithIssue.issueMeta;
  }
);

export const closeIssue = createAsyncThunk(
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
      const stateIssueIds = state.map((issue: MyIssueState) => issue.id);
      const newIssues = action.payload.filter((issue: MyIssueState) => !stateIssueIds.includes(issue.id));
      return state.concat(newIssues);
    },
    closeIssue(state, action) {
      const sansRemovedIssueIds = action.payload.map((issue: MyIssueState) => issue.id);
      state.filter(issue => sansRemovedIssueIds.includes(issue.id));
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addIssueToChannel.fulfilled, (state, action) => {
      console.log('action.payload: ', action.payload);

      const stateIssueIds = state.map((issue: MyIssueState) => issue.id);
      const newIssues = action.payload.filter((issue: MyIssueState) => !stateIssueIds.includes(issue.id));
      return state.concat(newIssues);
    })
    .addCase(closeIssue.fulfilled, (state, action) => {
      const sansRemovedIssueIds = action.payload.map((issue: MyIssueState) => issue.id);
      state.filter(issue => sansRemovedIssueIds.includes(issue.id));
    })
  }
})
