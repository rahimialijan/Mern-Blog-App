import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  currentUser: {
    id: string | null;
    email: string | null;
    username: string | null;
    profilePicture: string | null;
  } ;
  loading: boolean;
  error: string | null;
}

const initialState: IinitialState = {
  currentUser: {
    id: null,
    email: null,
    username: null,
    profilePicture: null,
  },
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // login
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
