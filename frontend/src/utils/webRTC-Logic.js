import * as socket from "./socketLogic";

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
  userId,
  userName,
  audioOnly,
  isRoomHost,
  meetingId = null
) => {
  const config = { audio: true, camera: audioOnly ? false : true };
  console.log(config);

  await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      camera: audioOnly ? false : true,
    })
    .then((stream) => {
      localStream = stream;

      isRoomHost
        ? socket.createNewMeeting(userId, userName)
        : socket.joinMeeting(userId, userName, meetingId, audioOnly);
    })
    .catch((err) => {
      console.log(err);
    });
};
