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
import { ChevronLeft, Sparkle, Sparkles } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  desc: z.string().min(2).max(500),
});

export default function CreateForm({ goBack }: { goBack: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Button
        onClick={goBack}
        size="sm"
        variant="secondary"
        className="mb-4 h-8 pl-2"
      >
        <ChevronLeft className="mr-1.5 h-4 w-4" /> Back to Record
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Briefly summarize to assist generation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pb-8">
            <div className="text-sm font-medium">Your Recording</div>
            <div className="mt-2 aspect-video h-96 rounded-xl bg-green-900"></div>
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
