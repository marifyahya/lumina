# Lumina School Management System

Lumina is a premium, modern School Management System (SIS) designed for efficiency, scalability, and an exceptional user experience. Built with Laravel 13, Inertia.js, and React, it features a clean, monochrome aesthetic with high-performance administrative tools.

## 🚀 Key Features

- **Multi-language Support**: Fully localized in English (EN) and Indonesian (ID).
- **Modern UI/UX**: Minimalist monochrome design using Ant Design (AntD) for React.
- **Master Data Management**: Comprehensive management of Academic Years and Class Rooms.
- **Dockerized Environment**: Fully containerized setup for consistent development across platforms.
- **Smart Developer Experience**: Optimized with Vite Watch Mode and HMR inside Docker.

## 👥 System Actors

Lumina is designed with a comprehensive role-based access control system for 7 distinct actors:

- **Admin**: Manages master data, users, and verifies student registrations.
- **Teacher**: Manages class schedules, attendance, and student grading.
- **Student**: Accesses academic records, schedules, and report cards.
- **Parent**: Monitors child's progress, attendance, and financial obligations.
- **Finance**: Manages tuition (SPP), billing, and payment records.
- **Prospective Student**: Handles the New Student Admission (PPDB) process.
- **Principal**: Accesses executive dashboards for school-wide performance and financial health.

## 🗺 Development Roadmap

### Phase 1: Foundation (Current)
- [x] Project architecture & Docker setup.
- [x] Role-Based Access Control (RBAC) foundation.
- [x] Master Data CRUD (Academic Years, Classes).
- [x] Multi-language infrastructure.

### Phase 2: Admission & Academic Core
- [ ] New Student Admission (PPDB) flow.
- [ ] Subject & Schedule management.
- [ ] Document upload & verification system.

### Phase 3: Grading & Attendance
- [ ] Daily attendance tracking.
- [ ] Dynamic grading formulas & automated report cards.
- [ ] Student & Parent portals.

### Phase 4: Finance & Analytics
- [ ] Tuition (SPP) billing & payment gateway integration.
- [ ] Executive dashboards for Principal.
- [ ] Financial health reporting.

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


## 📄 License

The Lumina School Management System is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
