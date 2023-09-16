"use client";

import Link from "next/link";
import { Separator } from "../ui/separator";
import Folder from "./folder";
import User from "./user";
import { Button } from "../ui/button";
import { FilePlus, FolderPlus } from "lucide-react";
import Document from "./document";

const docs = [
  { name: "1" },
  { name: "abcdefghijklmnopqrstuvwxyzasdasdadasdas" },
  { name: "3" },
];

export default function Sidebar() {
  return (
    <div className="flex h-screen max-h-screen w-full max-w-[16rem] flex-col justify-between border-r border-border px-4 py-8">
      <div className="flex flex-col items-start">
        <Link href="/">
          <div className="h-7 bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-xl font-semibold text-transparent">
            Visionary
          </div>
        </Link>

        <div className="flex h-8 w-full items-center">
          <Separator className="w-auto grow" />
          <Button size="icon" variant="ghost" className="ml-3 h-6 w-6">
            <FilePlus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="ml-1 h-6 w-6">
            <FolderPlus className="h-4 w-4" />
          </Button>
        </div>
        <div className="custom-scrollbar max-h-[calc(100vh-196px)] w-full space-y-1 overflow-y-auto">
          <Folder name="folder a" docs={docs} />
          <Folder name="folder b" docs={[]} />
          <Folder name="folder c" docs={[]} />
          <Document name="document 1" />
          <Document name="document 2" />
          <Document name="document 3" />
          <Document name="document 4" />
        </div>
      </div>
      <User />
    </div>
  );
}
