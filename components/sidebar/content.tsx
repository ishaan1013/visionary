"use client";

import { Separator } from "../ui/separator";
import Folder from "./folder";
import { Button } from "../ui/button";
import { FilePlus, FolderPlus } from "lucide-react";
import Document from "./document";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import CreateDropdown from "./createDropdown";
import { useQuery } from "@tanstack/react-query";
import CreateFolder from "./createFolder";

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
  // const { data, isFetching } = useQuery({
  //   queryKey: ["folders"],
  //   queryFn: () => fetch("/folders"),
  //   initialData: folders,
  // });

  return (
    <>
      <div className="flex h-8 w-full items-center">
        <Separator className="w-auto grow" />
        <CreateDropdown />
        <CreateFolder />
      </div>
      <div className="custom-scrollbar max-h-[calc(100vh-196px)] w-full overflow-y-auto">
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            id={folder.id}
            name={folder.name}
            docs={folder.documents}
          />
        ))}
        {documents.map((document) => (
          <Document key={document.id} id={document.id} name={document.title} />
        ))}
      </div>
    </>
  );
}
