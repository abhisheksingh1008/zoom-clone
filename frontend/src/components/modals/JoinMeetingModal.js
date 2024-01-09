import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
  useToast,
} from "@chakra-ui/react";
import { actions } from "../../store/slice";

const JoinMeetingModal = ({ children }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isRoomHost = useSelector((state) => state.app.isRoomHost);

  const [meetingDetails, setMeetingDetails] = useState({
    name: "",
    ...(!isRoomHost && { meetingId: "" }),
    joining: false,
  });

  const inputChangeHandler = (e) => {
    setMeetingDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const closeModalHandler = () => {
    setMeetingDetails({ name: "", ...(!isRoomHost && { meetingId: "" }) });
    onClose();
  };

  const joinMeetingHandler = async () => {
    setMeetingDetails((prev) => {
      return {
        ...prev,
        joining: true,
      };
    });

    if (!isRoomHost) {
      await axios
        .get(`/api/room/${meetingDetails.meetingId}`)
        .then((res) => {
          // console.log(res.data);
          if (res.data.roomExists) {
            if (res.data.roomIsFull) {
              toast({
                title: "Meeting is full!",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            } else {
              dispatch(actions.setIdentity({ identity: meetingDetails.name }));
              dispatch(
                actions.setMeetingId({ meetingId: meetingDetails.meetingId })
              );
              navigate(`/${meetingDetails.meetingId}`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: err.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      // send new meeting req to backend and from the backend itself redirect the user to /meeting/:meetingId page
    }

    setMeetingDetails((prev) => {
      return {
        ...prev,
        joining: false,
      };
    });
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {isRoomHost ? "Host" : "Join"} meeting
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!isRoomHost && (
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
              onClick={joinMeetingHandler}
              isLoading={meetingDetails.joining}
              loadingText="Joining..."
            >
              Join
            </Button>
            <Button
              colorScheme="blue"
              variant={"ghost"}
              onClick={closeModalHandler}
              isLoading={meetingDetails.joining}
              loadingText=""
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
