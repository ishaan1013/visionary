"use client";

import { Separator } from "../ui/separator";
import Folder from "./folder";
import { Button } from "../ui/button";
import { FilePlus, FolderPlus } from "lucide-react";
import Document from "./document";
import { Prisma } from "@prisma/client";

export default function Content({
  folders,
  documents,
}: {
  folders: Prisma.FolderGetPayload<{
    include: {
      documents: true;
    };
  }>[];
  documents: Prisma.DocumentGetPayload<{}>[];
}) {
  return (
    <>
      <div className="flex h-8 w-full items-center">
        <Separator className="w-auto grow" />
        <Button size="icon" variant="ghost" className="ml-3 h-6 w-6">
          <FilePlus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="ml-1 h-6 w-6">
          <FolderPlus className="h-4 w-4" />
        </Button>
      </div>
      <div className="custom-scrollbar max-h-[calc(100vh-196px)] w-full overflow-y-auto">
        {folders.map((folder) => (
          <Folder key={folder.id} name={folder.name} docs={folder.documents} />
        ))}
        {documents.map((document) => (
          <Document key={document.id} id={document.id} name={document.title} />
        ))}
      </div>
    </>
  );
}
