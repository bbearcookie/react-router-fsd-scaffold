# React Router FSD Scaffold

React Router 7 기반의 Feature-Sliced Design(FSD) 아키텍처를 적용한 프론트엔드 프로젝트입니다.
test

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

- **React Router 7**: 파일 시스템 기반 라우팅
- **Feature-Sliced Design**: 확장 가능한 아키텍처 패턴
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **TanStack Query**: 서버 상태 관리
- **i18next**: 다국어 지원 (ko, en, ja)
- **MSW**: API 모킹

## 기술 스택

### 핵심 버전

- **Node.js**: `24.11.1` (.nvmrc에 명시)
- **pnpm**: `10.22.0` (package.json의 packageManager 필드에 명시)
- **React**: `19.2.0`
- **TypeScript**: `5.9.3`

### 주요 라이브러리

- **React Router**: `7.9.6`
- **TanStack Query**: `5.90.10`
- **Tailwind CSS**: `4.1.17`
- **Zod**: `4.1.12`

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
node --version  # v24.11.1 출력되어야 함
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

### 테스트 작성 규칙

각 컴포넌트는 `__test__` 디렉토리에 세 가지 파일을 가집니다:

```
Component/
  ├── Component.tsx
  └── __test__/
      ├── Component.test.tsx    # Vitest 단위 테스트
      ├── Component.e2e.tsx     # Playwright E2E 테스트
      └── Component.stories.tsx # Storybook 스토리
```

## 빌드 및 배포

### 개발 빌드

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

### 프로덕션 SSR 실행 (SSR Mode)

```bash
# Node.js 서버로 실행
pnpm start
```

### Storybook 빌드

```bash
# Storybook 정적 파일 생성
pnpm build:storybook

# storybook-static/ 디렉토리에 생성됩니다
```

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
| `pnpm start` | 프로덕션 서버 실행 (SSR 전용) |

### 기타

| 명령어 | 설명 |
|--------|------|
| `pnpm generate:api` | Orval을 사용한 API 클라이언트 생성 |

## 프로젝트 구조

```
react-router-fsd-scaffold/
├── src/
│   ├── app/                   # 앱 전역에서 동작하는 환경 설정 등
│   │   ├── routes/            # 파일 시스템 기반 라우트 (react-router)
│   │   └── styles/            # 전역 스타일
│   ├── pages/                 # 웹/앱의 화면(screen) 또는 액티비티(activity)
│   ├── widgets/               # 독립적으로 동작하는 큰 블록
│   ├── features/              # 사용자가 앱에서 수행하는 주요 기능 (비즈니스 로직)
│   ├── entities/              # 프로젝트에서 다루는 핵심 데이터 개념
│   └── shared/                # 모든 레이어에서 활용할 공통 코드
│       ├── api/               # API 관련 함수
│       ├── components/        # 공통 컴포넌트
│       ├── constants/         # 상수
│       ├── i18n/              # 다국어 설정
│       ├── testing-library/   # 단위/통합 테스트 관련 설정
│       └── utils/             # 유틸리티 함수
├── public/                    # 정적 파일
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
