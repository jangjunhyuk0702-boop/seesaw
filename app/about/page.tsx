import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 | 시소",
  description: "시소가 어떤 서비스인지, 왜 만들었는지 소개합니다.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-16 flex flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">시소 소개</h1>
        <p className="text-gray-500 dark:text-gray-400">
          하나의 이슈, 서로 다른 시각을 한눈에 비교하는 뉴스 큐레이션 서비스입니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">왜 시소인가요?</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          시소는 한쪽이 무거워지면 반대쪽으로 기울어지지만, 결국 가운데 축을
          중심으로 균형을 이루는 놀이기구입니다. 그 이름처럼, 어느 한쪽 시각에
          치우치지 않고 균형 잡힌 시선으로 이슈를 바라보자는 뜻을 담았습니다.
        </p>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          같은 사건이라도 언론사마다 강조하는 지점과 논조가 다릅니다. 시소는 하나의
          검색어로 진보·중도·보수 성향 언론사의 기사를 나란히 보여줘서, 한쪽 시각에
          치우치지 않고 이슈를 더 균형 있게 파악할 수 있도록 돕습니다. 특정 언론사
          링크만 모아두는 것이 아니라, &ldquo;하나의 사건 → 여러 시각 비교&rdquo;가
          시소의 핵심입니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">어떻게 동작하나요?</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          검색어를 입력하면 네이버 뉴스 검색 API로 관련 기사를 가져온 뒤, 기사를
          게재한 언론사의 도메인을 기준으로 성향을 분류해 진보·중도·보수 3단
          컬럼에 나눠 보여줍니다. 미리 정리해둔 언론사 성향 목록에 없는 도메인은
          임의로 추측하지 않고 &ldquo;분류되지 않은 언론사&rdquo; 섹션에 따로
          표시합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">유의할 점</h2>
        <ul className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1.5">
          <li>
            기사 본문 전체가 아닌, 네이버 API가 제공하는 제목과 요약만 보여주며
            저작권을 존중하기 위해 본문을 재게시하지 않습니다.
          </li>
          <li>
            언론사 성향 분류는 절대적인 사실이 아니라 참고용 분류이며, 시기나
            사안에 따라 논조가 달라질 수 있습니다.
          </li>
          <li>
            진보/중도/보수라는 이분법적 구분 자체에도 논쟁의 여지가 있을 수
            있습니다.
          </li>
          <li>AI를 이용한 기사 재요약은 저작권 문제로 제공하지 않습니다.</li>
          <li>
            시소는 특정 진영을 지지하거나 대변하지 않는 중립적인 도구를
            지향합니다.
          </li>
        </ul>
      </section>
    </main>
  );
}
