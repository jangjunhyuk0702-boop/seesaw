import type { Metadata } from "next";
import Link from "next/link";
import { getTodayIssues } from "@/lib/searchLogs";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "오늘의 이슈 | 시소",
  description: "지금 많이 검색되는 정치·사회 이슈를 모아봤습니다.",
};

export default async function IssuesIndexPage() {
  const issues = await getTodayIssues();

  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-16 flex flex-col gap-6">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">오늘의 이슈</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          지금 많이 검색되는 정치·사회 이슈를 모아봤어요.
        </p>
      </header>

      <ul className="flex flex-col gap-2">
        {issues.map((issue) => (
          <li key={issue}>
            <Link
              href={`/issues/${encodeURIComponent(issue)}`}
              className="block rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3 hover:border-gray-400 dark:hover:border-gray-600 transition"
            >
              {issue}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
