"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Document from "./document";

export default function Folder({
  name,
  docs,
}: {
  name: string;
  docs: { name: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className="h-7 w-full justify-start px-2 py-0"
      >
        <ChevronRight
          className={`${open ? "rotate-90" : ""} mr-2 h-4 w-4 duration-100`}
        />
        {name}
      </Button>

      {docs.length > 1 && open ? (
        <div className="ml-4 space-y-1">
          {docs.map((doc) => (
            <Document key={doc.name} name={doc.name} />
          ))}
        </div>
      ) : null}
    </>
  );
}
