import { NewsFeed } from "@/components/news-feed";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <header className="mb-10">
          <div className="flex items-baseline gap-3 mb-1">
            <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">
              News Stream
            </h1>
            <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-accent" />
          </div>
          <p className="text-muted-foreground text-base max-w-lg">
            The latest headlines from around the world, updated in real time.
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-border via-border/60 to-transparent" />
        </header>
        <NewsFeed />
      </div>
    </main>
  );
}
