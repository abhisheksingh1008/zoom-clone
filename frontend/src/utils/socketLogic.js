import { io } from "socket.io-client";
import store from "../store/index";
import { actions } from "../store/slice";

let socket = null;

export const connectWithSocketIoServer = () => {
  socket = io(process.env.REACT_APP_BACKEND_ENDPOINT, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected to socket.io server : ", socket.id);
  });

  socket.on("new-meeting-created", ({ meeting }) => {
    console.log(meeting);
    store.dispatch(actions.setMeetingId({ meetingId: meeting.id }));
    store.dispatch(
      actions.setMeetingParticipants({ connectedUsers: meeting.connectedUsers })
    );
  });

  socket.on("meeting-joined", ({ meeting }) => {
    console.log(meeting);
    store.dispatch(actions.setMeetingId({ meetingId: meeting.id }));
    store.dispatch(
      actions.setMeetingParticipants({ connectedUsers: meeting.connectedUsers })
    );
  });

  socket.on("room-update", ({ meeting }) => {
    // if (store.app.meetingId === meeting.meetingId) {}
    console.log(meeting);
    store.dispatch(
      actions.setMeetingParticipants({ connectedUsers: meeting.connectedUsers })
    );
  });

  socket.on("invalid-meeting-id", ({ message }) => {
    console.log(message);
    store.dispatch(actions.setErrorMessage({ message }));
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

export const leaveMeeting = () => {};
