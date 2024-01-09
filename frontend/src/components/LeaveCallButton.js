import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdCallEnd } from "react-icons/md";
import { actions } from "../store/slice";

const LeaveCallButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const leaveCallHandler = () => {
    dispatch(actions.setIdentity({ identity: "" }));
    dispatch(actions.setMeetingId({ meetingId: null }));
    dispatch(actions.setOnlyWithAudio({ connectOnlyWithAudio: false }));
    navigate("/");
  };

  return (
    <Box
      py={1.5}
      px={3}
      ml={1}
      bg="red"
      color="white"
      fontSize="1.1rem"
      fontWeight="bold"
      cursor="pointer"
      display="flex"
      alignItems="center"
      borderRadius="20px"
      onClick={leaveCallHandler}
    >
      <MdCallEnd size={"1.5rem"} style={{ marginRight: "6px" }} />
      Leave
    </Box>
  );
};

export default LeaveCallButton;
