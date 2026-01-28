const cron = require('node-cron');
const { Op } = require('sequelize');
const webpush = require('../config/webPush');
const Maintenance = require('../models/Maintenance');
const PushSubscription = require('../models/PushSubscription');
const User = require('../models/User');

cron.schedule('0 * * * *', async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    const list = await Maintenance.findAll({
      where: {
        next_service: {
          [Op.lte]: maxDate,
          [Op.gte]: today
        },
        [Op.or]: [
          { reminder_h7: false },
          { reminder_h3: false },
          { reminder_h1: false }
        ]
      },
      include: [{
        model: User,
        as: 'owner',
        include: [{
          model: PushSubscription,
          as: 'pushSubscription'
        }]
      }]
    });

    console.log(`[Cron] Sinkronisasi ${list.length} jadwal servis terdeteksi...`);

    for (const m of list) {
      try {
        if (!m.next_service || !m.owner || !m.owner.pushSubscription) continue; // 👈 perhatikan lowercase!

        const targetDate = new Date(m.next_service);
        targetDate.setHours(0, 0, 0, 0);
        const diff = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
        const targets = [7, 3, 1];
        const map = { 7: 'reminder_h7', 3: 'reminder_h3', 1: 'reminder_h1' };

        if (targets.includes(diff) && !m[map[diff]]) {
          await webpush.sendNotification(
            m.owner.pushSubscription.subscription, // 👈 lowercase!
            JSON.stringify({
              title: 'Sintink Garage Info',
              body: `Waktunya servis! Motor ${m.motor_name} dijadwalkan ${diff} hari lagi.`,
              url: '/schedule'
            })
          );
          m[map[diff]] = true;
          await m.save();
          console.log(`[Push] Notifikasi H-${diff} terkirim ke: ${m.owner.name}`);
        }
      } catch (err) {
        console.error(`Gagal memproses ID ${m.id}:`, err.message);
      }
    }
  } catch (e) {
    console.error('CRON JOB FATAL ERROR:', e.message);
  }
});