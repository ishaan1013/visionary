"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { sendImage } from "@/lib/sendImage";

const formSchema = z.object({
  title: z.string().min(1).max(50),
  desc: z.string().max(500),
});

export default function UploadForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
    },
  });
  const [files, setFiles] = useState<any[number]>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    let files: any[number] = [];
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const buffer = reader.result;
        files.push(new Uint8Array(buffer));
      };
      reader.readAsArrayBuffer(file);
    });
    setFiles(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let results: any[] = [];
    files.forEach((file: Uint8Array) => {
      sendImage(file, values.title).then((res: any) => {
        results = [...results, ...res];
      });
    });
    const res = await fetch("http://127.0.0.1:5000/api/generate_notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: values.title,
        description: values.desc,
        data: results,
      }),
    });
    const data = await res.text();
    //convert to json
    const json = await fetch("http://127.0.0.1:5000/api/generate_json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notes: data,
      }),
    }).then((res) => res.text());
    let parsed = JSON.stringify(JSON.parse(json));
    // SAVE TO DATABASE
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
          encType="multipart/form-data"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your note title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Algebra lesson 4" {...field} />
                </FormControl>
                <FormDescription>Can be changed later.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description of the topic, lecture, etc. (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. The history of ancient Rome"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Briefly summarize it to assist our analysis.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <p>Images to analyze</p>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {files.length > 0 ? (
                <p className="rounded-sm bg-green-100/70 p-2 ring-1 ring-foreground">
                  {files.length} files selected
                </p>
              ) : isDragActive ? (
                <p className="rounded-sm bg-green-100/70 p-2 ring-1 ring-foreground">
                  Drop the files here ...
                </p>
              ) : (
                <p className="rounded-sm p-2 ring-1 ring-foreground">
                  Drag/drop, or click to select files (.jpg, .jpeg)
                </p>
              )}
            </div>
            <p>Include multiple high-quality images for the best results.</p>
          </div>
          <Button type="submit">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Notes
          </Button>
        </form>
      </Form>
    </>
  );
}
