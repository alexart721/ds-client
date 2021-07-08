import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types';

const initialState: UserState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  license: '',
  state: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      const addUser = action.payload;
      const newState = {
        ...state,
        ...addUser,
      };
      return newState;
    },
  },
});
