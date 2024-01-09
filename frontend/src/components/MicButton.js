import { useState } from "react";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";

const MicButton = () => {
  const [micEnabled, setMicEnabled] = useState(false);

  return (
    <span onClick={() => setMicEnabled((prev) => !prev)}>
      {micEnabled ? (
        <AiOutlineAudio
          size={"1.5rem"}
          color="white"
          style={{ marginInline: "0.75rem", cursor: "pointer" }}
        />
      ) : (
        <AiOutlineAudioMuted
          size={"1.5rem"}
          color="white"
          style={{ marginInline: "0.75rem", cursor: "pointer" }}
        />
      )}
      {/* <Tooltip
        hasArrow
        placement="top"
        label={micEnabled ? "Turn off mic" : "Turn on mic"}
      ></Tooltip> */}
    </span>
  );
};

export default MicButton;
