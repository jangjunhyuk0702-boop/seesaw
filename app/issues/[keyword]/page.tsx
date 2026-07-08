import type { Metadata } from "next";
import Link from "next/link";
import NewsColumn from "@/components/NewsColumn";
import NewsCard from "@/components/NewsCard";
import { toColumn, type Column } from "@/lib/mediaBias";
import { NaverNewsError, searchNaverNews } from "@/lib/naverNews";
import type { NewsItem } from "@/lib/news";

export const revalidate = 3600;

const COLUMNS: Column[] = ["progressive", "center", "conservative"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ keyword: string }>;
}): Promise<Metadata> {
  const { keyword: rawKeyword } = await params;
  const keyword = decodeURIComponent(rawKeyword);
  return {
    title: `${keyword} 관련 뉴스 | 시소`,
    description: `${keyword}에 대한 진보·중도·보수 언론사의 시각을 한눈에 비교해보세요.`,
  };
}

export default async function IssuePage({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword: rawKeyword } = await params;
  const keyword = decodeURIComponent(rawKeyword);

  let items: NewsItem[] = [];
  let errorMessage: string | null = null;

  try {
    const result = await searchNaverNews(keyword, {
      display: "30",
      next: { revalidate: 3600 },
    });
    items = result.items;
  } catch (err) {
    errorMessage =
      err instanceof NaverNewsError
        ? err.message
        : "이슈를 불러오는 중 오류가 발생했습니다.";
  }

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
      <div className="flex flex-col items-center gap-3 text-center">
        <Link href="/" className="text-xl font-bold">
          시소
        </Link>
        <h1 className="text-2xl font-bold">{keyword}</h1>
        <Link
          href={`/search?q=${encodeURIComponent(keyword)}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          실시간 검색 결과 보기 →
        </Link>
      </div>

      {errorMessage && (
        <p className="text-center text-red-500 py-10">{errorMessage}</p>
      )}

      {!errorMessage && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLUMNS.map((col) => (
              <NewsColumn key={col} column={col} items={grouped[col]} />
            ))}
          </div>

          {items.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              관련 기사를 찾지 못했습니다.
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

