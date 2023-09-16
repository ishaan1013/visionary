import React from "react";
import Webcam from "react-webcam";
import { useState, useRef } from "react";

export default function Video() {
  const [on, setOn] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
    }
  }, [webcamRef]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Webcam
        screenshotFormat="image/jpeg"
        screenshotQuality={1}
        mirrored={true}
        audio={true}
        ref={webcamRef}
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
}
