export type Leaning =
  | "progressive"
  | "center-progressive"
  | "center"
  | "center-conservative"
  | "conservative";

export type Confidence = "high" | "medium" | "low";

export interface MediaLabel {
  press_name: string;
  domain: string;
  leaning: Leaning;
  confidence: Confidence;
  source: string;
  note: string | null;
}

export interface MediaClassification {
  domain: string;
  press_name: string;
  leaning: Leaning | "unclassified";
  confidence: Confidence | null;
  source: string | null;
  note: string | null;
}

export function extractDomain(url: string): string | null {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
  } catch {
    return null;
  }
}

export type Column = "progressive" | "center" | "conservative";

// 5단계 성향을 화면의 3단 컬럼(진보/중도/보수)으로 묶는다.
export function toColumn(leaning: Leaning): Column {
  switch (leaning) {
    case "progressive":
    case "center-progressive":
      return "progressive";
    case "conservative":
    case "center-conservative":
      return "conservative";
    case "center":
      return "center";
  }
}
