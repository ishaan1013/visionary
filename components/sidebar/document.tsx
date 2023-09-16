"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function Document({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Button
      variant="ghost"
      onClick={() => setOpen((prev) => !prev)}
      className="h-8 w-full justify-start p-1 pr-2"
    >
      <div className="mr-2 aspect-square h-full rounded-sm bg-primary" />
      <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
        {name}
      </span>
    </Button>
  );
}
