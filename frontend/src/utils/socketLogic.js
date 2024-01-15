import { io } from "socket.io-client";
import store from "../store/index";
import { actions } from "../store/slice";
import * as webRTC from "./webRTC-Logic";

let socket = null;

export const connectWithSocketIoServer = () => {
  socket = io(process.env.REACT_APP_BACKEND_ENDPOINT, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    // console.log("Connected to socket.io server : ", socket.id);
  });

  socket.on("new-meeting-created", ({ meeting }) => {
    // console.log(meeting);
    store.dispatch(actions.setMeetingId({ meetingId: meeting.id }));
    store.dispatch(
      actions.setMeetingParticipants({ connectedUsers: meeting.connectedUsers })
    );
  });

  socket.on("meeting-joined", ({ meeting }) => {
    // console.log(meeting);
    store.dispatch(actions.setMeetingId({ meetingId: meeting.id }));
    store.dispatch(
      actions.setMeetingParticipants({ connectedUsers: meeting.connectedUsers })
    );
  });

  socket.on("room-update", ({ meeting }) => {
    // console.log(meeting);
    store.dispatch(
      actions.setMeetingParticipants({ connectedUsers: meeting.connectedUsers })
    );
  });

  socket.on("user-disconnected", ({ disconnectedUser }) => {
    // console.log(disconnectedUser);
    webRTC.removePeerConnection(disconnectedUser);
  });

  socket.on("invalid-meeting-id", ({ message }) => {
    console.log(message);
    store.dispatch(actions.setErrorMessage({ message }));
  });

  socket.on("prepare-webrtc-conn", ({ newUserSocketId, isInitiator }) => {
    webRTC.prepareNewPeerConnection(newUserSocketId, isInitiator);
    // inform the new joined user we have successfully prepared for the webrtc coneection and now we are ready to initialize it
    socket.emit("init-webrtc-connection", { connectToUser: newUserSocketId });
  });

  socket.on("connection-signal", (signalData) => {
    webRTC.handleSignaling(signalData);
  });

  socket.on("init-webrtc-connection", ({ connectToUser }) => {
    webRTC.prepareNewPeerConnection(connectToUser, true);
  });
};

export const createNewMeeting = (userId, hostUserName) => {
  socket.emit("create-new-meeting", { userId, userName: hostUserName });
};

export const joinMeeting = (userId, userName, meetingId, onlyAudio) => {
  socket.emit("join-meeting", {
    userInfo: { userId, userName },
    meetingId,
    onlyAudio,
  });
};

export const leaveMeetingHandler = (userInfo, meetingId) => {
  socket.emit("leave-meeting", { userInfo, meetingId });
};

export const signalPeerDataForConnection = (signalData) => {
  socket.emit("connection-signal", signalData);
};
