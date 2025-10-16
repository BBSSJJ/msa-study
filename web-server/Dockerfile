# 1️⃣ 빌드 스테이지
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


# 2️⃣ 정적 파일 서빙 스테이지 (Nginx 사용)
FROM nginx:stable-alpine

# 정적 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html
# Provide SPA fallback config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 쿠버네티스에서 헬스체크를 위한 기본 포트
EXPOSE 80

# nginx 기본 실행
CMD ["nginx", "-g", "daemon off;"]
