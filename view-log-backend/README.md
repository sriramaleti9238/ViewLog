# 🎬 ViewLog Backend – Spring Boot 3.5 + Java 17

The backend provides REST APIs for managing watchlist items (Movies, TV Shows, Documentaries, etc.) with full CRUD, filtering, and watched toggle support.

> 📖 **[← Back to Main README](../README.md)**

---

## 🛠 Tech Stack

- Java **17**
- Spring Boot **3.5.7**
- Spring Data JPA
- H2 In-Memory Database
- SpringDoc OpenAPI (Swagger)
- Spring Boot Actuator
- Lombok
- Gradle Build System

---

## ▶ How to Run

### Prerequisites
- Java 17+
- Gradle 8+ (or use included wrapper)

### 1️⃣ Build JAR
```sh
./gradlew bootJar
```

### 2️⃣ Run the Application
```sh
./gradlew bootRun
```

### 3️⃣ OR Run the Built JAR
```sh
java -jar build/libs/view-log-backend-1.0.0.jar
```

---

## 🌐 Important URLs

| Feature | URL |
|---------|-----|
| **Swagger UI** | http://localhost:8089/swagger-ui/index.html |
| **H2 Console** | http://localhost:8089/h2-console |
| **Actuator Health** | http://localhost:8089/actuator/health |
| **Server Port** | `8089` |

### H2 Database Credentials

| Field | Value |
|-------|-------|
| JDBC URL | `jdbc:h2:mem:viewlogdb` |
| Username | `admin` |
| Password | `admin` |

---

## 📘 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/watchlist` | Get all items |
| `GET` | `/watchlist/{id}` | Get item by ID |
| `POST` | `/watchlist` | Create new item |
| `PUT` | `/watchlist/{id}` | Update item |
| `PUT` | `/watchlist/{id}/watched` | Toggle watched status |
| `DELETE` | `/watchlist/{id}` | Delete item |

### Sample Request Body (POST/PUT)
```json
{
  "name": "Inception",
  "type": "MOVIE",
  "genre": "SCI_FI",
  "rating": 9,
  "watched": true,
  "notes": "Mind-bending thriller"
}
```

---

## 📂 Project Structure

```
src/main/java/com/viewlog/
│
├── config/                         # CORS, DataInitializer
├── controller/                     # REST controllers
├── entity/                         # JPA entities (WatchItem, Enums)
├── repository/                     # Spring Data repositories
├── service/                        # Business logic layer
└── ViewLogBackendApplication.java  # Main application class
```

---

## ⚙️ Configuration

Key settings in `application.properties`:

```properties
server.port=8089
spring.datasource.url=jdbc:h2:mem:viewlogdb
spring.h2.console.enabled=true
springdoc.swagger-ui.path=/swagger-ui.html
```

---

## 🐳 Docker Support

### Build Image
```sh
docker build -t viewlog-backend .
```

### Run Container
```sh
docker run -p 8089:8089 viewlog-backend
```

### Dockerfile
```dockerfile
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY build/libs/view-log-backend-1.0.0.jar app.jar
EXPOSE 8089
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---