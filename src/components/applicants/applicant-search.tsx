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
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-3 top-3 size-5 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pl-10 pr-10"
        placeholder="Search applicants..."
        aria-label="Search applicants"
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X className="size-4" />
        </Button>
      ) : isSearching ? (
        <span className="absolute right-3 top-3 size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      ) : null}
    </div>
  );
}
