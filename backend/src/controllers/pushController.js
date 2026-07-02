const PushSubscription = require('../models/PushSubscription');

exports.subscribe = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Subscription data required' });
    }

    await PushSubscription.upsert({
      UserId: req.user.id,
      subscription: req.body
    });
    
    res.json({ message: 'Subscribed' });
  } catch (e) {
    console.error('Push subscribe error:', e);
    res.status(500).json({ message: 'Push error' });
  }
};