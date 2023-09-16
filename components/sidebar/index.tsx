"use client";

import Link from "next/link";
import { Separator } from "../ui/separator";
import Folder from "./folder";
import User from "./user";

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

        <Separator className="my-4" />
        <div className="custom-scrollbar max-h-[calc(100vh-196px)] w-full space-y-0.5 overflow-y-auto">
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder a" docs={docs} />
          <Folder name="folder b" docs={[]} />
          <Folder name="folder c" docs={[]} />
        </div>
      </div>
      <User />
    </div>
  );
}
