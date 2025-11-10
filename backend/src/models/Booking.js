import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pitchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pitch', required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  status: { type: String, default: 'confirmed' },
});

export default mongoose.model('Booking', bookingSchema);

