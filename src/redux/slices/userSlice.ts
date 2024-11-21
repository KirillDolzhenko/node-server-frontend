import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../../types/redux.types";
import { IUserWithToken } from "../../types/entities.types";

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserWithToken>) => {
      localStorage.setItem("token", action.payload.token);

      state.user = action.payload;
    },
    changeUsersInfo: (state, action: PayloadAction<IUserWithToken>) => {
      state.user = {
        ...action.payload,
        token: state.user?.token || "",
      };
    },
    removeUser: (state) => {
      localStorage.removeItem("token");

      state.user = null;
    },
  },
});

export const { setUser, changeUsersInfo, removeUser } = userSlice.actions;

export default userSlice.reducer;
