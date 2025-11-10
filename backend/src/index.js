import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// ✅ CORS pour Expo, localhost et réseaux locaux
const allowed = [
  /\.expo\.dev$/,                                  // Expo preview
  /^https?:\/\/localhost(:\d+)?$/,                 // localhost
  /^https?:\/\/(10|172\.16|192\.168)\.\d+\.\d+\.\d+(:\d+)?$/ // LAN dev
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);            // outils CLI, curl
    const ok = allowed.some(re => re.test(origin));
    cb(ok ? null : new Error('CORS blocked'), ok);
  },
  methods: ['GET','POST','PUT','PATCH','DELETE'],
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Route test pour vérifier la connexion
app.get('/dbcheck', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({ mongo: isConnected });
});