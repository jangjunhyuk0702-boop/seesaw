import { classifyByUrl } from "@/lib/mediaLabels";
import type { NewsItem } from "@/lib/news";

const NAVER_NEWS_API_URL = "https://openapi.naver.com/v1/search/news.json";

interface NaverNewsRawItem {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
}

export interface NaverSearchResult {
  query: string;
  total: number;
  items: NewsItem[];
}

export class NaverNewsError extends Error {
  status: number;
  detail?: string;

  constructor(message: string, status: number, detail?: string) {
    super(message);
    this.name = "NaverNewsError";
    this.status = status;
    this.detail = detail;
  }
}

// 네이버 API는 검색어 하이라이트를 위해 <b> 태그와 HTML 엔티티를 포함해서 내려준다.
function stripHtml(text: string): string {
  return text
    .replace(/<\/?b>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'");
}

export interface SearchNaverNewsOptions {
  display?: string;
  sort?: string;
  // 지정하면 Next.js의 fetch 캐시(ISR)를 사용하고, 지정하지 않으면 항상
  // 새로 요청한다(실시간 검색 화면용 기본 동작).
  next?: { revalidate?: number | false };
}

export async function searchNaverNews(
  query: string,
  options: SearchNaverNewsOptions = {}
): Promise<NaverSearchResult> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new NaverNewsError(
      "네이버 API 키가 설정되지 않았습니다. .env.local에 NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 값을 채워주세요.",
      503
    );
  }

  const naverUrl = new URL(NAVER_NEWS_API_URL);
  naverUrl.searchParams.set("query", query);
  naverUrl.searchParams.set("display", options.display ?? "50");
  naverUrl.searchParams.set("sort", options.sort ?? "sim");

  let response: Response;
  try {
    response = await fetch(naverUrl, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      ...(options.next ? { next: options.next } : { cache: "no-store" }),
    });
  } catch {
    throw new NaverNewsError(
      "네이버 뉴스 API 호출 중 네트워크 오류가 발생했습니다.",
      502
    );
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new NaverNewsError(
      `네이버 뉴스 API 호출 실패 (${response.status})`,
      response.status,
      detail
    );
  }

  const data: { total?: number; items?: NaverNewsRawItem[] } =
    await response.json();

  const items: NewsItem[] = await Promise.all(
    (data.items ?? []).map(async (item) => {
      const classification = await classifyByUrl(
        item.originallink || item.link
      );
      return {
        title: stripHtml(item.title),
        description: stripHtml(item.description),
        originallink: item.originallink,
        link: item.link,
        pubDate: item.pubDate,
        ...classification,
      };
    })
  );

  return {
    query,
    total: data.total ?? items.length,
    items,
  };
}
