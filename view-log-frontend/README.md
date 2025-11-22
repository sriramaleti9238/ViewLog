# 🎨 ViewLog Frontend – Angular 20 + PrimeNG

A clean, responsive UI for the ViewLog Watchlist application. The frontend interacts with the Spring Boot backend for CRUD operations.

> 📖 **[← Back to Main README](../README.md)**

---

## 🛠 Tech Stack

- Angular **20**
- PrimeNG
- TypeScript
- SCSS Styling
- Angular Reactive Forms
- Angular Router
- SSR-Ready Build

---

## ▶ How to Run

### Prerequisites
- Node.js 18+
- npm 9+

### Install Dependencies
```sh
npm install
```

### Start Dev Server
```sh
npm start
```

Runs at: **http://localhost:4200**

### Build for Production
```sh
npm run build
```

### Run SSR Build
```sh
npm run serve:ssr:view-log-frontend
```

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `ng serve` | Start development server |
| `build` | `ng build` | Production build |
| `watch` | `ng build --watch --configuration development` | Build with watch mode |
| `test` | `ng test` | Run unit tests |
| `serve:ssr` | `node dist/view-log-frontend/server/server.mjs` | Serve SSR build |

---

## 🌐 API Integration

The backend API is configured at:
```
http://localhost:8089/watchlist
```

You can modify the API base URL in:
```
src/app/core/services/watch-item.service.ts
```

---

## 📂 Project Structure

```
src/app/
│
├── watchlist/                  # Main table + filters component
├── add-item/                   # Add item form component
├── edit-item/                  # Edit item form component
├── shared/                     # Shared components
│   ├── spinner/                # Loading spinner
│   ├── drawer/                 # Side drawer (About panel)
│   └── badges/                 # Status badges
├── core/                       # Core functionality
│   ├── services/               # API services
│   └── models/                 # TypeScript interfaces
└── app.routes.ts               # Application routing
```

---

## ✨ UI Features

### Watchlist Table
- Sortable columns
- Pagination
- Filter by Type, Genre, Watched status
- Global search box

### Forms
- Add & Edit screens with validation
- PrimeNG AutoComplete dropdowns
- Rating selector

### UX Components
- Drawer-based About panel
- Toast notifications
- Loading spinners
- Responsive design

---

## 🎨 Styling

The project uses SCSS for styling:

```
src/
├── styles.scss                 # Global styles
└── app/
    └── **/*.scss               # Component styles
```

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@angular/core` | ^20.3.0 | Angular framework |
| `@angular/forms` | ^20.3.0 | Reactive forms |
| `@angular/router` | ^20.3.0 | Routing |
| `@angular/animations` | ^20.3.12 | Animations |
| `@angular/platform-server` | ^20.3.0 | SSR support |
| `primeng` | latest | UI components |

---

## 🔧 Environment Configuration

### Development
```
src/environments/environment.ts
```

### Production
```
src/environments/environment.prod.ts
```


---

## 🚀 Deployment

### Build Production Bundle
```sh
npm run build
```

Output: `dist/view-log-frontend/`

### Serve Static Build
Use any static server (nginx, Apache, etc.) to serve the `dist/view-log-frontend/browser/` folder.

---
