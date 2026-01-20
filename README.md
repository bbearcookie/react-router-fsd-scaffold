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
- [주요 명령어](#주요-명령어)

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

### 빌드

```bash
# 타입 생성 + TypeScript 컴파일 + 프로덕션 빌드
pnpm build

# 빌드 결과물은 dist/ 디렉토리에 생성됩니다
```

### 프로덕션 SPA 실행 (SPA Mode)

```bash
# 빌드된 애플리케이션 미리보기
pnpm preview
```

### 프로덕션 서버 실행 (Node.js)

```bash
# Node.js로 빌드된 앱 서빙
pnpm start
```

### Storybook 빌드

```bash
# Storybook 정적 파일 생성
pnpm build:storybook

# storybook-static/ 디렉토리에 생성됩니다
```

### Docker로 SPA 배포 (deployment/spa)

Nginx로 SPA를 서빙하는 Docker 이미지를 빌드해 배포할 수 있습니다.

```bash
# 프로젝트 루트에서 아래 세 커맨드 중 하나를 선택하여 실행 (DEPLOYMENT_ENV에 따라 .env.dev / .env.stg / .env.prod 사용)
- DEPLOYMENT_ENV=dev docker-compose -f deployment/spa/docker-compose.yml up --build
- DEPLOYMENT_ENV=stg docker-compose -f deployment/spa/docker-compose.yml up --build
- DEPLOYMENT_ENV=prod docker-compose -f deployment/spa/docker-compose.yml up --build

# http://localhost:8080 에서 확인
```

- **Dockerfile**: Node 24.13.0-alpine 빌드 후 Nginx 1.27-alpine으로 정적 파일 서빙
- **nginx.conf**: SPA 폴백(`__spa-fallback.html`), 다국어·정적 자원 캐시 설정
- `DEPLOYMENT_ENV=dev|stg|prod` 에 맞는 `.env.dev`, `.env.stg`, `.env.prod` 파일이 필요합니다.

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
| `pnpm preview` | 빌드 결과물 미리보기 |
| `pnpm start` | 프로덕션 서버 실행 (Node.js) |

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
├── deployment/spa/            # SPA Docker·Nginx 배포
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
