"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilePlus, Image, Video } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CreateDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="ml-3 h-6 w-6">
          <FilePlus className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/d">
          <DropdownMenuItem>
            <Video className="mr-2 h-4 w-4" />
            Live Analysis
          </DropdownMenuItem>
        </Link>
        <Link href="/d?method=upload">
          <DropdownMenuItem>
            <Image className="mr-2 h-4 w-4" />
            Upload Content
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
