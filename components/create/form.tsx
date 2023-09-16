"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { ArrowRight, ChevronLeft, Sparkle, Sparkles } from "lucide-react";
import VideoRecorder from "../videorecorder";

const formSchema = z.object({
  title: z.string().min(1).max(50),
  desc: z.string().max(500),
});

export default function CreateForm({ next }: { next: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    next();
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
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
          {/* <Button type="submit">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Notes
          </Button> */}
          <Button type="submit">
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </>
  );
}
