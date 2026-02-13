"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { SearchBar } from "@/components/search-bar";
import { CountrySelector } from "@/components/country-selector";
import { DateSelector } from "@/components/date-selector";
import { CategorySelector } from "@/components/category-selector";
import { NewsCard } from "@/components/news-card";
import { ArticleModal } from "@/components/article-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper } from "lucide-react";

interface NewsResult {
  title: string;
  url: string;
  content: string | object | any[];
  description?: string;
  source: string;
  source_type?: string;
  publication_date?: string;
  image_url?: Record<string, string>;
}

function CardSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
      <Skeleton className="w-full aspect-[16/10]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5 rounded-sm" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </div>
    </div>
  );
}

function getAllImages(imageUrl?: Record<string, string>): string[] {
  if (!imageUrl) return [];
  return Object.values(imageUrl).filter(Boolean);
}

function getContentAsString(content: string | object | any[]): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.join("\n");
  return JSON.stringify(content, null, 2);
}

export function NewsFeed() {
  const [results, setResults] = useState<NewsResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("US");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsResult | null>(null);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("country", country);
    params.set("startDate", startDate);
    params.set("endDate", endDate);

    try {
      const res = await fetch(`/api/news?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setResults(data.results || []);
      } else {
        setError(data.error || "Failed to fetch news");
        setResults([]);
      }
    } catch {
      setError("Failed to fetch news. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, country, startDate, endDate]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCategory("");
  };

  const handleCategoryChange = (categoryQuery: string) => {
    setCategory(categoryQuery);
    setQuery(categoryQuery);
  };

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
  };

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} value={query} />
        <CategorySelector value={category} onChange={handleCategoryChange} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <CountrySelector value={country} onChange={handleCountryChange} />
          <DateSelector onDateChange={handleDateChange} />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((result, index) => (
            <NewsCard
              key={`${result.url}-${index}`}
              title={result.title}
              url={result.url}
              description={result.description}
              publicationDate={result.publication_date}
              images={getAllImages(result.image_url).slice(0, 3)}
              onClick={() => setSelectedArticle(result)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-5">
            <Newspaper className="h-7 w-7" />
          </div>
          <p className="text-lg font-medium text-foreground mb-1">No news found</p>
          <p className="text-sm">Try a different search query or adjust your filters.</p>
        </div>
      )}

      {selectedArticle && (
        <ArticleModal
          open={!!selectedArticle}
          onOpenChange={(open) => {
            if (!open) setSelectedArticle(null);
          }}
          title={selectedArticle.title}
          url={selectedArticle.url}
          content={getContentAsString(selectedArticle.content)}
          images={getAllImages(selectedArticle.image_url)}
          publicationDate={selectedArticle.publication_date}
        />
      )}
    </div>
  );
}
