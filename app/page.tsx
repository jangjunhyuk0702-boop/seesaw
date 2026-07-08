import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import SeesawIcon from "@/components/SeesawIcon";
import { getTodayIssues } from "@/lib/searchLogs";

export const revalidate = 1800;

export default async function HomePage() {
  const issues = await getTodayIssues();

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-10 px-4 py-24">
      <div className="text-center space-y-3">
        <SeesawIcon className="w-24 sm:w-28 mx-auto mb-2" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">시소</h1>
        <p className="font-medium text-gray-700 dark:text-gray-300">
          이름처럼, 어느 한쪽으로도 기울지 않는 균형을 추구합니다
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          하나의 이슈, 서로 다른 시각 — 진보·중도·보수 뉴스를 한눈에 비교해보세요
        </p>
      </div>

      <SearchBox size="large" />

      <div className="flex flex-col items-center gap-3">
        <span className="text-xs text-gray-400">오늘의 이슈</span>
        <div className="flex flex-wrap justify-center gap-2 max-w-xl">
          {issues.map((issue) => (
            <Link
              key={issue}
              href={`/issues/${encodeURIComponent(issue)}`}
              className="px-3 py-1.5 rounded-full text-sm border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-500 dark:hover:border-gray-500 transition"
            >
              {issue}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
