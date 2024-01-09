import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CameraButton from "./CameraButton";
import LeaveCallButton from "./LeaveCallButton";
import MicButton from "./MicButton";
import Participants from "./Participants";
import ScreenShareButton from "./ScreenShareButton";

const MeetingOptions = () => {
  const meetingId = useSelector((state) => state.app.meetingId);

  return (
    <Box
      py={3}
      px={2.5}
      w={"100%"}
      bg={"#0078FF"}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize="1.5rem" fontWeight="bolder" color="white">
        Meeting ID : {meetingId}
      </Text>
      <Box display="flex" alignItems="center">
        <CameraButton />
        <ScreenShareButton />
        <MicButton />
        <LeaveCallButton />
        <Participants />
      </Box>
    </Box>
  );
};

export default MeetingOptions;
