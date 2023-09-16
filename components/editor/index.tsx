"use client";

import { Editor } from "novel";
import { Input } from "@/components/ui/input";
import { Document, Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Calendar,
  ChevronLeft,
  Folder,
  Loader2,
  Save,
  Text,
} from "lucide-react";
import { Button } from "../ui/button";

export default function NoteEditor({
  data,
}: {
  data: Prisma.DocumentGetPayload<{
    include: { folder: true };
  }>;
}) {
  // saving state (temporary before adding tanstack-query)
  const [saved, setSaved] = useState(true);

  return (
    <>
      <div className="mb-4 flex w-full justify-start md:!hidden">
        <Button size="sm" variant="secondary" className="h-8 pl-2">
          <ChevronLeft className="mr-1.5 h-4 w-4" /> Back
        </Button>
      </div>
      <div className="flex w-full items-center">
        {data.folder ? (
          <>
            <div className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gradient-to-br from-foreground  to-primary">
              <Folder className="h-3.5 w-3.5 text-background" />
            </div>
            <div className="select-none border-b border-transparent py-1 text-sm text-muted-foreground">
              {data.folder.name}
            </div>
            <div className="select-none px-4 text-muted-foreground">/</div>
          </>
        ) : null}
        <div className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary">
          <Text className="h-3.5 w-3.5 text-background" />
        </div>
        <input
          placeholder="Note Title"
          value={data.title}
          className="border-b border-transparent bg-background py-1 text-sm font-medium focus:border-b-muted-foreground/50 focus:outline-none"
        />
      </div>
      <div className="my-4 flex w-full select-none flex-wrap items-center space-x-2">
        <Badge
          variant="secondary"
          className="font-medium text-muted-foreground"
        >
          {saved ? (
            <>
              <Save className="mr-1 h-3.5 w-3.5" />
              Saved
            </>
          ) : (
            <>
              <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
              Saving...
            </>
          )}
        </Badge>
        <Badge
          variant="secondary"
          className="font-medium text-muted-foreground"
        >
          <Calendar className="mr-1 h-3.5 w-3.5" />
          Created (date)
        </Badge>
      </div>
      <Editor
        editorProps={{
          attributes: {
            class: `prose-base prose prose-zinc prose prose-h1:font-semibold prose-h1:text-3xl prose-h1:mb-0.5 prose-h2:font-semibold  prose-h2:text-2xl prose-h3:font-semibold  prose-h3:text-xl prose-h4:font-medium  prose-h4:text-lg font-satoshi focus:outline-none max-w-full`,
          },
        }}
        onDebouncedUpdate={(data) => console.log(data)}
        className="prose w-full max-w-full border-none bg-transparent p-0 px-8 shadow-none lg:px-4 xl:px-0"
      />
    </>
  );
}
