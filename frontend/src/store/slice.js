import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  identity: "",
  meetingId: null,
  isRoomHost: false,
  connectOnlyWithAudio: false,
};

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setIdentity(state, action) {
      state.identity = action.payload.identity;
      // console.log(action.payload.identity);
    },
    setMeetingId(state, action) {
      state.meetingId = action.payload.meetingId;
      // console.log(action.payload.meetingId);
    },
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
