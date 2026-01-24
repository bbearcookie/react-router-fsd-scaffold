# 빌드 스테이지 ----------------------------------------------------
FROM node:24.13.0-alpine AS builder

ARG ENVIRONMENT

# 환경 변수 설정
ENV \
  # CI 환경임을 나타내는 변수 (lefthook 생략 등)
  CI=true \
  NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@10.22.0 --activate
WORKDIR /app

# 캐시 및 의존성 설치
RUN pnpm config set store-dir /pnpm/store
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .

# 환경별 .env 파일을 .env.production으로 복사
RUN if [ "$ENVIRONMENT" = "dev" ]; then \
      cp .env.dev .env.production; \
    elif [ "$ENVIRONMENT" = "stg" ]; then \
      cp .env.stg .env.production; \
    elif [ "$ENVIRONMENT" = "prod" ]; then \
      cp .env.prod .env.production; \
    fi

RUN pnpm build

# 서버 스테이지  -----------------------------------------------
FROM node:24.13.0-alpine AS server

# 환경 변수 설정
ENV \
  NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@10.22.0 --activate

WORKDIR /app

# builder 스테이지에서 필요한 파일 복사
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["pnpm", "start"]
