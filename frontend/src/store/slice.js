import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  identity: "",
  isRoomHost: false,
  connectOnlyWithAudio: false,
};

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setIsRoomHost(state, action) {
      state.isRoomHost = action.payload.isRoomHost;
      // console.log(action.payload.isRoomHost);
    },
    setOnlyWithAudio(state, action) {
      state.connectOnlyWithAudio = action.payload.connectOnlyWithAudio;
      // console.log(action.payload.connectOnlyWithAudio);
    },
  },
});

export const actions = slice.actions;
export default slice;
