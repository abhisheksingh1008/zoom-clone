import { useState } from "react";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";

const ScreenShareButton = () => {
  const [screenshareEnabled, setScreenshareEnabled] = useState(false);

  return (
    <span onClick={() => setScreenshareEnabled((prev) => !prev)}>
      {screenshareEnabled ? (
        <LuScreenShare
          size={"1.5rem"}
          color="white"
          style={{ marginInline: "0.75rem", cursor: "pointer" }}
        />
      ) : (
        <LuScreenShareOff
          size={"1.5rem"}
          color="white"
          style={{ marginInline: "0.75rem", cursor: "pointer" }}
        />
      )}
    </span>
  );
};

export default ScreenShareButton;
