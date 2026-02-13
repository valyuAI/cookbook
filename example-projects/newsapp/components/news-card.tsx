interface NewsCardProps {
  title: string;
  url: string;
  description?: string;
  publicationDate?: string;
  images?: string[];
  onClick?: () => void;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function ImageGrid({ images }: { images: string[] }) {
  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[0]}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-0.5 bg-border/40 overflow-hidden">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5 bg-border/40 overflow-hidden">
      <div className="col-span-2 row-span-2 relative aspect-[4/3] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[0]}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {images.slice(1, 3).map((src, i) => (
        <div key={i} className="relative aspect-[4/3] overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

export function NewsCard({
  title,
  url,
  description,
  publicationDate,
  images,
  onClick,
}: NewsCardProps) {
  const domain = extractDomain(url);
  const hasImages = images && images.length > 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group block h-full cursor-pointer outline-none"
    >
      <article className="bg-card rounded-lg border border-border/60 shadow-sm hover:shadow-md hover:border-border transition-all duration-300 h-full flex flex-col overflow-hidden">
        {hasImages && <ImageGrid images={images} />}
        <div className="p-4 flex flex-col gap-2.5 flex-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                alt=""
                className="h-3.5 w-3.5 rounded-sm"
              />
              <span className="text-xs font-medium text-muted-foreground truncate max-w-[140px]">
                {domain}
              </span>
            </div>
            {publicationDate && (
              <>
                <span className="text-muted-foreground/40 text-xs">&middot;</span>
                <span className="text-xs text-muted-foreground/70">
                  {formatDate(publicationDate)}
                </span>
              </>
            )}
          </div>
          <h3 className="font-semibold text-[15px] leading-snug line-clamp-2 text-card-foreground group-hover:text-accent-foreground transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 flex-1">
              {stripHtml(description)}
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
