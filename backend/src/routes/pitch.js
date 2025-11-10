import express from 'express';
import Pitch from '../models/Pitch.js';
import Booking from '../models/Booking.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const pitches = await Pitch.find();
  res.json(pitches);
});

router.get('/:id/slots', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Missing date' });

  const startDay = new Date(date);
  const endDay = new Date(date);
  endDay.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    pitchId: req.params.id,
    start: { $gte: startDay, $lte: endDay },
  });

  const slots = [];
  for (let h = 8; h < 22; h++) {
    const start = new Date(date);
    start.setHours(h, 0, 0, 0);
    const end = new Date(date);
    end.setHours(h + 1, 0, 0, 0);
    const occupied = bookings.some(b => b.start < end && b.end > start);
    slots.push({ start, end, available: !occupied });
  }

  res.json(slots);
});

export default router;

