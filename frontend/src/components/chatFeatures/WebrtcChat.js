import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MessageFeed from "./MessageFeed";
import MessageInput from "./MessageInput";
import { sendMessageWithWebRTC } from "../../utils/webRTC-Logic";

const WebrtcChat = () => {
  const { userId, webrtcMessages: messages } = useSelector(
    (state) => state.app
  );

  return (
    <Box
      mb={1}
      w="100%"
      h="100%"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
    >
      <Box
        p={1}
        mb={2}
        h={"93%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
      >
        <Box overflowY={"scroll"}>
          <MessageFeed messages={messages} loggedInUser={userId} />
        </Box>
      </Box>
      <MessageInput onSend={sendMessageWithWebRTC} />
    </Box>
  );
};

export default WebrtcChat;
