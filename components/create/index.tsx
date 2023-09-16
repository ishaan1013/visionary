"use client";

import { ArrowRight, ChevronLeft, Sparkle, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import CreateForm from "./form";
import VideoRecorder from "../videorecorder";

export default function CreateNote() {
  const [prep, setPrep] = useState(true);
  const [theme, setTheme] = useState("");

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

  if (prep)
    return (
      <>
        <CreateForm next={next} setInfo={setInfo} />
      </>
    );

  return (
    <VideoRecorder
      title={title}
      description={description}
      back={back}
      theme={theme}
    />
  );
}
