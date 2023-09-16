"use client";

import { ArrowRight, ChevronLeft, Sparkle, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import CreateForm from "./form";

export default function CreateNote() {
  const [recorded, setRecorded] = useState(false);

  const goBack = () => {
    setRecorded(false);
  };

  if (!recorded)
    return (
      // step 1: record
      <>
        <div className="mb-4 font-bold italic">webcam</div>
        <Button onClick={() => setRecorded(true)}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </>
    );

  //step 2
  return <CreateForm goBack={goBack} />;
}
