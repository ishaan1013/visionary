"use client";

import { useState } from "react";
import CreateForm from "./form";
import VideoRecorder from "../videorecorder";
import UploadForm from "./uploadForm";

export default function CreateNote({ upload }: { upload: boolean }) {
  const [prep, setPrep] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const setInfo = (title: string, description: string) => {
    setTitle(title);
    setDescription(description);
  };

  const next = () => {
    setPrep(false);
  };

  const back = () => {
    setPrep(true);
  };

  if (upload) {
    return (
      <>
        <UploadForm />
      </>
    );
  }

  if (prep)
    return (
      <>
        <CreateForm next={next} setInfo={setInfo} />
      </>
    );

  return <VideoRecorder title={title} description={description} back={back} />;
}
