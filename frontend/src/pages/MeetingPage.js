import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import MeetingSection from "../components/MeetingSection";
import ChatSection from "../components/ChatSection";

const MeetingPage = () => {
  const meetingId = useSelector((state) => state.app.meetingId);

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row", lg: "row" }}
    >
      <MeetingSection />
      <ChatSection />
    </Box>
  );
};

export default MeetingPage;
