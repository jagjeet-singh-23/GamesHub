"use client";

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useTransition, ElementRef, useRef } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
  initialValue: string;
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const [value, setValue] = useState(initialValue || "");
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("User bio updated!");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Textarea
            placeholder="User bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button variant={"ghost"} type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button variant={"primary"} type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
