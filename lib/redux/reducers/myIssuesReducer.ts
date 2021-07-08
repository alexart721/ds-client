/* eslint-disable prefer-destructuring */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as issuesApi from '../../../services/issuesApi';
import { Issue, IssueWithChannelId, User, MyIssueState } from '../../types';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const initialState: MyIssueState[] = [];

export const addIssueToChannel = createAsyncThunk<MyIssueState | null, IssueWithChannelId>(
  'issues/addToChannel',
  async (issueWithChannel: IssueWithChannelId) => {
    const { channelId } = issueWithChannel;
    const issue = _.omit(issueWithChannel, ['channelId']);
    const newIssue: Issue = await issuesApi
      .addIssueToChannelApi(issue, channelId, NEXT_PUBLIC_BASE_URL).then((res) => res.json());
    let newIssueState: MyIssueState | null = null;
    if (newIssue) {
      newIssueState = {
        id: newIssue._id as string,
        title: newIssue.title,
        channelName: newIssue.issueChannelName as string,
      };
    }
    return newIssueState;
  },
);

export const closeIssue = createAsyncThunk(
  'issues/close',
  async (closingIssueWithChannel: IssueWithChannelId) => {
    const { channelId } = closingIssueWithChannel;
    const closingIssue = _.omit(closingIssueWithChannel, ['channelId']);
    await issuesApi.closeIssueApi(closingIssue, NEXT_PUBLIC_BASE_URL).then((res) => res.json());
    await issuesApi
      .archiveIssueApi(closingIssue, channelId, NEXT_PUBLIC_BASE_URL).then((res) => res.json());
    const userWithoutIssue: User = await issuesApi
      .updateUserIssueMetaApi(closingIssue).then((res) => res.json());
    return userWithoutIssue.issueMeta;
    // Add to archive state, when written
  },
);

export const myIssuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    addIssue(state, action) {
      const stateIssueIds = state.map((issue: MyIssueState) => issue.id);
      const newIssues = action.payload
        .filter((issue: MyIssueState) => !stateIssueIds.includes(issue.id));
      return state.concat(newIssues);
    },
    closeIssue(state, action) {
      const sansRemovedIssueIds = action.payload.map((issue: MyIssueState) => issue.id);
      return state.filter((issue) => sansRemovedIssueIds.includes(issue.id));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addIssueToChannel.fulfilled, (state, action) => {
        if (action.payload) return state.concat([action.payload]);
        return state;
      })
      .addCase(closeIssue.fulfilled, (state, action) => {
        const sansRemovedIssueIds = action.payload.map((issue: MyIssueState) => issue.id);
        return state.filter((issue) => sansRemovedIssueIds.includes(issue.id));
      });
  },
});
