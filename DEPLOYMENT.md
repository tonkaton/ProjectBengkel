# Panduan Deployment Project Bengkel ke VPS Ubuntu

## Prerequisites

VPS Ubuntu dengan instalasi berikut:

- ✅ PM2
- ✅ Nginx
- ✅ Node.js
- ✅ MySQL
- ✅ PHP

## Arsitektur Deployment

- **Backend API**: Berjalan di PM2 (Port 5000)
- **Frontend App**: Build static files di Nginx
- **Landing Page**: Build static files di Nginx
- **Database**: MySQL
- **Reverse Proxy**: Nginx

---

## 1. Persiapan Awal

### 1.1 Connect ke VPS

```bash
ssh root@your-vps-ip
# atau
ssh username@your-vps-ip
```

### 1.2 Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### 1.3 Install Git (jika belum ada)

```bash
sudo apt install git -y
```

### 1.4 Buat User untuk Aplikasi (Opsional tapi Recommended)

```bash
sudo adduser bengkel
sudo usermod -aG sudo bengkel
su - bengkel
```

---

## 2. Clone & Setup Project

### 2.1 Clone Repository

```bash
cd ~
git clone <your-repository-url> ProjectBengkel
cd ProjectBengkel
```

Jika repository private, setup SSH key atau HTTPS credentials terlebih dahulu.

### 2.2 Verifikasi Struktur

```bash
ls -la
# Harus melihat: app/, backend/, landing/, docker-compose.yml
```

---

## 3. Setup Database MySQL

### 3.1 Login ke MySQL

```bash
sudo mysql -u root -p
```

### 3.2 Buat Database dan User

```sql
-- Buat database
CREATE DATABASE bengkel_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Buat user untuk aplikasi
CREATE USER 'bengkel_user'@'localhost' IDENTIFIED BY 'password_yang_kuat_123';

-- Berikan privileges
GRANT ALL PRIVILEGES ON bengkel_db.* TO 'bengkel_user'@'localhost';
FLUSH PRIVILEGES;

-- Cek database
SHOW DATABASES;
EXIT;
```

### 3.3 Test Koneksi

```bash
mysql -u bengkel_user -p bengkel_db
# Masukkan password, jika berhasil login berarti OK
# Ketik EXIT untuk keluar
```

---

## 4. Setup Backend

### 4.1 Masuk ke Folder Backend

```bash
cd ~/ProjectBengkel/backend
```

### 4.2 Install Dependencies

```bash
npm install --production
```

### 4.3 Setup Environment Variables

```bash
nano .env
```

Isi file `.env` dengan konfigurasi berikut:

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=bengkel_user
DB_PASSWORD=password_yang_kuat_123
DB_NAME=bengkel_db
DB_PORT=3306

# JWT Secret (ganti dengan string random yang aman)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# CORS Configuration
FRONTEND_URL=https://yourdomain.com
LANDING_URL=https://yourdomain.com

# Web Push (jika menggunakan push notification)
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_EMAIL=your-email@example.com
```

Simpan dengan `Ctrl+O`, Enter, lalu `Ctrl+X`.

### 4.4 Generate JWT Secret (Opsional)

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy hasil generate dan gunakan sebagai JWT_SECRET.

### 4.5 Test Backend Secara Manual

```bash
npm start
```

Jika berjalan tanpa error, tekan `Ctrl+C` untuk stop.

---

## 5. Setup PM2 untuk Backend

### 5.1 Buat File Ecosystem PM2

```bash
cd ~/ProjectBengkel/backend
nano ecosystem.config.js
```

Isi dengan:

```javascript
module.exports = {
  apps: [
    {
      name: "bengkel-backend",
      script: "./server.js",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
};
```

### 5.2 Buat Folder Logs

```bash
mkdir -p logs
```

### 5.3 Start Backend dengan PM2

```bash
pm2 start ecosystem.config.js
```

### 5.4 Setup PM2 Startup

```bash
pm2 save
pm2 startup
# Copy & jalankan command yang ditampilkan
```

### 5.5 Monitoring PM2

```bash
# Lihat status
pm2 status

# Lihat logs
pm2 logs bengkel-backend

# Restart
pm2 restart bengkel-backend

# Stop
pm2 stop bengkel-backend
```

---

## 6. Build Frontend App

### 6.1 Masuk ke Folder App

```bash
cd ~/ProjectBengkel/app
```

### 6.2 Install Dependencies

```bash
npm install
```

### 6.3 Setup Environment Variables

```bash
nano .env.production
```

Isi dengan:

```env
VITE_API_URL=https://api.yourdomain.com
# atau jika API di subdomain yang sama:
# VITE_API_URL=https://yourdomain.com/api
```

### 6.4 Build untuk Production

```bash
npm run build
```

Build akan menghasilkan folder `dist/` yang berisi file static.

### 6.5 Verifikasi Build

```bash
ls -la dist/
# Harus ada index.html dan folder assets
```

---

## 7. Build Landing Page

### 7.1 Masuk ke Folder Landing

```bash
cd ~/ProjectBengkel/landing
```

### 7.2 Install Dependencies

```bash
npm install
```

### 7.3 Setup Environment Variables (jika ada)

```bash
nano .env.production
```

Isi jika diperlukan:

```env
VITE_API_URL=https://api.yourdomain.com
```

### 7.4 Build untuk Production

```bash
npm run build
```

### 7.5 Verifikasi Build

```bash
ls -la dist/
```

---

## 8. Setup Nginx

### 8.1 Buat Konfigurasi Nginx

```bash
sudo nano /etc/nginx/sites-available/bengkel
```

Isi dengan konfigurasi berikut:

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    # Jika sudah punya SSL, uncomment ini:
    # listen 443 ssl http2;
    # ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# Frontend App
server {
    listen 80;
    server_name app.yourdomain.com;

    # Jika sudah punya SSL:
    # listen 443 ssl http2;
    # ssl_certificate /etc/letsencrypt/live/app.yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/app.yourdomain.com/privkey.pem;

    root /home/bengkel/ProjectBengkel/app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss;
}

# Landing Page
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Jika sudah punya SSL:
    # listen 443 ssl http2;
    # ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    root /home/bengkel/ProjectBengkel/landing/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss;
}
```

**CATATAN**: Ganti `yourdomain.com` dengan domain Anda yang sebenarnya.

### 8.2 Alternatif: Satu Domain dengan Path-based Routing

Jika Anda hanya punya 1 domain, gunakan konfigurasi ini:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Landing Page - Root
    location / {
        root /home/bengkel/ProjectBengkel/landing/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # Frontend App - /app
    location /app {
        alias /home/bengkel/ProjectBengkel/app/dist;
        try_files $uri $uri/ /app/index.html;
        index index.html;
    }

    # Backend API - /api
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss;
}
```

### 8.3 Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/bengkel /etc/nginx/sites-enabled/
```

### 8.4 Test Konfigurasi Nginx

```bash
sudo nginx -t
```

Jika OK, lanjut restart:

### 8.5 Restart Nginx

```bash
sudo systemctl restart nginx
```

### 8.6 Cek Status Nginx

```bash
sudo systemctl status nginx
```

---

## 9. Setup DNS

Arahkan domain Anda ke IP VPS:

### Untuk Multi Subdomain:

- **A Record**: `yourdomain.com` → `VPS_IP`
- **A Record**: `www.yourdomain.com` → `VPS_IP`
- **A Record**: `app.yourdomain.com` → `VPS_IP`
- **A Record**: `api.yourdomain.com` → `VPS_IP`

### Untuk Single Domain:

- **A Record**: `yourdomain.com` → `VPS_IP`
- **A Record**: `www.yourdomain.com` → `VPS_IP`

Tunggu propagasi DNS (bisa 5 menit - 48 jam).

---

## 10. Setup SSL dengan Let's Encrypt (HTTPS)

### 10.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 10.2 Generate SSL Certificate

#### Untuk Multi Subdomain:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d app.yourdomain.com -d api.yourdomain.com
```

#### Untuk Single Domain:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Ikuti instruksi:

1. Masukkan email untuk notifikasi
2. Agree dengan Terms of Service
3. Pilih apakah mau redirect HTTP ke HTTPS (pilih 2 untuk redirect)

### 10.3 Test SSL Renewal

```bash
sudo certbot renew --dry-run
```

### 10.4 Auto Renewal

Certbot akan setup auto-renewal via cron/systemd timer secara otomatis.

Cek timer:

```bash
sudo systemctl status certbot.timer
```

---

## 11. Setup Firewall (Opsional tapi Recommended)

### 11.1 Install UFW (jika belum ada)

```bash
sudo apt install ufw -y
```

### 11.2 Konfigurasi Firewall

```bash
# Allow SSH (PENTING! Jangan lupa atau Anda bisa terkunci)
sudo ufw allow OpenSSH

# Allow HTTP dan HTTPS
sudo ufw allow 'Nginx Full'

# Allow MySQL hanya dari localhost (security)
# Tidak perlu dibuka ke public

# Enable firewall
sudo ufw enable

# Cek status
sudo ufw status
```

---

## 12. Migration Database & Seeding (Jika Ada)

### 12.1 Jika Ada Migration Files

```bash
cd ~/ProjectBengkel/backend

# Jalankan migrations
npm run migrate
# atau
node src/migrations/runMigrations.js
```

### 12.2 Jika Ada Seeder/Initial Data

```bash
npm run seed
# atau
node src/seeders/runSeeders.js
```

### 12.3 Manual SQL Import (Alternatif)

Jika Anda punya SQL dump:

```bash
mysql -u bengkel_user -p bengkel_db < database_backup.sql
```

---

## 13. Testing Deployment

### 13.1 Test Backend API

```bash
curl http://localhost:5000/
# atau dengan domain:
curl https://api.yourdomain.com/
```

### 13.2 Test Frontend

Buka browser dan akses:

- Landing: `https://yourdomain.com`
- App: `https://app.yourdomain.com` atau `https://yourdomain.com/app`

### 13.3 Test Database Connection

Cek PM2 logs untuk memastikan backend terkoneksi ke database:

```bash
pm2 logs bengkel-backend
```

---

## 14. Monitoring & Maintenance

### 14.1 Monitor PM2

```bash
# Real-time monitoring
pm2 monit

# Logs
pm2 logs

# Status semua apps
pm2 status
```

### 14.2 Monitor Nginx

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### 14.3 Monitor MySQL

```bash
# Login dan cek
sudo mysql -u root -p

# Di MySQL:
SHOW PROCESSLIST;
SHOW STATUS;
```

### 14.4 Monitor System Resources

```bash
# CPU & Memory
htop
# atau
top

# Disk usage
df -h

# Check PM2 memory
pm2 status
```

---

## 15. Update & Deploy Changes

### 15.1 Pull Latest Code

```bash
cd ~/ProjectBengkel
git pull origin main
```

### 15.2 Update Backend

```bash
cd backend
npm install --production
pm2 restart bengkel-backend
```

### 15.3 Update Frontend App

```bash
cd ../app
npm install
npm run build
```

### 15.4 Update Landing

```bash
cd ../landing
npm install
npm run build
```

### 15.5 Reload Nginx (jika ada perubahan config)

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 16. Backup Strategy

### 16.1 Backup Database

```bash
# Manual backup
mysqldump -u bengkel_user -p bengkel_db > ~/backups/bengkel_$(date +%Y%m%d).sql

# Buat folder backup
mkdir -p ~/backups
```

### 16.2 Automated Backup Script

```bash
nano ~/backup_bengkel.sh
```

Isi dengan:

```bash
#!/bin/bash
BACKUP_DIR="/home/bengkel/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="bengkel_db"
DB_USER="bengkel_user"
DB_PASS="password_yang_kuat_123"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/bengkel_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/bengkel_$DATE.sql

# Delete backups older than 7 days
find $BACKUP_DIR -name "bengkel_*.sql.gz" -mtime +7 -delete

echo "Backup completed: bengkel_$DATE.sql.gz"
```

Buat executable:

```bash
chmod +x ~/backup_bengkel.sh
```

### 16.3 Setup Cron untuk Auto Backup

```bash
crontab -e
```

Tambahkan:

```cron
# Backup database setiap hari jam 2 pagi
0 2 * * * /home/bengkel/backup_bengkel.sh >> /home/bengkel/backup.log 2>&1
```

---

## 17. Troubleshooting

### Backend Tidak Berjalan

```bash
# Cek PM2 logs
pm2 logs bengkel-backend

# Cek error logs
cat ~/ProjectBengkel/backend/logs/err.log

# Restart
pm2 restart bengkel-backend

# Jika masih error, coba jalankan manual untuk debug
cd ~/ProjectBengkel/backend
npm start
```

### Frontend Tidak Muncul

```bash
# Cek nginx error logs
sudo tail -f /var/log/nginx/error.log

# Cek file permissions
ls -la ~/ProjectBengkel/app/dist
sudo chown -R www-data:www-data ~/ProjectBengkel/app/dist
sudo chown -R www-data:www-data ~/ProjectBengkel/landing/dist

# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### Database Connection Error

```bash
# Test connection
mysql -u bengkel_user -p bengkel_db

# Cek MySQL status
sudo systemctl status mysql

# Cek backend .env
cat ~/ProjectBengkel/backend/.env

# Restart MySQL
sudo systemctl restart mysql
```

### SSL Certificate Error

```bash
# Renew certificate
sudo certbot renew

# Force renew
sudo certbot renew --force-renewal

# Restart nginx
sudo systemctl restart nginx
```

### Port Already in Use

```bash
# Cek proses di port 5000
sudo lsof -i :5000

# Kill proses jika perlu
kill -9 <PID>

# Atau gunakan port lain di .env dan ecosystem.config.js
```

---

## 18. Security Best Practices

### 18.1 Gunakan Strong Passwords

- Database password
- JWT secret
- Server user password

### 18.2 Regular Updates

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Update Node packages
cd ~/ProjectBengkel/backend
npm audit fix
```

### 18.3 Disable Root Login SSH

```bash
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart sshd
```

### 18.4 Setup Fail2Ban

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 18.5 Environment Variables

Jangan commit file `.env` ke git. Gunakan `.env.example` untuk template.

---

## 19. Checklist Deployment

- [ ] VPS siap dengan semua dependencies
- [ ] Database MySQL dibuat dan dikonfigurasi
- [ ] Backend `.env` sudah dikonfigurasi
- [ ] Backend berjalan di PM2
- [ ] Frontend app sudah di-build
- [ ] Landing page sudah di-build
- [ ] Nginx dikonfigurasi dengan benar
- [ ] DNS sudah diarahkan ke VPS
- [ ] SSL certificate sudah diinstall
- [ ] Firewall dikonfigurasi
- [ ] Testing semua endpoint berjalan
- [ ] Backup strategy sudah disetup
- [ ] Monitoring sudah disetup

---

## 20. Useful Commands Reference

```bash
# PM2
pm2 status                    # Lihat status
pm2 logs [name]              # Lihat logs
pm2 restart [name]           # Restart app
pm2 stop [name]              # Stop app
pm2 delete [name]            # Hapus dari PM2
pm2 save                     # Save PM2 process list
pm2 resurrect                # Restore saved processes

# Nginx
sudo nginx -t                # Test config
sudo systemctl restart nginx # Restart
sudo systemctl reload nginx  # Reload tanpa downtime
sudo systemctl status nginx  # Status

# MySQL
sudo systemctl status mysql  # Status
sudo systemctl restart mysql # Restart
mysql -u user -p database    # Login

# System
df -h                        # Disk usage
free -h                      # Memory usage
htop                         # Process monitor
netstat -tulpn               # Port usage
```

---

## 21. Support & Resources

- **Nginx Docs**: https://nginx.org/en/docs/
- **PM2 Docs**: https://pm2.keymetrics.io/docs/
- **Let's Encrypt**: https://letsencrypt.org/
- **MySQL Docs**: https://dev.mysql.com/doc/

---

## Selamat! 🎉

Project Bengkel Anda sekarang sudah live di production!

**URLs:**

- Landing: `https://yourdomain.com`
- App: `https://app.yourdomain.com`
- API: `https://api.yourdomain.com`

Jangan lupa untuk:

1. Setup monitoring
2. Setup backup reguler
3. Update dependencies secara berkala
4. Monitor logs untuk issues

Good luck! 🚀
