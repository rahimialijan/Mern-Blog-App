import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  isUserLoggedin: boolean;
  currentUser: {
    _id: string | null;
    email: string | null;
    username: string | null;
    profilePicture: string | null;
  };
  loading: boolean;
  error: string | null;
}

const initialState: IinitialState = {
  isUserLoggedin: false,
  currentUser: {
    _id: null,
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
      state.isUserLoggedin = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //update user profile
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions;
export default userSlice.reducer;
