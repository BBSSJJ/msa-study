# 1단계: 빌드 전용 컨테이너
FROM gradle:8.5-jdk17 AS builder

WORKDIR /app

# 의존성 캐싱 최적화
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon

# 전체 소스 복사 후 빌드
COPY . .
RUN ./gradlew bootJar --no-daemon


# 2단계: 실행 전용 컨테이너 (JRE만)
FROM eclipse-temurin:17-jre

WORKDIR /app

# 빌드된 JAR 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# 실행
ENTRYPOINT ["java", "-jar", "app.jar"]