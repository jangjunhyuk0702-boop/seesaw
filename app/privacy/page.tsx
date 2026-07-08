import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 시소",
  description: "시소 서비스의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-16 flex flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">개인정보처리방침</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          시행일자: 2026년 7월 7일
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. 수집하는 개인정보</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          시소는 현재 회원가입, 로그인, 결제 기능을 제공하지 않으며, 이름·이메일·
          연락처 등 개인을 식별할 수 있는 정보를 별도로 수집하지 않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. 검색어 처리 방식</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          검색창에 입력한 검색어는 관련 뉴스를 가져오기 위해 네이버 뉴스 검색
          API 호출에만 사용되며, 시소 서버에 검색어나 검색 결과를 개인과 연결
          지어 별도로 저장하지 않습니다. 서비스 성능 개선을 위해 검색 결과를
          일정 시간 캐시하는 기능이 추후 추가될 수 있으며, 이 경우에도 개인을
          식별하는 정보는 포함하지 않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. 외부 서비스 연동</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          뉴스 검색 결과는 네이버 뉴스 검색 오픈API를 통해 제공받으며, 이 과정에서
          검색어가 네이버 서버로 전송됩니다. 네이버로 전송된 정보의 처리는
          네이버의 개인정보처리방침을 따릅니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">4. 쿠키 및 광고</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          시소는 서비스 운영을 위해 Google AdSense와 같은 광고 서비스를
          이용할 수 있습니다. Google을 포함한 제3자 광고 파트너는 쿠키를
          사용해 이용자의 이전 방문 기록을 바탕으로 관심사에 맞는 광고를
          게재할 수 있습니다. 이용자는{" "}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Google 광고 설정
          </a>
          에서 맞춤 광고를 비활성화할 수 있습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">5. 문의</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          개인정보처리방침에 대한 문의는{" "}
          <a
            href="mailto:jangjunhyuk0702@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            jangjunhyuk0702@gmail.com
          </a>
          으로 연락해 주세요.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">6. 방침 변경</h2>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          서비스 내용 변경에 따라 본 방침이 개정될 수 있으며, 개정 시 이
          페이지를 통해 고지합니다.
        </p>
      </section>
    </main>
  );
}
