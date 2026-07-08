import type { NewsItem } from "@/lib/news";

function formatPubDate(pubDate: string): string {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return pubDate;
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {item.press_name}
        </span>
        <span>{formatPubDate(item.pubDate)}</span>
      </div>
      <h3 className="font-semibold text-sm leading-snug line-clamp-2">
        {item.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {item.description}
      </p>
      <a
        href={item.originallink || item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-1 self-start"
      >
        원문 보기 ↗
      </a>
    </article>
  );
}
