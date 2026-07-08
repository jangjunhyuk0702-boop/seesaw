import type { MediaClassification } from "@/lib/mediaBias";

export interface NewsItem extends MediaClassification {
  title: string;
  description: string;
  originallink: string;
  link: string;
  pubDate: string;
}

export interface NewsApiResponse {
  query: string;
  total: number;
  items: NewsItem[];
}

export interface NewsApiError {
  error: string;
  detail?: string;
}
