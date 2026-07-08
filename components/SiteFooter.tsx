import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-400 dark:text-gray-500">
        <Link href="/about" className="hover:underline">
          소개
        </Link>
        <Link href="/issues" className="hover:underline">
          오늘의 이슈
        </Link>
        <Link href="/privacy" className="hover:underline">
          개인정보처리방침
        </Link>
        <Link href="/terms" className="hover:underline">
          이용약관
        </Link>
        <Link href="/labeling-criteria" className="hover:underline">
          성향 라벨링 기준 안내
        </Link>
      </div>
    </footer>
  );
}
