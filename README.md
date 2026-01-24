# React Router FSD Scaffold

React Router 7 기반의 Feature-Sliced Design(FSD) 아키텍처를 적용한 프론트엔드 프로젝트입니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [개발 환경 설정](#개발-환경-설정)
- [프로젝트 실행](#프로젝트-실행)
- [코드 품질 관리](#코드-품질-관리)
- [테스팅](#테스팅)
- [빌드 및 배포](#빌드-및-배포)
- [Docker 배포](#docker-배포)
- [주요 명령어](#주요-명령어)
- [프로젝트 구조](#프로젝트-구조)

## 프로젝트 개요

이 프로젝트는 다음과 같은 특징을 가지고 있습니다:

- **React Router 7**: UI·데이터(loader/action)·에러·메타·SSR를 통합 관리하는 라우팅 프레임워크
- **Feature-Sliced Design**: 확장 가능한 아키텍처 패턴
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **TanStack Query**: 서버 상태 관리
- **i18next**: 다국어 지원 (ko, en, ja)
- **MSW**: API 모킹

## 기술 스택

### 핵심 버전

- **Node.js**: `24.13.0` (.nvmrc에 명시)
- **pnpm**: `10.22.0` (package.json의 packageManager 필드에 명시)
- **React**: `19.2.3`
- **TypeScript**: `5.9.3`

### 주요 라이브러리

- **React Router**: `7.12.0`
- **TanStack Query**: `5.90.19`
- **Tailwind CSS**: `4.1.18`
- **Zod**: `4.3.5`

## 개발 환경 설정

### 1. Node.js 설치 (nvm 사용)

```bash
# nvm 설치 (아직 설치하지 않은 경우)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# nvm 활성화 (새 터미널을 열거나 다음 명령어 실행)
source ~/.bashrc  # 또는 source ~/.zshrc

# 프로젝트에 지정된 Node.js 버전 설치 및 사용
nvm install
nvm use

# 설치 확인
node --version  # v24.13.0 출력되어야 함
```

### 2. Corepack 활성화

Corepack은 Node.js에 내장된 패키지 매니저 관리 도구입니다. 프로젝트에 지정된 pnpm 버전을 자동으로 사용합니다.

```bash
# Corepack 활성화
corepack enable

# 프로젝트의 pnpm 버전 확인 (10.22.0이 자동으로 사용됨)
pnpm --version
```

### 3. 의존성 설치

```bash
# 패키지 설치
pnpm install

# 설치 후 자동으로 lefthook이 설치됩니다 (postinstall 스크립트)
```

### 4. Playwright 설정 (E2E 테스트용)

```bash
# WSL2/Linux 환경인 경우
sudo apt-get update
pnpm exec playwright install --with-deps

# macOS/Windows는 deps 없이 설치
pnpm exec playwright install
```

## 프로젝트 실행

### 개발 서버

```bash
# 일반 개발 서버 실행
pnpm dev

# MSW(Mock Service Worker) 활성화하여 실행
pnpm dev:msw
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

### Storybook

```bash
# Storybook 개발 서버 실행
pnpm storybook

# Storybook은 http://localhost:6006에서 실행됩니다
```

## 코드 품질 관리

### ESLint 설정

프로젝트는 다음과 같은 ESLint 규칙을 적용합니다:

- **TypeScript ESLint**: TypeScript 권장 규칙
- **React**: React 권장 규칙 및 Hooks 규칙
- **JSX A11y**: 접근성 규칙
- **Import**: import 순서 및 구조 규칙
- **TanStack Query**: React Query 사용 규칙
- **FSD Lint**: Feature-Sliced Design 아키텍처 규칙
- **Prettier**: 코드 포맷팅 규칙

### Prettier 설정

- Tailwind CSS 클래스 자동 정렬
- 일관된 코드 스타일 유지

### Lefthook (Git Hooks)

프로젝트는 Lefthook을 사용하여 커밋 전에 자동으로 코드 품질을 검사합니다.

#### Pre-commit 훅 동작

커밋 시 다음 작업이 **자동으로 병렬 실행**됩니다:

1. **ESLint 자동 수정**: staged 파일에 대해 `pnpm lint:fix` 실행
2. **Prettier 자동 포맷팅**: staged 파일에 대해 `pnpm prettier:write` 실행
3. **자동 스테이징**: 수정된 파일이 자동으로 다시 스테이징됨 (`stage_fixed: true`)

이를 통해 다음을 보장합니다:

- 코드 스타일 일관성 유지
- 린트 에러 자동 수정
- 포맷팅 규칙 자동 적용
- 팀 전체의 코드 컨벤션 유지

#### 수동 실행

```bash
# ESLint 검사
pnpm lint

# ESLint 자동 수정
pnpm lint:fix

# Prettier 포맷팅
pnpm prettier:write <파일명>
```

## 테스팅

프로젝트는 세 가지 레벨의 테스트를 지원합니다:

### 1. 단위/통합 테스트 (Vitest)

**도구**: Vitest + React Testing Library

**특징**:
- jsdom 환경에서 실행
- React 컴포넌트 및 유틸리티 함수 테스트
- `*.test.ts(x)` 파일 패턴 인식
- `*.e2e.*` 및 `/tests` 디렉토리 제외

**실행**:
```bash
# Watch 모드로 테스트 실행
pnpm test

# 단일 실행
pnpm vitest run

# 커버리지 리포트
pnpm vitest --coverage
```

### 2. E2E 테스트 (Playwright)

**도구**: Playwright

**특징**:
- 실제 브라우저(Chromium, Firefox, WebKit)에서 테스트
- `*.e2e.{ts,tsx,js,jsx}` 파일 패턴 인식
- 자동 개발 서버 시작 (`webServer` 설정)
- 병렬 실행 지원

**실행**:
```bash
# 모든 브라우저에서 E2E 테스트 실행
pnpm test:e2e

# 특정 브라우저만 실행
pnpm exec playwright test --project=chromium

# UI 모드로 실행
pnpm exec playwright test --ui

# 리포트 보기
pnpm exec playwright show-report
```

### 3. 컴포넌트 문서화 (Storybook)

**도구**: Storybook

**특징**:
- 컴포넌트 독립적 개발 및 테스트
- Interaction Testing 지원
- 자동 문서 생성 (autodocs)

**실행**:
```bash
# Storybook 개발 서버
pnpm storybook

# Storybook 정적 빌드
pnpm build:storybook
```

## 빌드 및 배포

### 로컬 빌드

```bash
# 타입 생성 + TypeScript 컴파일 + 프로덕션 빌드
pnpm build

# 빌드 결과물은 dist/ 디렉토리에 생성됩니다
```

### 로컬 실행

```bash
# SPA 모드로 빌드된 애플리케이션 미리보기
pnpm preview

# Node.js SSR 서버로 빌드된 앱 실행
pnpm start
```

### Storybook 빌드

```bash
# Storybook 정적 파일 생성
pnpm build:storybook

# storybook-static/ 디렉토리에 생성됩니다
```

---

## Docker 배포

프로젝트는 SPA와 SSR 두 가지 배포 방식을 지원합니다.

### 환경별 설정

배포 시 `ENVIRONMENT` 환경 변수를 통해 환경을 선택합니다:
- `dev`: 개발 환경 (`.env.dev` 사용)
- `stg`: 스테이징 환경 (`.env.stg` 사용)
- `prod`: 프로덕션 환경 (`.env.prod` 사용)

각 환경에 맞는 `.env.dev`, `.env.stg`, `.env.prod` 파일을 프로젝트 루트에 준비해야 합니다.

### SPA 배포 (deployment/spa)

**특징:**
- Nginx 1.27-alpine 기반 정적 파일 서빙
- SPA 폴백 라우팅 (`__spa-fallback.html`)
- 다국어 파일 및 정적 자원 캐시 최적화

**실행 방법:**

```bash
# 프로젝트 루트에서 실행

# 개발 환경
ENVIRONMENT=dev docker-compose -f deployment/spa/docker-compose.yml up --build

# 스테이징 환경
ENVIRONMENT=stg docker-compose -f deployment/spa/docker-compose.yml up --build

# 프로덕션 환경
ENVIRONMENT=prod docker-compose -f deployment/spa/docker-compose.yml up --build
```

**접속:** `http://localhost:8080`

**컨테이너 중지:**
```bash
docker-compose -f deployment/spa/docker-compose.yml down
```

### SSR 배포 (deployment/ssr)

**특징:**
- Node.js 24.13.0-alpine 기반 서버 사이드 렌더링
- React Router SSR 지원
- 동적 콘텐츠 및 SEO 최적화

**실행 방법:**

```bash
# 프로젝트 루트에서 실행

# 개발 환경
ENVIRONMENT=dev docker-compose -f deployment/ssr/docker-compose.yml up --build

# 스테이징 환경
ENVIRONMENT=stg docker-compose -f deployment/ssr/docker-compose.yml up --build

# 프로덕션 환경
ENVIRONMENT=prod docker-compose -f deployment/ssr/docker-compose.yml up --build
```

**접속:** `http://localhost:8080`

**컨테이너 중지:**
```bash
docker-compose -f deployment/ssr/docker-compose.yml down
```

### 배포 방식 선택 가이드

| 구분 | SPA | SSR |
|------|-----|-----|
| **렌더링** | 클라이언트 사이드 | 서버 사이드 + 하이드레이션 |
| **SEO** | 제한적 (크롤러 지원 필요) | 우수 (초기 HTML 제공) |
| **초기 로딩** | 느림 (JS 다운로드 후 렌더링) | 빠름 (HTML 즉시 표시) |
| **서버 리소스** | 낮음 (정적 파일만) | 중간 (Node.js 런타임 필요) |
| **캐싱** | 매우 쉬움 (CDN) | 복잡함 (동적 콘텐츠) |
| **추천 사용 사례** | 관리자 페이지, 대시보드, SaaS | 마케팅 사이트, 블로그, 커머스 |

### 배포 설정 변경 방법

#### 1. Basename 변경

basename은 애플리케이션이 도메인의 서브 경로에 배포될 때 사용하는 prefix입니다.

**설정 위치:**
- `.env` 파일
- `react-router.config.ts` 파일
- `docker-compose.yml` 파일

**변경 방법:**

1. `.env` 파일에서 `VITE_BASE_NAME` 환경 변수를 수정합니다:

```bash
# 루트 경로에 배포하는 경우 (예: example.com/)
VITE_BASE_NAME=/

# 서브 경로에 배포하는 경우 (예: example.com/my-app/)
VITE_BASE_NAME=/my-app
```

#### 2. Prerender 경로 변경

prerender는 빌드 시점에 HTML을 미리 생성할 경로 목록입니다. SSR이 비활성화된 경우에도 SEO를 위해 특정 경로를 정적으로 생성할 수 있습니다.

**설정 위치:**
- `react-router.config.ts` 파일
- `deployment/spa/docker-compose.yml` 파일 (SPA 배포 시)

**변경 방법:**

1. `react-router.config.ts`에서 `prerender` 배열을 수정합니다:

```tsx
// 기본 설정 (루트, 한국어, 영어)
prerender: ['/', '/ko', '/en']

// 추가 경로 포함
prerender: ['/', '/ko', '/en', '/ja', '/about', '/products']

// 빈 배열로 설정하여 prerender 비활성화
prerender: []
```

2. **SPA 배포 시**, `deployment/spa/docker-compose.yml`에서 `SPA_FALLBACK` 설정을 변경합니다:

```12:16:deployment/spa/docker-compose.yml
        # React Router prerender 설정에 따라 변경
        #   - prerender에 '/' 포함: __spa-fallback.html
        #   - prerender에 '/' 미포함: index.html
        # https://reactrouter.com/how-to/pre-rendering#pre-rendering-with-a-spa-fallback
        SPA_FALLBACK: __spa-fallback.html
```

**주의사항:**
- prerender는 `ssr: false` 모드에서 유용합니다 (SPA 배포 시)
- 동적 라우트(예: `/posts/:id`)는 prerender 목록에 구체적인 ID를 명시해야 합니다
- prerender 경로가 많을수록 빌드 시간이 증가합니다
- **중요**: `prerender` 배열에 `'/'` 경로가 포함되어 있으면 `SPA_FALLBACK`을 `__spa-fallback.html`로 설정해야 하고, `'/'`가 없으면 `index.html`로 설정해야 합니다. 이 설정이 맞지 않으면 라우팅이 정상적으로 동작하지 않을 수 있습니다

#### 3. SSR 모드 전환

`react-router.config.ts`에서 `ssr` 값을 변경하여 SSR 모드를 켜거나 끌 수 있습니다:

```typescript
// SPA 모드 (클라이언트 사이드 렌더링)
ssr: false

// SSR 모드 (서버 사이드 렌더링)
ssr: true
```

**SSR 모드 변경 시 주의사항:**
- `ssr: true`로 변경 시 `deployment/ssr/` Docker 설정을 사용해야 합니다
- `ssr: false`로 변경 시 `deployment/spa/` Docker 설정을 사용해야 합니다

## 주요 명령어

### 개발

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 (localhost:5173) |
| `pnpm dev:msw` | MSW 활성화하여 개발 서버 실행 |
| `pnpm storybook` | Storybook 실행 (localhost:6006) |

### 코드 품질

| 명령어 | 설명 |
|--------|------|
| `pnpm lint` | ESLint 검사 |
| `pnpm lint:fix` | ESLint 자동 수정 |
| `pnpm prettier:write` | Prettier 포맷팅 |

### 테스트

| 명령어 | 설명 |
|--------|------|
| `pnpm test` | Vitest 단위 테스트 실행 (watch 모드) |
| `pnpm test:e2e` | Playwright E2E 테스트 실행 |

### 빌드

| 명령어 | 설명 |
|--------|------|
| `pnpm build` | 프로덕션 빌드 |
| `pnpm build:storybook` | Storybook 정적 빌드 |
| `pnpm preview` | 빌드 결과물 미리보기 (SPA) |
| `pnpm start` | 프로덕션 서버 실행 (SSR) |

### Docker 배포

| 명령어 | 설명 |
|--------|------|
| `ENVIRONMENT=dev docker-compose -f deployment/spa/docker-compose.yml up --build` | SPA 개발 환경 배포 |
| `ENVIRONMENT=stg docker-compose -f deployment/spa/docker-compose.yml up --build` | SPA 스테이징 환경 배포 |
| `ENVIRONMENT=prod docker-compose -f deployment/spa/docker-compose.yml up --build` | SPA 프로덕션 환경 배포 |
| `ENVIRONMENT=dev docker-compose -f deployment/ssr/docker-compose.yml up --build` | SSR 개발 환경 배포 |
| `ENVIRONMENT=stg docker-compose -f deployment/ssr/docker-compose.yml up --build` | SSR 스테이징 환경 배포 |
| `ENVIRONMENT=prod docker-compose -f deployment/ssr/docker-compose.yml up --build` | SSR 프로덕션 환경 배포 |

### 기타

| 명령어 | 설명 |
|--------|------|
| `pnpm generate:api` | Orval을 사용한 API 클라이언트 생성 |

## 프로젝트 구조

```
react-router-fsd-scaffold/
├── src/
│   ├── app/                   # 앱 전역 (entry, root, 라우트, 스타일 등)
│   │   ├── routes.ts          # 라우트 설정 (react-router)
│   │   ├── root.tsx
│   │   ├── entry.client.tsx
│   │   ├── entry.server.tsx
│   │   ├── style/             # 전역 스타일
│   │   ├── lib/
│   │   └── plugin/
│   ├── pages/                 # 웹/앱의 화면(screen) 또는 액티비티(activity)
│   ├── widgets/               # 독립적으로 동작하는 큰 블록
│   ├── features/              # 사용자가 앱에서 수행하는 주요 기능 (비즈니스 로직)
│   ├── entities/              # 프로젝트에서 다루는 핵심 데이터 개념
│   └── shared/                # 모든 레이어에서 활용할 공통 코드
│       ├── api/               # API 관련·생성된 클라이언트
│       ├── i18n/              # 다국어 설정
│       ├── msw/               # MSW 모킹
│       ├── router/            # 라우트 상수·설정
│       ├── tanstack-query/    # React Query 설정
│       └── testing-library/   # 단위/통합 테스트 관련 설정
├── public/                    # 정적 파일 (locales, mockServiceWorker 등)
├── deployment/
│   ├── spa/                   # SPA 배포 (Nginx + Docker)
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── nginx.conf
│   └── ssr/                   # SSR 배포 (Node.js + Docker)
│       ├── Dockerfile
│       └── docker-compose.yml
└── .storybook/                # Storybook 설정
```

## 문제 해결

### Playwright 브라우저 의존성 오류

```bash
# WSL2/Linux
sudo apt-get update
pnpm exec playwright install --with-deps

# macOS/Windows
pnpm exec playwright install
```

### 개발 서버가 시작되지 않는 경우

```bash
# 캐시 삭제 후 재시작
rm -rf node_modules .react-router
pnpm install
pnpm dev
```
