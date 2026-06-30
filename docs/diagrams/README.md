# Galeri Diagram (PNG) — Sistem Bengkel "Botak Engine Speed"

Versi gambar PNG dari semua diagram. Sumber Mermaid ada di [`../../diagram.md`](../../diagram.md).
Pakai gambar ini untuk dokumen yang tidak mendukung Mermaid (Word, PDF, slide).

## Use Case Diagram
![Use Case](use-case.png)

## Activity Diagram

### 1. Booking → jadi Member & Transaksi
![Activity Booking](activity-1-booking.png)

### 2. Autentikasi (Daftar & Login)
![Activity Autentikasi](activity-2-autentikasi.png)

### 3. Penawaran (Proposal)
![Activity Penawaran](activity-3-penawaran.png)

### 4. Tukar Reward
![Activity Tukar Reward](activity-4-tukar-reward.png)

### 5. Update Status Transaksi
![Activity Update Status](activity-5-update-status-transaksi.png)

### 6. Reminder Servis Otomatis
![Activity Reminder](activity-6-reminder-otomatis.png)

### 7. CRUD Generik
![Activity CRUD](activity-7-crud-generik.png)

## Sequence Diagram

### 1. Booking
![Sequence Booking](sequence-1-booking.png)

### 2. Autentikasi
![Sequence Autentikasi](sequence-2-autentikasi.png)

### 3. Penawaran
![Sequence Penawaran](sequence-3-penawaran.png)

### 4. Tukar Reward
![Sequence Tukar Reward](sequence-4-tukar-reward.png)

### 5. Update Status Transaksi
![Sequence Update Status](sequence-5-update-status-transaksi.png)

### 6. Reminder Otomatis
![Sequence Reminder](sequence-6-reminder-otomatis.png)

### 7. CRUD Generik
![Sequence CRUD](sequence-7-crud-generik.png)

## Entity Relationship Diagram (ERD)
![ERD](erd.png)

## Class Diagram
![Class Diagram](class-diagram.png)

---

## Cara regenerate PNG

Dari root project:

```bash
node docs/diagrams/_extract.js          # ekstrak ulang .mmd dari diagram.md
cd docs/diagrams
for f in *.mmd; do
  npx -y @mermaid-js/mermaid-cli -i "$f" -o "${f%.mmd}.png" -b white -s 2 -c mermaid.json -p puppeteer.json
done
```

- `-b white` = background putih
- `-s 2` = skala 2x (resolusi tinggi)
- `mermaid.json` / `puppeteer.json` = konfigurasi tema & sandbox
