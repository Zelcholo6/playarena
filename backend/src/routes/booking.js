import express from 'express';
import Booking from '../models/Booking.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const { pitchId, start, end } = req.body;
  const booking = new Booking({
    userId: req.user.id,
    pitchId,
    start,
    end,
  });
  await booking.save();
  res.json(booking);
});

router.get('/me', requireAuth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate('pitchId', 'name');
  res.json(bookings);
});

export default router;

