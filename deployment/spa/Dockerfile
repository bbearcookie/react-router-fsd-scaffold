# 빌드 스테이지 ----------------------------------------------------
FROM node:24.13.0-alpine AS builder

ARG ENVIRONMENT
ARG VITE_BASE_NAME
ARG SPA_FALLBACK

# 환경 변수 설정
ENV \
  # CI 환경임을 나타내는 변수 (lefthook 생략 등)
  CI=true \
  VITE_BASE_NAME=${VITE_BASE_NAME} \
  SPA_FALLBACK=${SPA_FALLBACK}

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

# 정적 애셋을 도메인의 서브 경로 배포용 prefix 경로로 이동
RUN pnpm build && \
  basename=$(echo "${VITE_BASE_NAME}" | sed 's/^\///') && \
  mkdir -p "dist/client/${basename}" && \
  cp "dist/client/${SPA_FALLBACK}" "dist/client/${basename}/" && \
  find dist/client -maxdepth 1 -mindepth 1 \
    ! -name "${basename}" \
    ! -name "${SPA_FALLBACK}" \
    -exec mv {} "dist/client/${basename}/" \;

# 서버 스테이지  -----------------------------------------------
FROM nginx:1.27-alpine AS server

ARG VITE_BASE_NAME
ARG SPA_FALLBACK

# 환경 변수 설정
ENV \
  VITE_BASE_NAME=${VITE_BASE_NAME} \
  SPA_FALLBACK=${SPA_FALLBACK}

COPY deployment/spa/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist/client /usr/share/nginx/html

EXPOSE 80

# nginx 이미지의 기본 entrypoint가 /etc/nginx/templates/*.template 파일을 자동으로 envsubst 처리
