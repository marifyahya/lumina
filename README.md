# Lumina School Management System

Lumina is a premium, modern School Management System (SIS) designed for efficiency, scalability, and an exceptional user experience. Built with Laravel 13, Inertia.js, and React, it features a clean, monochrome aesthetic with high-performance administrative tools.

## 🚀 Key Features

- **Multi-language Support**: Fully localized in English (EN) and Indonesian (ID).
- **Modern UI/UX**: Minimalist monochrome design using Ant Design (AntD) for React.
- **Master Data Management**: Comprehensive management of Academic Years and Class Rooms.
- **Dockerized Environment**: Fully containerized setup for consistent development across platforms.
- **Smart Developer Experience**: Optimized with Vite Watch Mode and HMR inside Docker.

## 🛠 Tech Stack

- **Backend**: Laravel 13 (PHP 8.3)
- **Frontend**: React (Inertia.js)
- **Styling**: Ant Design + Vanilla CSS
- **Database**: PostgreSQL
- **Cache**: Redis
- **Containerization**: Docker & Docker Compose

## 📦 Getting Started

### Prerequisites

- Docker Desktop installed.
- Git.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/marifyahya/lumina.git
   cd lumina
   ```

2. **Setup environment variables**:
   ```bash
   cp .env.example .env
   ```

3. **Start the containers**:
   ```bash
   docker compose up -d
   ```

4. **Install PHP dependencies**:
   ```bash
   docker compose exec app composer install
   ```

5. **Generate Application Key**:
   ```bash
   docker compose exec app php artisan key:generate
   ```

6. **Run Migrations & Seeders**:
   ```bash
   docker compose exec app php artisan migrate --seed
   ```

## 💻 Development

Lumina uses a dedicated Vite container for Hot Module Replacement (HMR).

- **Web Access**: `http://localhost:8081`
- **Vite Dev Server**: `http://localhost:5174` (Port 5173 inside container)
- **Database**: Port `5433` (on host)
- **Redis**: Port `6380` (on host)

### Useful Commands

- **Run Dev Server**: (Auto-started by Docker)
- **Manual Build**: `docker compose exec app npm run build`
- **Stop Containers**: `docker compose down`

## 🌍 Localization

Lumina uses a structured translation system. To add or modify translations:
- English: `lang/en.json`
- Indonesian: `lang/id.json`

Frontend components use the `useTranslate` hook:
```javascript
const { t } = useTranslate();
console.log(t('common.welcome'));
```

## 📄 License

The Lumina School Management System is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
