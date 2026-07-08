"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import NewsColumn from "@/components/NewsColumn";
import NewsCard from "@/components/NewsCard";
import { toColumn, type Column } from "@/lib/mediaBias";
import type { NewsItem, NewsApiResponse, NewsApiError } from "@/lib/news";

const COLUMNS: Column[] = ["progressive", "center", "conservative"];
const COLUMN_LABEL: Record<Column, string> = {
  progressive: "진보",
  center: "중도",
  conservative: "보수",
};

export default function SearchResults({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column>("progressive");

  useEffect(() => {
    if (!initialQuery) return;

    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting loading/error state when the search query changes is the standard data-fetching effect pattern
    setLoading(true);
    setError(null);

    fetch(`/api/news?query=${encodeURIComponent(initialQuery)}`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) {
          throw new Error((body as NewsApiError).error ?? "검색에 실패했습니다.");
        }
        return body as NewsApiResponse;
      })
      .then((data) => setItems(data.items))
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "검색에 실패했습니다.");
        setItems([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [initialQuery]);

  const grouped: Record<Column, NewsItem[]> = {
    progressive: [],
    center: [],
    conservative: [],
  };
  const unclassified: NewsItem[] = [];

  for (const item of items) {
    if (item.leaning === "unclassified") {
      unclassified.push(item);
    } else {
      grouped[toColumn(item.leaning)].push(item);
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-6 px-4 py-6 md:px-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col items-center gap-4">
        <Link href="/" className="text-xl font-bold">
          시소
        </Link>
        <SearchBox defaultValue={initialQuery} />
      </div>

      {!initialQuery && (
        <p className="text-center text-gray-400 py-10">
          검색어를 입력해주세요.
        </p>
      )}

      {loading && (
        <p className="text-center text-gray-500 py-10">
          &ldquo;{initialQuery}&rdquo; 관련 뉴스를 불러오는 중...
        </p>
      )}

      {!loading && error && (
        <p className="text-center text-red-500 py-10">{error}</p>
      )}

      {!loading && !error && initialQuery && (
        <>
          <div className="flex md:hidden gap-2 justify-center">
            {COLUMNS.map((col) => (
              <button
                key={col}
                onClick={() => setActiveColumn(col)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                  activeColumn === col
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 border-gray-900 dark:border-gray-100"
                    : "border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400"
                }`}
              >
                {COLUMN_LABEL[col]} {grouped[col].length}
              </button>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-3 gap-4">
            {COLUMNS.map((col) => (
              <NewsColumn key={col} column={col} items={grouped[col]} />
            ))}
          </div>

          <div className="md:hidden">
            <NewsColumn column={activeColumn} items={grouped[activeColumn]} />
          </div>

          {items.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              검색 결과가 없습니다.
            </p>
          )}

          {unclassified.length > 0 && (
            <section className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-6">
              <h2 className="font-bold mb-3 text-gray-700 dark:text-gray-300">
                분류되지 않은 언론사 ({unclassified.length}건)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {unclassified.map((item, i) => (
                  <NewsCard key={item.link + i} item={item} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
