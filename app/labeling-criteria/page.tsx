import type { Metadata } from "next";
import { type Leaning, type Confidence } from "@/lib/mediaBias";
import { getAllMediaLabels } from "@/lib/mediaLabels";

export const metadata: Metadata = {
  title: "성향 라벨링 기준 안내 | 시소",
  description: "시소가 언론사 성향을 분류하는 기준과 한계를 안내합니다.",
};

const LEANING_LABEL: Record<Leaning, string> = {
  progressive: "진보",
  "center-progressive": "중도진보",
  center: "중도",
  "center-conservative": "중도보수",
  conservative: "보수",
};

const LEANING_ORDER: Leaning[] = [
  "progressive",
  "center-progressive",
  "center",
  "center-conservative",
  "conservative",
];

const CONFIDENCE_LABEL: Record<Confidence, string> = {
  high: "높음",
  medium: "보통",
  low: "낮음",
};

export default async function LabelingCriteriaPage() {
  const allLabels = await getAllMediaLabels();
  const labels = [...allLabels].sort((a, b) => {
    const orderDiff =
      LEANING_ORDER.indexOf(a.leaning) - LEANING_ORDER.indexOf(b.leaning);
    if (orderDiff !== 0) return orderDiff;
    return a.press_name.localeCompare(b.press_name, "ko");
  });

  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16 flex flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">성향 라벨링 기준 안내</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          시소가 언론사 성향을 어떤 기준으로 분류했는지, 그리고 이 분류의
          한계는 무엇인지 설명합니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">분류 방법</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          언론사 성향은 빅카인즈(BigKinds) 이슈리포트의 연구진 분류·전문가
          설문 자료와, 공개된 요약정리자료(lekohoo.com)를 참고해 진보 /
          중도진보 / 중도 / 중도보수 / 보수 5단계로 1차 분류한 뒤, 화면에서는
          진보 · 중도 · 보수 3단 컬럼으로 묶어 보여줍니다. 각 분류에는 자료의
          신뢰도를 &ldquo;높음 / 보통 / 낮음&rdquo;으로 함께 표시했습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">한계와 유의사항</h2>
        <ul className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1.5">
          <li>
            언론사의 논조는 정권 교체나 경영진 변화 등에 따라 달라질 수
            있으며, 이 분류는 특정 시점의 참고 자료일 뿐 고정된 사실이
            아닙니다.
          </li>
          <li>
            진보/중도/보수라는 이분법적 구분 자체가 모든 이슈나 기사에
            들어맞지 않을 수 있으며, 그 구분 방식에도 논쟁의 여지가 있습니다.
          </li>
          <li>
            아래 목록에 없는 언론사의 기사는 임의로 성향을 추측하지 않고
            검색 결과 화면의 &ldquo;분류되지 않은 언론사&rdquo; 섹션에 별도로
            표시합니다.
          </li>
          <li>
            이 페이지의 분류는 하나의 참고 자료이며, 특정 언론사나 진영에
            대한 시소의 공식적인 평가나 주장이 아닙니다.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          전체 언론사 목록 ({labels.length}개)
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/60 text-left text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-3 py-2 font-medium">언론사</th>
                <th className="px-3 py-2 font-medium">도메인</th>
                <th className="px-3 py-2 font-medium">성향</th>
                <th className="px-3 py-2 font-medium">신뢰도</th>
                <th className="px-3 py-2 font-medium">출처</th>
                <th className="px-3 py-2 font-medium">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {labels.map((label) => (
                <tr key={label.domain}>
                  <td className="px-3 py-2 font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">
                    {label.press_name}
                  </td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {label.domain}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {LEANING_LABEL[label.leaning]}
                  </td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {CONFIDENCE_LABEL[label.confidence]}
                  </td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400">
                    {label.source}
                  </td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400">
                    {label.note || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
