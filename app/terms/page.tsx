import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | 시소",
  description: "시소 서비스의 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-16 flex flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">이용약관</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          시행일자: 2026년 7월 7일
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제1조 (목적)</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          이 약관은 시소(이하 &ldquo;서비스&rdquo;)가 제공하는 뉴스 큐레이션
          서비스의 이용 조건과 절차, 이용자와 서비스 제공자의 권리·의무를
          정하는 것을 목적으로 합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제2조 (서비스의 내용)</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          서비스는 검색어에 대해 네이버 뉴스 검색 API로부터 받아온 기사의
          제목, 요약, 발행 시각, 원문 링크를 언론사 성향별로 분류해 보여줍니다.
          기사 본문 전체를 게재하거나 재배포하지 않으며, 원문은 각 언론사의
          웹사이트로 연결되는 링크를 통해서만 확인할 수 있습니다. 서비스는
          현재 회원가입, 로그인, 결제 기능을 제공하지 않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제3조 (저작권)</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          서비스에 노출되는 기사 제목, 요약, 이미지 등의 저작권은 해당 언론사
          및 원저작자에게 있습니다. 서비스는 네이버 뉴스 검색 API가 제공하는
          범위 내에서만 콘텐츠를 인용하며, 이를 임의로 가공하거나 재요약하지
          않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제4조 (언론사 성향 분류에 대한 면책)</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          서비스가 제공하는 진보·중도·보수 성향 분류는 공개된 자료를 참고한
          분류로, 절대적이거나 확정적인 평가가 아닙니다. 언론사의 논조는
          시기와 사안에 따라 달라질 수 있으며, 서비스는 이 분류로 인해 발생하는
          어떠한 판단이나 결과에 대해서도 법적 책임을 지지 않습니다. 자세한
          기준은 성향 라벨링 기준 안내 페이지를 참고해 주세요.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제5조 (서비스의 변경 및 중단)</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          서비스 제공자는 운영상, 기술상의 필요에 따라 서비스의 전부 또는
          일부를 변경하거나 중단할 수 있으며, 이 경우 서비스 내 공지를 통해
          안내합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제6조 (이용자의 의무)</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          이용자는 서비스를 통해 얻은 정보를 관련 법령과 저작권을 준수하는
          범위 내에서 이용해야 하며, 서비스가 제공하는 콘텐츠를 무단으로
          복제·배포해서는 안 됩니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제7조 (약관의 변경)</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          이 약관은 서비스 내용 변경에 따라 개정될 수 있으며, 개정 시 이
          페이지를 통해 고지합니다.
        </p>
      </section>
    </main>
  );
}
