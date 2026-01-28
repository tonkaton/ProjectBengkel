const webpush = require('web-push');
if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.warn('Peringatan: VAPID keys belum dikonfigurasi. Fitur notifikasi PWA mungkin tidak jalan.');
} else {
  try {
    webpush.setVapidDetails(
      'mailto:admin@bengkelmotor.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
  } catch (e) {
    console.error('Gagal mengonfigurasi WebPush:', e.message);
  }
}

module.exports = webpush;