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

const formSchema = z.object({
  title: z.string().min(1).max(50),
  desc: z.string().max(500),
  images: z.string(),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(files);
  }

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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images to analyze</FormLabel>
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
                <FormDescription>
                  Include multiple high-quality images for the best results.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Notes
          </Button>
        </form>
      </Form>
    </>
  );
}
