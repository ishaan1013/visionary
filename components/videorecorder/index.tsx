import React from "react";
import Webcam from "react-webcam";
import { useState, useRef } from "react";
import {
  Camera,
  CameraOff,
  ChevronLeft,
  Image,
  Scan,
  StopCircle,
  Video,
  VideoOff,
} from "lucide-react";
import { sendImage } from "@/lib/sendImage";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

export default function VideoRecorder({
  theme,
  back,
  title,
  description,
}: {
  theme: string;
  back: () => void;
  title: string;
  description: string;
}) {
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
    <div className="flex h-full w-full flex-col items-center justify-start overflow-hidden">
      <div className="mb-4 flex w-full items-center justify-start">
        <Button onClick={back} variant="secondary">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="mx-4 h-10 w-[1px] bg-border" />
        <div className="flex items-center">
          <Label htmlFor="onOff">
            {on ? (
              <Camera className="mr-2 h-5 w-5" />
            ) : (
              <CameraOff className="mr-2 h-5 w-5" />
            )}
          </Label>
          <Switch id="onOff" checked={on} onCheckedChange={setOn} />
        </div>
        <div className="mx-4 h-10 w-[1px] bg-border" />
        <Button onClick={capture}>
          <Scan className="mr-2 h-4 w-4" /> Manual Capture
        </Button>
      </div>
      <div className="w-full text-left text-xl font-semibold">
        Note Title: {title}
      </div>
      <div className="w-full text-left text-muted-foreground">
        {description ?? "No description provided."}
      </div>
      <Separator className="my-4" />
      {on ? (
        <div className="relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-xl">
          <Webcam
            className="w-full"
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            mirrored={false}
            audio={true}
            ref={webcamRef}
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-foreground to-primary">
          <VideoOff className="h-8 w-8 text-background" />
          <div className="mt-2 font-medium text-background">
            Your webcam/camera is off.
          </div>
        </div>
      )}
    </div>
  );
}
