"use client";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ApplicantSearch({
  value,
  onChange,
  isSearching,
}: {
  value: string;
  onChange: (value: string) => void;
  isSearching?: boolean;
}) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pl-9 pr-9"
        placeholder="Search by name or email..."
        aria-label="Search applicants"
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 size-9"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X className="size-3.5" />
        </Button>
      ) : isSearching ? (
        <span
          className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
