import { NextRequest, NextResponse } from "next/server";
import { NaverNewsError, searchNaverNews } from "@/lib/naverNews";
import { getCachedSearch, saveSearchCache } from "@/lib/searchCache";
import { logSearch } from "@/lib/searchLogs";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")?.trim();

  if (!query) {
    return NextResponse.json(
      { error: "query 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  const display = request.nextUrl.searchParams.get("display") ?? undefined;
  const sort = request.nextUrl.searchParams.get("sort") ?? undefined;
  // display/sort를 기본값 그대로 쓰는 요청(=실제 검색 화면)만 캐시를 적용한다.
  const useCache = !display && !sort;

  try {
    const cached = useCache ? await getCachedSearch(query) : null;
    const result = cached ?? (await searchNaverNews(query, { display, sort }));

    if (useCache && !cached) {
      await saveSearchCache(query, result);
    }

    await logSearch(query);
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof NaverNewsError) {
      return NextResponse.json(
        { error: err.message, detail: err.detail },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { error: "알 수 없는 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
