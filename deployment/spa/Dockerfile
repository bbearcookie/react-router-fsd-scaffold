# 빌드 스테이지 ----------------------------------------------------
FROM node:24.13.0-alpine AS builder

ARG DEPLOYMENT_ENV

ENV CI=true
RUN corepack enable && corepack prepare pnpm@10.22.0 --activate
WORKDIR /app

# 캐시 사용
RUN pnpm config set store-dir /pnpm/store
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile
COPY . .

# 환경별 .env 파일을 .env.production으로 복사
RUN if [ "$DEPLOYMENT_ENV" = "dev" ]; then \
      cp .env.dev .env.production; \
    elif [ "$DEPLOYMENT_ENV" = "stg" ]; then \
      cp .env.stg .env.production; \
    elif [ "$DEPLOYMENT_ENV" = "prod" ]; then \
      cp .env.prod .env.production; \
    fi

RUN pnpm build

# 프로덕션 스테이지  -----------------------------------------------
FROM nginx:1.27-alpine AS production

COPY deployment/spa/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/client /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
