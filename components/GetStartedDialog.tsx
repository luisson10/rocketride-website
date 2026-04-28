"use client";

import { useState, type ReactNode, type FormEvent } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";

const inputClass =
  "border-steel-dark w-full rounded-[10px] p-3 text-white placeholder:text-text-dim outline-none focus:ring-2 focus:ring-[var(--color-accent)]";

type Props = {
  children: ReactNode;
};

export function GetStartedDialog({ children }: Props) {
  const [open, setOpen] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // marketing UI — just log + close
    // eslint-disable-next-line no-console
    console.log("get-started submit", Object.fromEntries(data.entries()));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogDescription>
            Drop your work email and start building free — no credit card
            required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-muted">
              Work email
            </span>
            <input
              required
              type="email"
              name="email"
              placeholder="you@company.com"
              className={inputClass}
            />
          </label>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" size="md">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" size="md">
              Start building free
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
