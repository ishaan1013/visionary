"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight, Text } from "lucide-react";
import Link from "next/link";

export default function Document({ name, id }: { name: string; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Link href={`/d/${id}`}>
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className="mt-1 h-7 w-full justify-start p-1 pr-2"
      >
        <div className="mr-2 flex aspect-square h-full items-center justify-center rounded-sm bg-primary">
          <Text className="h-3 w-3 text-background" />
        </div>
        <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
          {name}
        </span>
      </Button>
    </Link>
  );
}
