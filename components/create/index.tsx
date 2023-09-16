"use client";

import { ArrowRight, ChevronLeft, Sparkle, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import CreateForm from "./form";
import VideoRecorder from "../videorecorder";

export default function CreateNote() {
  const [prep, setPrep] = useState(true);
  const [theme, setTheme] = useState("");

  const next = () => {
    setPrep(false);
  };

  if (prep)
    return (
      <>
        <CreateForm next={next} />
      </>
    );

  return (
    <>
      <Button
        onClick={() => setPrep(true)}
        size="sm"
        variant="secondary"
        className="mb-4 h-8 pl-2"
      >
        <ChevronLeft className="mr-1.5 h-4 w-4" /> Back
      </Button>
      <VideoRecorder theme={theme} />
    </>
  );
}
