import { supabase } from "@/lib/supabaseClient";

// "오늘의 이슈" 화면이 텅 비어 보이지 않도록, 실제 검색 로그가 부족할 때 채워 넣는 기본 이슈 목록.
const FALLBACK_ISSUES = [
  "연금개혁",
  "전세사기 대책",
  "기후위기 대응",
  "부동산 정책",
  "노동시간 개편",
  "저출생 대책",
];

const LOG_WINDOW_DAYS = 7;
const ISSUE_COUNT = 6;

export async function logSearch(keyword: string): Promise<void> {
  const { error } = await supabase.from("search_logs").insert({ keyword });
  if (error) {
    console.error("search_logs 기록 실패:", error.message);
  }
}

export async function getTodayIssues(): Promise<string[]> {
  const since = new Date(
    Date.now() - LOG_WINDOW_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data, error } = await supabase
    .from("search_logs")
    .select("keyword")
    .gte("searched_at", since);

  if (error) {
    console.error("search_logs 조회 실패:", error.message);
    return FALLBACK_ISSUES.slice(0, ISSUE_COUNT);
  }

  const counts = new Map<string, number>();
  for (const row of data as { keyword: string }[]) {
    counts.set(row.keyword, (counts.get(row.keyword) ?? 0) + 1);
  }

  const ranked = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([keyword]) => keyword);

  const merged = [...ranked];
  for (const fallback of FALLBACK_ISSUES) {
    if (merged.length >= ISSUE_COUNT) break;
    if (!merged.includes(fallback)) merged.push(fallback);
  }

  return merged.slice(0, ISSUE_COUNT);
}
