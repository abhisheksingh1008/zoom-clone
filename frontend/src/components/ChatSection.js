import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SocketIoChat from "./chatFeatures/SocketIoChat";
import WebrtcChat from "./chatFeatures/WebrtcChat";

const ChatSection = () => {
  return (
    <Box
      h={"100dvh"}
      w={{ base: "100vw", md: "36vw", lg: "32vw" }}
      textAlign="center"
      border="2px"
    >
      <Tabs isFitted h={"100%"}>
        <TabList>
          <Tab fontWeight="bold" fontSize="1.2rem">
            WebRTC chat
          </Tab>
          <Tab fontWeight="bold" fontSize="1.2rem">
            Socket.io chat
          </Tab>
        </TabList>
        <TabPanels h={"93%"}>
          <TabPanel px={0} h={"100%"}>
            <WebrtcChat />
          </TabPanel>
          <TabPanel>
            <SocketIoChat />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ChatSection;
