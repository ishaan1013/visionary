"use client";

import { Editor } from "novel";
import { Input } from "@/components/ui/input";
import { Document } from "@prisma/client";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Loader2, Save } from "lucide-react";

export default function NoteEditor({ data }: { data: Document }) {
  // saving state (temporary before adding tanstack-query)
  const [saved, setSaved] = useState(true);

  return (
    <>
      <div className="flex w-full items-center">
        <Input
          className="h-14 text-xl font-medium"
          placeholder="Document Name"
        />
      </div>
      <div className="my-4 flex w-full select-none flex-wrap items-center">
        <Badge variant="secondary">
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
      </div>
      <Editor
        editorProps={{
          attributes: {
            class: `prose-base prose prose-zinc prose prose-h1:font-semibold prose-h1:text-3xl prose-h1:mb-0.5 prose-h2:font-semibold  prose-h2:text-2xl prose-h3:font-semibold  prose-h3:text-xl prose-h4:font-medium  prose-h4:text-lg font-satoshi focus:outline-none max-w-full`,
          },
        }}
        onDebouncedUpdate={(data) => console.log(data)}
        className="prose w-full border-none bg-transparent p-0 px-8 shadow-none lg:px-4 xl:px-0"
      />
    </>
  );
}
