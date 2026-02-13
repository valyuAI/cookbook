# News Stream

A global news aggregator that displays the latest headlines from around the world in real time, built with Next.js and [Valyu Search API](https://docs.valyu.ai/guides/search).

[Try it live here](https://news.valyu.ai)

## Features

- **Full-Text Search**: Search for any news topic, event, or person with real-time results
- **Category Filtering**: Browse news by category — Finance, Sports, Technology, Health, Entertainment, Science, Politics, Climate, and more
- **Country-Based News**: Filter headlines by country with support for 38+ countries
- **Date Range Filtering**: Query news within specific time periods with presets (Today, Yesterday, Last 7 days, Last 30 days) or custom date selection
- **Article Detail View**: Click any article to read the full content in a modal with image carousel and source links
- **Responsive Grid Layout**: News cards displayed in an adaptive grid with article images, source favicons, and publication dates
- **Loading Skeletons**: Smooth skeleton loaders for improved perceived performance

## Prerequisites

- Node.js 20+ installed
- A Valyu API key (get one at [Valyu Platform](https://platform.valyu.ai))

## Getting Started

1. **Install dependencies**:

```bash
npm install
```

2. **Set up environment variables**:

Create a `.env.local` file in the root directory:

```bash
VALYU_API_KEY=your_valyu_api_key_here
```

3. **Run the development server**:

```bash
npm run dev
```

4. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Search**: Type a topic in the search bar to find relevant news articles
2. **Filter by Category**: Click a category pill (Finance, Sports, Technology, etc.) to browse by topic
3. **Filter by Country**: Use the country dropdown to see headlines from a specific country
4. **Filter by Date**: Select a date range to narrow results to a specific time period
5. **Read Articles**: Click any news card to open the full article in a detail modal

## Project Structure

```
newsapp/
├── app/
│   ├── api/
│   │   └── news/
│   │       └── route.ts              # Valyu Search API endpoint
│   ├── page.tsx                      # Main page with News Stream header
│   ├── layout.tsx                    # Root layout with metadata
│   └── globals.css                   # Global styles
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── news-feed.tsx                 # Main feed with search, filters, and grid
│   ├── search-bar.tsx                # Search input component
│   ├── category-selector.tsx         # Category pill selector
│   ├── country-selector.tsx          # Country dropdown
│   ├── date-selector.tsx             # Date range picker with presets
│   ├── news-card.tsx                 # Individual article card
│   └── article-modal.tsx             # Full article detail modal
├── lib/
│   ├── valyu.ts                      # Valyu client initialization
│   ├── countries.ts                  # Country list with flags
│   └── utils.ts                      # Utility functions
```

## API Configuration

The news API is configured in [route.ts](app/api/news/route.ts):

- **Search Type**: `news` — fetches news articles via Valyu Search
- **Max Results**: 20 articles per request
- **Parameters**: Query, country code, start date, end date

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with Typography plugin
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Markdown Rendering**: react-markdown with GitHub Flavored Markdown
- **Date Handling**: date-fns
- **News Data**: Valyu Search API

## Key Dependencies

- `valyu-js` - Official Valyu SDK for news search
- `react-markdown` - Markdown rendering for article content
- `remark-gfm` - GitHub Flavored Markdown support
- `date-fns` - Date formatting and manipulation
- `radix-ui` - Accessible UI primitives

## Deploy on Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Set the **Root Directory** to `example-projects/newsapp`
4. Add your `VALYU_API_KEY` environment variable
5. Deploy!

## License

MIT
