import React from "react";
import Webcam from "react-webcam";
import { useState, useRef } from "react";
import { Image, StopCircle, Video } from "lucide-react";
import { sendImage } from "@/lib/sendImage";

export default function VideoRecorder({ theme }: { theme: string }) {
  const [on, setOn] = useState(false);
  const [pictures, setPictures] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(() => {
    if (webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      sendImage(theme, imageSrc).then((res) => {
        setResults([...results, res]);
      });
      setPictures([...pictures, imageSrc]);
    }
  }, [webcamRef]);
  console.log(results);
  console.log(pictures);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {on ? (
        <div className="relative flex h-full w-full flex-col items-center justify-start">
          <Webcam
            className="w-full"
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            mirrored={false}
            audio={true}
            ref={webcamRef}
          />
          <div className="absolute bottom-5 flex w-full items-center justify-center space-x-10 pt-2">
            <button onClick={capture}>
              <Image />
            </button>
            <button
              onClick={() => {
                setOn(false);
              }}
            >
              <StopCircle />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded bg-gradient-to-br from-background/90 to-background/70 px-10 py-7 brightness-90">
          <button
            onClick={() => {
              setOn(true);
            }}
          >
            <Video className="h-20 w-20 text-foreground" />
          </button>
        </div>
      )}
    </div>
  );
}
