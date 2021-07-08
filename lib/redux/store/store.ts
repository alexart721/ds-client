import { configureStore } from '@reduxjs/toolkit';
import { myIssuesSlice, myChannelsSlice, userSlice, socketSlice } from '../reducers';

export const store = configureStore({
  reducer: {
    channels: myChannelsSlice.reducer,
    issues: myIssuesSlice.reducer,
    user: userSlice.reducer,
    socket: socketSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
