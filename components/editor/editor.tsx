"use client";

import { Prisma } from "@prisma/client";
// editor wrapper to hack refresh bug

import NoteEditor from ".";
import { Editor } from "novel";

export default function EditorComponent({
  data,
  mutate,
}: {
  data: Prisma.DocumentGetPayload<{
    include: { folder: true };
  }>;
  mutate: ({ content }: { content: string }) => void;
}) {
  return (
    <Editor
      editorProps={{
        attributes: {
          class: `prose-base prose prose-zinc prose prose-h1:font-semibold prose-h1:text-3xl prose-h1:mb-0.5 prose-h2:font-semibold  prose-h2:text-2xl prose-h3:font-semibold  prose-h3:text-xl prose-h4:font-medium  prose-h4:text-lg font-satoshi focus:outline-none max-w-full`,
        },
      }}
      onDebouncedUpdate={(e) => {
        // console.log(localStorage.getItem("novel__content"))
        e?.commands.setContent(JSON.parse(data.content));

        const content = localStorage.getItem("novel__content");
        if (content) mutate({ content });
      }}
      className="prose w-full max-w-full border-none bg-transparent p-0 px-8 shadow-none lg:px-4 xl:px-0"
    />
  );
}
