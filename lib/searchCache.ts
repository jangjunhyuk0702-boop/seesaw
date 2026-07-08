import { supabase } from "@/lib/supabaseClient";
import type { NaverSearchResult } from "@/lib/naverNews";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1시간

interface SearchCacheRow {
  results_json: NaverSearchResult;
  cached_at: string;
}

export async function getCachedSearch(
  keyword: string
): Promise<NaverSearchResult | null> {
  const { data, error } = await supabase
    .from("search_cache")
    .select("results_json, cached_at")
    .eq("keyword", keyword)
    .maybeSingle();

  if (error) {
    console.error("search_cache 조회 실패:", error.message);
    return null;
  }
  if (!data) return null;

  const row = data as SearchCacheRow;
  const age = Date.now() - new Date(row.cached_at).getTime();
  if (age > CACHE_TTL_MS) return null;

  return row.results_json;
}

export async function saveSearchCache(
  keyword: string,
  result: NaverSearchResult
): Promise<void> {
  const { error } = await supabase.from("search_cache").upsert(
    {
      keyword,
      results_json: result,
      cached_at: new Date().toISOString(),
    },
    { onConflict: "keyword" }
  );

  if (error) {
    console.error("search_cache 저장 실패:", error.message);
  }
}
