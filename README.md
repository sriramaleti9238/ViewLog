# 🎬 ViewLog – Full-Stack Watchlist Application

ViewLog is a full-stack application that helps you track Movies, TV Shows, Documentaries.

This repository contains:
- **[view-log-backend](./view-log-backend/README.md)** → Spring Boot 3.5, Java 17
- **[view-log-frontend](./view-log-frontend/README.md)** → Angular 20 + PrimeNG
- Docker support (Backend)

---

## 🚀 Features

### Watchlist Management
- Add, edit, delete items
- Mark watched/unwatched
- Add ratings and notes

### Search & Filtering
- Search by name
- Filter by Type, Genre, and Watched status

### Developer Tooling
- Swagger API documentation
- H2 Database Console
- Actuator Health API
- Preloaded sample data

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Angular 20, PrimeNG, SCSS, TypeScript |
| **Backend** | Java 17, Spring Boot 3.5, Spring Data JPA, H2 |
| **DevOps** | Docker, Gradle |

---

## 📦 Project Structure

```
ViewLog/
│
├── view-log-backend/          # Backend Spring Boot API
│   └── README.md              # Backend documentation
│
├── view-log-frontend/         # Angular UI
│   └── README.md              # Frontend documentation
│
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- npm 9+

### 1️⃣ Start Backend
```sh
cd view-log-backend
./gradlew bootRun
```
Backend runs at: `http://localhost:8089`

### 2️⃣ Start Frontend
```sh
cd view-log-frontend
npm install
npm start
```
Frontend runs at: `http://localhost:4200`

---

## 📚 Documentation

| Component | README |
|-----------|--------|
| Backend API | [view-log-backend/README.md](./view-log-backend/README.md) |
| Frontend UI | [view-log-frontend/README.md](./view-log-frontend/README.md) |

---

## 🐳 Docker (Backend Only)

```sh
cd view-log-backend
./gradlew bootJar
docker build -t viewlog-backend .
docker run -p 8089:8089 viewlog-backend
```

---

## 🌐 Key URLs (Development)

| Service | URL |
|---------|-----|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:8089/watchlist |
| Swagger UI | http://localhost:8089/swagger-ui/index.html |
| H2 Console | http://localhost:8089/h2-console |
| Health Check | http://localhost:8089/actuator/health |

---

## 👨‍💻 Author

**Sriram Aleti**

---

## 📄 License

This project is for personal/educational use.