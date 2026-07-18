<div align="center">

<img src="https://partner.s3library.com/static/media/app_icon_primary.9809d0496d938e417441aa07c0078e5f.svg" width="140" alt="Custom S3 Library"/>

# Custom S3 Library

### 📚 Local-First Library Management System

A modern browser-based library management application built with **React**, **TypeScript**, and **IndexedDB** using a Local-First architecture. Designed for small and medium self-study libraries, the application works entirely inside the browser without requiring a backend server, internet connection, cloud database, or user authentication.

<p>

<img src="https://img.shields.io/badge/React-18-61DAFB?logo=react"/>
<img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript"/>
<img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite"/>
<img src="https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwindcss"/>
<img src="https://img.shields.io/badge/IndexedDB-Offline-success"/>
<img src="https://img.shields.io/badge/Architecture-Local--First-orange"/>

</p>

</div>

---

# 📖 Overview

**Custom S3 Library** is a lightweight, offline-first library management system created for library owners who need a simple, reliable, and high-performance solution without the complexity of cloud infrastructure.

Unlike traditional SaaS platforms, this application stores all operational data locally inside the browser using **IndexedDB**. Every operation—including creating students, managing subscriptions, configuring seats, and generating reports—is performed locally, ensuring instant response times and uninterrupted operation even without an internet connection.

The application follows a **Local-First Architecture**, where the local database acts as the single source of truth while remaining future-ready for optional online synchronization. :contentReference[oaicite:1]{index=1}

---

# 🎯 Project Goals

The application was designed to:

- Eliminate dependency on cloud infrastructure.
- Allow libraries to operate completely offline.
- Provide instant data access with zero network latency.
- Reduce operational costs for small libraries.
- Enable future migration to cloud synchronization without changing business logic.
- Maintain complete ownership of library data.

---

# ✨ Core Features

## 🏢 Library Management

Manage complete library information.

Features include:

- Library Profile
- Library Settings
- Contact Information
- Working Hours
- Basic Configuration

---

## 🏗 Branch Management

Support multiple branches within the same workspace.

Features:

- Create Branches
- Update Branch Details
- Branch Configuration
- Branch Statistics

---

## 🏢 Floor Management

Configure library floors.

Features:

- Create Floors
- Edit Floors
- Delete Floors
- Floor Capacity
- Floor Status

---

## 💺 Seat Management

Complete seat configuration.

Capabilities:

- Create Seats
- Edit Seats
- Seat Categories
- Seat Labels
- Availability Status
- Bulk Operations

---

## 👨‍🎓 Student Management

Manage student records locally.

Features:

- Student Registration
- Student Profiles
- Search & Filters
- Membership Status
- Attendance Records

---

## 💳 Subscription Management

Track student subscriptions.

Features:

- Subscription Plans
- Renewals
- Expiry Tracking
- Active Students
- Payment Status

---

## 📊 Reports & Analytics

View operational insights.

Includes:

- Active Students
- Occupancy Statistics
- Subscription Summary
- Revenue Overview
- Daily Reports

---

## 💾 Backup & Restore

Protect local data through export/import.

Features:

- Excel Export
- Excel Import
- Local Backup
- Restore Database
- Data Migration

---

# 🚀 Local-First Architecture

Unlike traditional web applications, this project follows a Local-First architecture.

```
User Interface
       │
       ▼
Business Logic
       │
       ▼
Repository Layer
       │
       ▼
Data Provider
       │
       ▼
IndexedDB (idb)
```

All CRUD operations interact with the local database first.

No API calls are required.

No backend server is required.

Future online synchronization can be introduced by replacing the storage provider while keeping the business logic unchanged. :contentReference[oaicite:2]{index=2}

---

# 🏗 Data Provider Architecture

The application uses a storage abstraction layer.

```
DataProvider

├── IndexedDB Provider
│
├── Future Firebase Provider
│
├── Future REST Provider
│
└── Future Supabase Provider
```

This architecture allows storage engines to be swapped without changing UI components or business logic. :contentReference[oaicite:3]{index=3}

---

# 🛠 Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Local Database | IndexedDB |
| IndexedDB Wrapper | idb |
| State Management | React Hooks |
| Storage Pattern | Data Provider |

---

# 📂 Project Structure

```text
src
│
├── app
├── components
├── core
│   ├── config
│   ├── database
│   ├── providers
│   └── repositories
│
├── features
│   ├── branches
│   ├── floors
│   ├── seats
│   ├── students
│   ├── subscriptions
│   ├── plans
│   ├── shifts
│   └── dashboard
│
├── hooks
├── layouts
├── pages
├── types
├── utils
└── main.tsx
```

---

# ⚡ Why Local-First?

Compared with traditional cloud applications:

| Local-First | Cloud-First |
|------------|-------------|
| Works offline | Internet required |
| Instant response | Network latency |
| No backend cost | Server infrastructure |
| User owns data | Data stored remotely |
| Browser database | Cloud database |

---

# 🔐 Privacy

The application is designed with privacy in mind.

- No login required
- No cloud storage
- No external database
- No tracking
- Data remains inside the user's browser
- Users control backup and restoration of their own data

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone <repository-url>

cd custom-s3-library
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

---

# 📜 Available Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Development server |
| npm run build | Production build |
| npm run preview | Preview production build |
| npm run lint | ESLint |

---

# 🔮 Future Roadmap

Planned improvements include:

- Optional Cloud Synchronization
- Multi-device Sync
- Role-based Authentication
- QR Attendance
- Progressive Web App (PWA)
- Desktop Packaging
- Automatic Backup
- Multi-language Support
- Plugin System
- Theme Customization

---

# 🤝 Contributing

Contributions are welcome.

Please:

1. Fork the repository.
2. Create a feature branch.
3. Write clean and reusable code.
4. Test your implementation.
5. Submit a Pull Request.

---

# 📄 License

This project is developed for the **S3 Library Ecosystem**.

For commercial licensing or collaboration, please contact the project owner.

---

<div align="center">

### Built with ❤️ using React, TypeScript & IndexedDB

**Custom S3 Library**

Offline • Local-First • Fast • Private • Future-Ready

</div>
