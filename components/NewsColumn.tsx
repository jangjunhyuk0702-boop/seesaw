import type { NewsItem } from "@/lib/news";
import type { Column } from "@/lib/mediaBias";
import NewsCard from "@/components/NewsCard";

const COLUMN_META: Record<Column, { label: string; accent: string; bg: string }> = {
  progressive: {
    label: "진보",
    accent: "border-t-blue-500",
    bg: "bg-blue-50/60 dark:bg-blue-950/20",
  },
  center: {
    label: "중도",
    accent: "border-t-gray-400",
    bg: "bg-gray-50 dark:bg-gray-900/40",
  },
  conservative: {
    label: "보수",
    accent: "border-t-red-500",
    bg: "bg-red-50/60 dark:bg-red-950/20",
  },
};

export default function NewsColumn({
  column,
  items,
}: {
  column: Column;
  items: NewsItem[];
}) {
  const meta = COLUMN_META[column];

  return (
    <section
      className={`flex-1 rounded-lg border-t-4 ${meta.accent} ${meta.bg} p-3 flex flex-col gap-3`}
    >
      <header className="flex items-center justify-between px-1">
        <h2 className="font-bold text-gray-800 dark:text-gray-100">
          {meta.label}
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {items.length}건
        </span>
      </header>
      <div className="flex flex-col gap-3">
        {items.length === 0 ? (
          <p className="text-sm text-gray-400 px-1 py-6 text-center">
            해당 성향의 기사가 없습니다.
          </p>
        ) : (
          items.map((item, i) => <NewsCard key={item.link + i} item={item} />)
        )}
      </div>
    </section>
  );
}
