"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  value?: string;
}

export function SearchBar({ onSearch, isLoading, value }: SearchBarProps) {
  const [query, setQuery] = useState(value ?? "");

  useEffect(() => {
    if (value !== undefined) setQuery(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for news topics, events, people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-11 bg-card border-border/80 text-sm shadow-sm transition-shadow focus-visible:shadow-md"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-11 px-5 shadow-sm"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Search className="h-4 w-4 mr-1.5" />
            Search
          </>
        )}
      </Button>
    </form>
  );
}
