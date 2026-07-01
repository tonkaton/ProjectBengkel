# Botak Engine Speed — Bengkel Motor Management System

Sistem manajemen bengkel motor: **landing page**, **customer portal + admin dashboard**, dan **REST API**. Dibangun dengan React (Vite) + Node.js/Express + MySQL. UI memakai gaya **Soft UI (neumorphism)** dengan **mode terang/gelap**.

## 📋 Komponen

| Folder | Deskripsi | Port dev |
|--------|-----------|----------|
| `landing/` | Landing page marketing (React + Vite) | `5174` |
| `app/`     | Customer portal & admin dashboard (React + Vite, PWA) | `5173` |
| `backend/` | REST API (Express + Sequelize + MySQL, JWT) | `5000` |

## 🚀 Menjalankan di Lokal (cara utama)

### Prasyarat
- **Node.js 18+**
- **MySQL 8+** (XAMPP / Laragon / MySQL server)

### 1. Clone
```bash
git clone https://github.com/tonkaton/ProjectBengkel.git
cd ProjectBengkel
```

### 2. Database (WAJIB — auto-sync dimatikan)
Skema tabel **tidak** dibuat otomatis oleh backend, jadi harus impor dump SQL:
1. Nyalakan MySQL, buat database kosong bernama `bengkel_motor`.
2. Impor `bengkel_motor.sql` (via phpMyAdmin → Import, atau CLI):
   ```bash
   mysql -u root bengkel_motor < bengkel_motor.sql
   ```

### 3. Konfigurasi `backend/.env`
`backend/.env` **tidak ikut di repo** (berisi rahasia). Salin dari contoh lalu isi:
```bash
cp backend/.env.example backend/.env
```
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=bengkel_motor
JWT_SECRET=<isi_secret_acak>
VAPID_PUBLIC_KEY=<isi>
VAPID_PRIVATE_KEY=<isi>
```
Generate VAPID key (untuk push notification):
```bash
cd backend && npx web-push generate-vapid-keys
```
> Frontend **tidak perlu setup env** untuk lokal — `app/.env` & `landing/.env` sudah default ke `http://localhost:5000/api`.

### 4. Install & jalankan (satu perintah)
Dari root project:
```bash
npm run setup   # install dependency: root + backend + app + landing
npm run dev     # jalankan BE (:5000) + APP (:5173) + LANDING (:5174) sekaligus
```

### 5. Akses
| Aplikasi | URL | Login |
|----------|-----|-------|
| Dashboard | http://localhost:5173 | `admin@bengkel.com` / `admin123` |
| Landing | http://localhost:5174 | — |
| API | http://localhost:5000/api | — |

> Urutan wajib: **MySQL + import SQL → backend → frontend**. Frontend menembak `localhost:5000/api`.

## 🧰 Script npm (root)

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Backend + App + Landing sekaligus (label BE/APP/LANDING) |
| `npm run dev:fe` | App + Landing saja |
| `npm run be` | Backend saja (nodemon) |
| `npm run app` / `npm run landing` | Jalankan satuan |
| `npm run setup` | Install dependency di semua folder |

## 🔧 Environment Variables

### Backend (`backend/.env` — tidak di-commit)
Lihat `backend/.env.example`. Berisi `PORT`, koneksi MySQL, `JWT_SECRET`, dan VAPID keys.

### Frontend (Vite)
Prioritas Vite: `.env.[mode]` > `.env.local` > `.env`.

| File | Status | Isi | Dipakai saat |
|------|--------|-----|--------------|
| `app/.env`, `landing/.env` | commit | URL **localhost** | `npm run dev` (default lokal) |
| `*/.env.local` | gitignored | override pribadi | opsional |
| `*/.env.production` | commit | URL **production** | `npm run build` |

Saat `npm run build`, `.env.production` selalu menang atas `.env`/`.env.local`, jadi setting lokal **tidak bocor** ke produksi.

## 🐳 Alternatif: Docker

```bash
cp backend/.env.example backend/.env   # sesuaikan
docker compose up --build
```
Nginx me-route `/` → landing, `/app` → dashboard, `/api` → backend. Lihat `docker-compose.yml` & `.docker/`.

## 📁 Struktur Project

```
ProjectBengkel/
├── app/                  # Dashboard & customer portal (React + Vite, PWA)
│   └── src/{components,contexts,hooks,services,utils}
├── backend/              # REST API (Express + Sequelize)
│   └── src/{controllers,models,routes,middleware,jobs,config}
├── landing/              # Landing page (React + Vite)
│   └── src/components/{sections,navbar,ui,layout}
├── docs/diagrams/        # Diagram UML (PNG hasil export)
├── diagram.md            # Sumber diagram UML (Mermaid)
├── bengkel_motor.sql     # Dump database (skema + seed)
├── docker-compose.yml
└── package.json          # Script dev orchestrator
```

## ✨ Fitur

**Landing** — profil bengkel, daftar layanan (dari API), **booking online**, testimoni, kontak WhatsApp. Navbar berbentuk stang motor. Soft UI + mode terang/gelap.

**Dashboard/App**
- Autentikasi JWT (admin / customer)
- Booking masuk → proses jadi member + transaksi
- Manajemen layanan, pelanggan, kendaraan, transaksi
- **Project Custom (proposal)** — penawaran modifikasi, terima/tolak → jadi transaksi
- **Loyalty** — poin & tukar reward
- **Jadwal servis** + reminder otomatis (cron) via **web push**
- Export Excel / print, PWA, mode terang/gelap

**Backend** — REST API, JWT + role-based access, Sequelize/MySQL, web-push, cron reminder (H-7/H-3/H-1).

## 🎨 UI / Theming
- **Soft UI (neumorphism)** — dual-shadow, kartu terangkat, input cekung.
- **Mode terang/gelap** via CSS variable + class `.dark` (disimpan di `localStorage`, anti-flash). Toggle ada di navbar landing & sidebar app.
- Font: Bebas Neue (display), Plus Jakarta Sans (body), JetBrains Mono (angka/data).

## 📡 API Endpoints (ringkas)

| Grup | Endpoint |
|------|----------|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Booking | `POST /api/bookings` (publik), `GET /api/bookings` (admin), `POST /api/bookings/:id/process` (admin) |
| Services | `GET /api/services` (publik), `POST/PUT/DELETE` (admin) |
| Vehicles | `GET /api/vehicles`, `POST/PUT/DELETE /api/vehicles/:id` |
| Transactions | `GET /api/transactions`, `POST`, `PUT /api/transactions/:id/status` |
| Proposals | `GET /api/proposals`, `POST` (admin), `POST /api/proposals/:id/accept`, `POST /api/proposals/:id/reject` |
| Rewards | `GET /api/rewards`, `POST` (admin), `POST /api/rewards/exchange/:id` |
| Maintenance | `GET /api/maintenance`, `POST` (admin), `DELETE /api/maintenance/:id` |
| Push | `POST /api/push/subscribe` |

## 📊 Dokumentasi Diagram
UML lengkap (use case, activity, sequence, ERD, class) ada di **[`diagram.md`](diagram.md)** (Mermaid) dan versi PNG di **[`docs/diagrams/`](docs/diagrams/)**.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, lucide-react, Framer Motion
- **Backend**: Node.js, Express, MySQL, Sequelize, JWT, bcryptjs, web-push, node-cron
- **DevOps**: Docker, Docker Compose, Nginx

## 🔐 Catatan Keamanan (penting untuk deploy)
- `backend/.env` **tidak di-commit** — set nilai production lewat env platform / secret manager.
- **Rotasi** `JWT_SECRET` & password DB sebelum production (jangan pakai default `admin123`).
- Ganti kredensial admin default.

## 📄 License
MIT.
