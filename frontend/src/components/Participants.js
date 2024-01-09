import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi";

const Participants = () => {
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
          <MenuItem>User 1</MenuItem>
          <MenuItem>User 2</MenuItem>
          <MenuItem>User 3</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Participants;
