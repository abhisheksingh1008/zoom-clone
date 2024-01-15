import { Box, Text } from "@chakra-ui/react";

const MessageItem = ({ messageData, isSelfMessage, isFirstMessage }) => {
  return (
    <Box
      m={1}
      display="flex"
      justifyContent={isSelfMessage ? "flex-end" : "flex-start"}
    >
      <Box>
        {isFirstMessage && (
          <Text>{isSelfMessage ? "You" : messageData.userName}</Text>
        )}
        <Text
          px={2.5}
          py={1.5}
          borderRadius="md"
          color={isSelfMessage ? "white" : "black"}
          bg={isSelfMessage ? "#0078FF" : "gray.200"}
        >
          {messageData.messageContent}
        </Text>
      </Box>
    </Box>
  );
};

export default MessageItem;
