import { supabase } from "@/lib/supabaseClient";
import {
  extractDomain,
  type MediaClassification,
  type MediaLabel,
} from "@/lib/mediaBias";

let cachedLabels: MediaLabel[] | null = null;
let cachedAt = 0;
let inFlight: Promise<MediaLabel[]> | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

// 한 번의 검색 요청 안에서 기사 여러 건을 동시에 분류할 때, 캐시가 비어있는
// 상태에서 Supabase에 중복 요청이 나가지 않도록 진행 중인 조회를 공유한다.
export async function getAllMediaLabels(): Promise<MediaLabel[]> {
  const now = Date.now();
  if (cachedLabels && now - cachedAt < CACHE_TTL_MS) {
    return cachedLabels;
  }

  if (!inFlight) {
    inFlight = (async () => {
      const { data, error } = await supabase
        .from("media_labels")
        .select("press_name, domain, leaning, confidence, source, note");

      if (error) {
        throw new Error(`media_labels 조회 실패: ${error.message}`);
      }

      cachedLabels = data as MediaLabel[];
      cachedAt = Date.now();
      return cachedLabels;
    })().finally(() => {
      inFlight = null;
    });
  }

  return inFlight;
}

// hostname은 도메인 그대로거나 news.hani.co.kr 처럼 서브도메인이 붙어있을 수 있어
// 등록된 도메인으로 끝나는지(suffix)까지 확인한다.
function findLabelByDomain(
  hostname: string,
  domainMap: Map<string, MediaLabel>
): MediaLabel | null {
  const exact = domainMap.get(hostname);
  if (exact) return exact;

  for (const [domain, label] of domainMap) {
    if (hostname.endsWith(`.${domain}`)) {
      return label;
    }
  }
  return null;
}

export async function classifyByUrl(url: string): Promise<MediaClassification> {
  const domain = extractDomain(url);

  if (!domain) {
    return {
      domain: "",
      press_name: "알 수 없음",
      leaning: "unclassified",
      confidence: null,
      source: null,
      note: null,
    };
  }

  const labels = await getAllMediaLabels();
  const domainMap = new Map(
    labels.map((label) => [label.domain.toLowerCase(), label])
  );
  const label = findLabelByDomain(domain, domainMap);

  if (!label) {
    return {
      domain,
      press_name: domain,
      leaning: "unclassified",
      confidence: null,
      source: null,
      note: null,
    };
  }

  return {
    domain: label.domain,
    press_name: label.press_name,
    leaning: label.leaning,
    confidence: label.confidence,
    source: label.source,
    note: label.note,
  };
}
