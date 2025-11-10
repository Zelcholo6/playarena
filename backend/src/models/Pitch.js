import mongoose from 'mongoose';

const pitchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
});

export default mongoose.model('Pitch', pitchSchema);

