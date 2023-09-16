"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit3,
  Folder,
  Loader2,
  MoreHorizontal,
  Trash2,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function FolderMenu({ name, id }: { name: string; id: string }) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const renameMutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/folder/rename", {
        id: id,
        name: value,
      });
    },
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) setValue("");
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Edit3 className="mr-2 h-4 w-4" /> Rename
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="!text-destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Rename <Folder className="mx-2 h-5 w-5 text-primary" />{" "}
            <span className="text-primary">{name}</span>
          </DialogTitle>
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
          onClick={() => renameMutation.mutate()}
          disabled={!value}
          variant="default"
        >
          {renameMutation.isLoading ? (
            <Loader2 className="h-4 w-4" />
          ) : (
            "Confirm"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
