"use client";

import { Editor } from "novel";
import { Prisma } from "@prisma/client";
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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditorComponent from "./editor";

export default function NoteEditor({
  data,
}: {
  data: Prisma.DocumentGetPayload<{
    include: { folder: true };
  }>;
}) {
  const updateMutation = useMutation({
    mutationFn: ({ content }: { content: string }) => {
      return axios.post("/api/editor/update", {
        id: data.id,
        content,
      });
    },
    onSuccess: () => {
      console.log("success");
    },
  });

  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    const content = localStorage.getItem("novel__content");
    if (content !== data.content) {
      localStorage.setItem("novel__content", data.content);
    }
    setTimeout(() => {
      setEditorReady(true);
    }, 1000);
  }, [data]);

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
            <div className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gradient-to-br from-foreground to-primary">
              <Folder className="h-3.5 w-3.5 text-background" />
            </div>
            <div className="select-none border-b border-transparent py-1 text-sm text-muted-foreground">
              {data.folder.name}
            </div>
            <div className="select-none px-4 text-muted-foreground">/</div>
          </>
        ) : null}
        <div className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gradient-to-tl from-foreground to-primary">
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
          {!updateMutation.isLoading ? (
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
          Created {data.createdAt.toLocaleDateString()}
        </Badge>
      </div>
      {editorReady ? (
        <EditorComponent mutate={updateMutation.mutate} data={data} />
      ) : (
        <div className="flex items-center text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading editor...
        </div>
      )}
    </>
  );
}
