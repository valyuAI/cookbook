"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ArticleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
  content: string;
  images: string[];
  publicationDate?: string;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Detect if content is primarily HTML or markdown, and normalize it
 * for proper rendering.
 */
function prepareContent(raw: string): string {
  const hasHtmlBlocks = /<(div|p|article|section|span|br|ul|ol|li|h[1-6]|table|tr|td|th|blockquote|figure|figcaption|img|a|strong|em|b|i)\b/i.test(raw);

  if (hasHtmlBlocks) {
    return raw;
  }

  // For plain text / markdown content, ensure double newlines for paragraph breaks
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");
}

export function ArticleModal({
  open,
  onOpenChange,
  title,
  url,
  content,
  images,
  publicationDate,
}: ArticleModalProps) {
  const domain = extractDomain(url);
  const processedContent = prepareContent(content);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] sm:max-w-[80vw] w-[80vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <div className="overflow-y-auto max-h-[90vh]">
          {images.length > 0 && (
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="px-8 pt-6 pb-8 flex flex-col gap-4 w-[85%] mx-auto">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                  alt=""
                  className="h-4 w-4 rounded-sm"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  {domain}
                </span>
                {publicationDate && (
                  <>
                    <span className="text-muted-foreground/40">&middot;</span>
                    <span className="text-sm text-muted-foreground/70">
                      {formatDate(publicationDate)}
                    </span>
                  </>
                )}
              </div>
              <Button variant="outline" size="sm" asChild className="shrink-0">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Visit source
                </a>
              </Button>
            </div>

            <DialogTitle className="font-display text-2xl leading-tight tracking-tight">
              {stripHtml(title)}
            </DialogTitle>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.slice(1).map((src, i) => (
                  <div
                    key={i}
                    className="relative shrink-0 w-40 h-28 rounded-md overflow-hidden bg-muted"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="h-px bg-border" />

            <article className="prose prose-neutral max-w-none text-foreground prose-headings:text-foreground prose-headings:font-display prose-h1:text-2xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-xl prose-h2:mt-7 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-[15px] prose-p:leading-[1.8] prose-p:my-4 prose-li:text-[15px] prose-li:my-1 prose-a:text-accent prose-a:underline prose-a:underline-offset-2 prose-img:rounded-lg prose-img:my-6 prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground prose-blockquote:my-5 prose-strong:text-foreground prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:text-foreground prose-pre:my-5 prose-table:text-sm prose-table:my-5 prose-th:text-left prose-th:font-semibold prose-hr:my-6">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {processedContent}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
