"use client";

import { cn } from "@/lib/utils";

const categories = [
  { label: "All", query: "" },
  { label: "Finance", query: "finance and economy news" },
  { label: "Sports", query: "sports news" },
  { label: "Wars", query: "wars and armed conflicts news" },
  { label: "Technology", query: "technology news" },
  { label: "Health", query: "health and medicine news" },
  { label: "Entertainment", query: "entertainment and celebrity news" },
  { label: "Science", query: "science and research news" },
  { label: "Politics", query: "politics and government news" },
  { label: "Climate", query: "climate and environment news" },
];

interface CategorySelectorProps {
  value: string;
  onChange: (query: string) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.label}
          type="button"
          onClick={() => onChange(category.query)}
          className={cn(
            "px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors border",
            value === category.query
              ? "bg-foreground text-background border-foreground"
              : "bg-card text-muted-foreground border-border/80 hover:border-foreground/30 hover:text-foreground"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
