# 프로젝트: 시소 (Seesaw) — 정치성향별 뉴스 비교 서비스

## 프로젝트 개요
정치·사회 이슈를 검색하면, 그 이슈에 대한 뉴스 기사를 진보/중도/보수 성향별로
3단 컬럼에 나눠서 보여주는 뉴스 큐레이션 웹사이트. 언론사 링크 모음이 아니라
"하나의 사건 → 여러 시각 비교"가 핵심 차별점.

## 기술 스택
- 프레임워크: Next.js (App Router), TypeScript
- 스타일: Tailwind CSS
- 데이터베이스: Supabase (Postgres)
- 배포: Vercel
- 외부 API: 네이버 뉴스 검색 오픈API (`openapi.naver.com/v1/search/news.json`)

## 데이터 모델 (Supabase)

### `media_labels` 테이블
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid (PK) | |
| press_name | text | 언론사명 |
| domain | text (unique) | 도메인 (예: hani.co.kr) |
| leaning | text | progressive / center / conservative / center-progressive / center-conservative |
| confidence | text | high / medium / low |
| source | text | 라벨 근거 출처 |
| note | text | 비고 (성향 변동 가능성 등) |

- 초기 시드 데이터: `media_bias_labels.csv` (별첨, 27개 언론사) — 프로젝트 시작 시
  이 파일을 그대로 시드 데이터로 삽입할 것.
- 이 테이블에 없는 도메인의 기사는 절대 임의로 성향을 추측해서 넣지 말고
  `leaning = 'unclassified'`로 처리하고 화면 하단 별도 섹션에 표시할 것.

### `search_cache` 테이블 (선택, 성능/API 호출 절약용)
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid (PK) | |
| keyword | text | 검색어 |
| results_json | jsonb | 네이버 API 응답 캐시 |
| cached_at | timestamptz | 캐시 생성 시각 (1시간 이상 지나면 재조회) |

## 핵심 기능 (우선순위 순)

1. **홈 화면**: 중앙 큰 검색창 + 아래 인기 검색어/오늘의 이슈 태그
2. **검색 결과 화면**: 네이버 뉴스 API 호출 → `media_labels`와 도메인 매칭 →
   진보/중도/보수 3단 컬럼(데스크톱) / 스와이프 탭(모바일)으로 렌더링
   - 카드 구성: 언론사명, 기사 제목, 요약 1~2줄, 발행 시각, "원문 보기" 버튼(새 탭 링크)
   - 기사 본문 전체 스크래핑/재게시 절대 금지. API가 주는 title/description까지만 사용.
3. **오늘의 이슈 모아보기**: 인기 검색어 몇 개를 정적/ISR 페이지로 생성 (SEO용,
   Google 크롤러가 검색 없이도 콘텐츠를 읽을 수 있게)
4. **성향 라벨링 기준 안내 페이지**: 라벨 출처와 한계(정권별 논조 변화 가능성,
   이분법 자체의 논쟁 여지)를 명시. 메인 화면 하단에 항상 링크 노출.
5. **필수 정적 페이지**: 소개(About), 개인정보처리방침, 이용약관

## 디자인 가이드
- 색상: 진보 = 파란색 계열, 보수 = 빨간색 계열, 중도 = 회색/보라 계열
  (한국 정당 색상 관례를 따름)
- 톤: 깔끔하고 중립적인 뉴스 서비스 느낌. 특정 진영을 편드는 것처럼 보이는
  디자인 요소(로고, 슬로건 등) 사용 금지.
- 반응형 필수 (모바일 우선 고려)

## 절대 하지 말아야 할 것
- 기사 본문 전체 재게시 (저작권 문제)
- 미분류 언론사에 임의로 성향 라벨 붙이기
- 특정 진영을 편드는 것으로 보일 수 있는 문구/디자인
- 1차 버전에서 회원가입/로그인/결제 기능 구현 (스코프 아님)
- AI를 이용한 기사 재요약 (저작권 리스크로 1차 버전 제외)

## 환경변수 (추후 입력 예정, .env.local)
```
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
