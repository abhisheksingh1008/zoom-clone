import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi";

const Participants = () => {
  const meetingParticipants = useSelector(
    (state) => state.app.meetingParticipants
  );

  return (
    <Box ml={3.5}>
      <Menu>
        <MenuButton
          as={Button}
          variant={"outline"}
          colorScheme="transparent"
          color="white"
          rightIcon={<HiChevronDown />}
        >
          Participants
        </MenuButton>
        <MenuList>
          {meetingParticipants.map((user) => (
            <MenuItem key={user.userId}>{user.userName}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Participants;
