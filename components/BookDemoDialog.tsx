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

export function BookDemoDialog({ children }: Props) {
  const [open, setOpen] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    console.log("book-demo submit", Object.fromEntries(data.entries()));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Demo</DialogTitle>
          <DialogDescription>
            Tell us a bit about your team and we&apos;ll set up a 30-minute
            walkthrough.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-muted">Name</span>
            <input
              required
              type="text"
              name="name"
              placeholder="Jane Doe"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-muted">
              Work email
            </span>
            <input
              required
              type="email"
              name="email"
              placeholder="jane@company.com"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text-muted">
              Company size
            </span>
            <select
              name="companySize"
              className={inputClass}
              defaultValue="11-50"
            >
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </label>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost" size="md">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" size="md">
              Request Demo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
