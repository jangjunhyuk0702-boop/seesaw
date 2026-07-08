-- media_labels: 언론사 성향 시드 데이터 (media_bias_labels.json 기준, 28개)
create table if not exists public.media_labels (
  id uuid primary key default gen_random_uuid(),
  press_name text not null,
  domain text not null unique,
  leaning text not null,
  confidence text not null,
  source text not null,
  note text
);

alter table public.media_labels enable row level security;

create policy "media_labels are publicly readable"
  on public.media_labels
  for select
  to anon, authenticated
  using (true);

insert into public.media_labels (press_name, domain, leaning, confidence, source, note)
values
  ('한겨레', 'hani.co.kr', 'progressive', 'high', 'BigKinds 이슈리포트(빅카인즈 연구진 분류 + 전문가 설문)', '진보 성향 최상위로 분류됨'),
  ('경향신문', 'khan.co.kr', 'progressive', 'high', 'BigKinds 이슈리포트', NULL),
  ('오마이뉴스', 'ohmynews.com', 'progressive', 'medium', '요약정리자료(lekohoo.com)', '인터넷 중심 진보 매체'),
  ('프레시안', 'pressian.com', 'progressive', 'medium', '요약정리자료(lekohoo.com)', '인터넷 중심 진보 매체'),
  ('KBS', 'kbs.co.kr', 'progressive', 'low', 'BigKinds 이슈리포트', '공영방송·정권별 논조 변화 가능성 있음(요약정리자료 지적)'),
  ('MBC', 'mbc.co.kr', 'progressive', 'medium', 'BigKinds 이슈리포트', '과거 정권별 보도국 인사 개입 논란 있었음(요약정리자료)'),
  ('YTN', 'ytn.co.kr', 'progressive', 'low', 'BigKinds 이슈리포트', '정부 성향에 따라 논조 변화 있다는 지적 있음(요약정리자료)'),
  ('JTBC', 'jtbc.co.kr', 'center-progressive', 'medium', '요약정리자료(lekohoo.com)', '중앙일보 계열이나 보도 논조는 진보~중도로 평가되는 경우 많음'),
  ('조선일보', 'chosun.com', 'conservative', 'high', 'BigKinds 이슈리포트', '보수 성향 최상위로 분류됨'),
  ('중앙일보', 'joongang.co.kr', 'conservative', 'medium', 'BigKinds 이슈리포트', '최근 다소 중도적 논조 평가도 있음(요약정리자료)'),
  ('동아일보', 'donga.com', 'conservative', 'high', 'BigKinds 이슈리포트', NULL),
  ('문화일보', 'munhwa.com', 'conservative', 'medium', '요약정리자료(lekohoo.com)', NULL),
  ('한국경제', 'hankyung.com', 'conservative', 'high', 'BigKinds 이슈리포트', '경제지·친기업 성향'),
  ('서울경제', 'sedaily.com', 'conservative', 'high', 'BigKinds 이슈리포트', NULL),
  ('헤럴드경제', 'heraldcorp.com', 'conservative', 'high', 'BigKinds 이슈리포트', NULL),
  ('아시아경제', 'asiae.co.kr', 'conservative', 'high', 'BigKinds 이슈리포트', NULL),
  ('국민일보', 'kmib.co.kr', 'conservative', 'high', 'BigKinds 이슈리포트', NULL),
  ('세계일보', 'segye.com', 'conservative', 'high', 'BigKinds 이슈리포트', NULL),
  ('머니투데이', 'mt.co.kr', 'conservative', 'medium', 'BigKinds 이슈리포트', NULL),
  ('매일경제', 'mk.co.kr', 'conservative', 'medium', '요약정리자료(lekohoo.com)', NULL),
  ('매일신문', 'imaeil.com', 'conservative', 'medium', 'BigKinds 이슈리포트', NULL),
  ('영남일보', 'yeongnam.com', 'conservative', 'medium', 'BigKinds 이슈리포트', NULL),
  ('연합뉴스', 'yna.co.kr', 'center', 'low', '요약정리자료(lekohoo.com)', '국가기간통신사·정부 성향 따라 논조 변화 가능성 지적됨'),
  ('서울신문', 'seoul.co.kr', 'center', 'low', '요약정리자료(lekohoo.com)', '공기업 주요주주·정부 정책 영향 가능성 지적됨'),
  ('SBS', 'sbs.co.kr', 'center', 'medium', '요약정리자료(lekohoo.com)', '지상파 중 유일한 민영방송·비교적 중립 평가'),
  ('MBN', 'mbn.co.kr', 'center-conservative', 'medium', '요약정리자료(lekohoo.com)', '경제지 계열이나 정치 이슈에서는 비교적 중도적'),
  ('채널A', 'ichannela.com', 'conservative', 'medium', '요약정리자료(lekohoo.com)', 'TV조선보다 온건한 보수로 평가'),
  ('TV조선', 'tvchosun.com', 'conservative', 'high', '요약정리자료(lekohoo.com)', '종편 중 가장 강한 보수 논조로 평가')
on conflict (domain) do update set
  press_name = excluded.press_name,
  leaning = excluded.leaning,
  confidence = excluded.confidence,
  source = excluded.source,
  note = excluded.note;

-- search_cache: 네이버 API 응답 캐시 (성능/호출 절약용)
create table if not exists public.search_cache (
  id uuid primary key default gen_random_uuid(),
  keyword text not null unique,
  results_json jsonb not null,
  cached_at timestamptz not null default now()
);

alter table public.search_cache enable row level security;

create policy "search_cache is publicly readable"
  on public.search_cache
  for select
  to anon, authenticated
  using (true);

create policy "search_cache is publicly writable"
  on public.search_cache
  for insert
  to anon, authenticated
  with check (true);

create policy "search_cache is publicly updatable"
  on public.search_cache
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- search_logs: "오늘의 이슈" 인기 검색어 집계를 위한 검색 이벤트 로그
create table if not exists public.search_logs (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  searched_at timestamptz not null default now()
);

create index if not exists search_logs_keyword_searched_at_idx
  on public.search_logs (keyword, searched_at desc);

alter table public.search_logs enable row level security;

create policy "search_logs are publicly readable"
  on public.search_logs
  for select
  to anon, authenticated
  using (true);

create policy "search_logs are publicly writable"
  on public.search_logs
  for insert
  to anon, authenticated
  with check (true);
