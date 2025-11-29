# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn -B -DskipTests clean package

# Stage 2: Run jar using small jdk runtime
FROM eclipse-temurin-17-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-XX:+UseContainerSupport"

CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
