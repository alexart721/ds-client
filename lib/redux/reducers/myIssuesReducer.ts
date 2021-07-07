import { MyIssueState } from './stateTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as issuesApi from '../../../services/issuesApi';
import { Issue, IssueWithChannelId, User } from '../../../types';
import _ from 'lodash';

const initialState: MyIssueState[] = [];

export const addIssueToChannel = createAsyncThunk<MyIssueState | null, IssueWithChannelId>(
  'issues/addToChannel',
  async (issueWithChannel: IssueWithChannelId) => {
    const { channelId } = issueWithChannel;
    const issue = _.omit(issueWithChannel, ['channelId']);
    const newIssue: Issue = await issuesApi.addIssueToChannelApi(issue, channelId).then(res => res.json());
    let newIssueState: MyIssueState | null = null;
    if (newIssue) newIssueState = {
      id: newIssue._id as string,
      title: newIssue.title,
      channelName: newIssue.issueChannelName as string,
    }
    return newIssueState;
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
      return state.concat(action.payload);
    },
    closeIssue(state, action) {
      const sansRemovedIssueIds = action.payload.map((issue: MyIssueState) => issue.id);
      state.filter(issue => sansRemovedIssueIds.includes(issue.id));
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(addIssueToChannel.fulfilled, (state, action) => {
      if (action.payload) return state.concat([action.payload]);
    })
    .addCase(closeIssue.fulfilled, (state, action) => {
      const sansRemovedIssueIds = action.payload.map((issue: MyIssueState) => issue.id);
      state.filter(issue => sansRemovedIssueIds.includes(issue.id));
    })
  }
});
