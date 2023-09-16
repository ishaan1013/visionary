"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
import Document from "../document";
import { Document as DocumentType } from "@prisma/client";
import FolderMenu from "./menu";

export default function Folder({
  name,
  id,
  docs,
}: {
  name: string;
  id: string;
  docs: DocumentType[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="group relative mt-1 h-7 w-full">
        <Button
          variant="ghost"
          onClick={() => setOpen((prev) => !prev)}
          className="h-7 w-full items-center justify-between px-2 py-0"
        >
          <div className="flex h-full items-center">
            <ChevronRight
              className={`${open ? "rotate-90" : ""} mr-2 h-4 w-4 duration-100`}
            />
            {name}
          </div>
        </Button>
        <FolderMenu id={id} name={name} />
      </div>

      {open ? (
        <div className="ml-4">
          {docs.map((doc) => (
            <Document key={doc.id} id={doc.id} name={doc.title} />
          ))}
        </div>
      ) : null}
    </>
  );
}
