import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Checkbox,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { actions } from "../../store/slice";

const JoinMeetingModal = ({ children, isHost }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [meetingDetails, setMeetingDetails] = useState({
    name: "",
    ...(!isHost && { meetingId: "" }),
  });

  const inputChangeHandler = (e) => {
    setMeetingDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const closeModalHandler = () => {
    setMeetingDetails({ name: "", ...(!isHost && { meetingId: "" }) });
    onClose();
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {isHost ? "Host" : "Join"} meeting
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!isHost && (
              <>
                <FormLabel>Meeting id :</FormLabel>
                <Input
                  mb={4}
                  name="meetingId"
                  placeholder="Enter meeting id"
                  value={meetingDetails.meetingId}
                  onChange={inputChangeHandler}
                />
              </>
            )}
            <FormLabel>Name :</FormLabel>
            <Input
              name="name"
              placeholder="Enter your name"
              value={meetingDetails.name}
              onChange={inputChangeHandler}
            />
            <Checkbox
              mt={4}
              colorScheme="blue"
              onChange={(e) => {
                dispatch(
                  actions.setOnlyWithAudio({
                    connectOnlyWithAudio: e.target.checked,
                  })
                );
              }}
            >
              Only audio
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                dispatch(
                  actions.setIsRoomHost({ isRoomHost: isHost ? true : false })
                )
              }
            >
              Join
            </Button>
            <Button
              colorScheme="blue"
              variant={"ghost"}
              onClick={closeModalHandler}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinMeetingModal;
