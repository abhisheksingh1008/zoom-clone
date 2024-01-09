import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const ChatSection = () => {
  return (
    <Box
      h={"100dvh"}
      w={{ base: "100vw", md: "36vw", lg: "32vw" }}
      textAlign="center"
      border="2px"
    >
      <Tabs isFitted>
        <TabList>
          <Tab fontWeight="bold" fontSize="1.2rem">
            WebRTC chat
          </Tab>
          <Tab fontWeight="bold" fontSize="1.2rem">
            Socket.io chat
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>WebRTC messages here</p>
          </TabPanel>
          <TabPanel>
            <p>Socket.io messages here</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ChatSection;
