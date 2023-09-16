"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FilePlus, FolderPlus, Image, Loader2, Video } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function CreateFolder() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/folder/create", {
        name: value,
      });
    },
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="ml-1 h-6 w-6">
          <FolderPlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">Create Folder</DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="ml-3 w-full"
            placeholder="New folder name"
          />
        </div>
        <Button
          onClick={() => createMutation.mutate()}
          disabled={!value}
          variant="default"
        >
          {createMutation.isLoading ? (
            <Loader2 className="h-4 w-4" />
          ) : (
            "Confirm"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
