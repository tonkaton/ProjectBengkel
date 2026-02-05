const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware'); //
const admin = require('../middleware/adminMiddleware'); //

router.post('/', bookingController.create);
router.get('/', auth, admin, bookingController.getAll);
router.post('/:id/process', auth, admin, bookingController.processBooking);

module.exports = router;