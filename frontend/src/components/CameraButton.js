import { useState } from "react";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";

const CameraButton = () => {
  const [cameraEnabled, setCameraEnabled] = useState(false);

  return (
    <span onClick={() => setCameraEnabled((prev) => !prev)}>
      {cameraEnabled ? (
        <BsCameraVideo
          size={"1.8rem"}
          color="white"
          style={{ marginInline: "0.75rem", cursor: "pointer" }}
        />
      ) : (
        <BsCameraVideoOff
          size={"1.8rem"}
          color="white"
          style={{ marginInline: "0.75rem", cursor: "pointer" }}
        />
      )}
      {/* <Tooltip
        hasArrow
        placement="top"
        label={cameraEnabled ? "Turn off camera" : "Turn on camera"}
      ></Tooltip> */}
    </span>
  );
};

export default CameraButton;
