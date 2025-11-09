import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// --- Données de test ---
const pitches = [
  {
    id: "p_riy_5v5_1",
    venue_id: "v_riy_1",
    name: "Riyadh Arena - Terrain 5v5",
    city: "Riyadh",
    sport: "football",
    format: "5",
    surface: "gazon synthétique",
    indoor: false,
    ac: false,
    lighting: true,
    price_per_hour_sar: 180,
    photos: ["https://picsum.photos/seed/5v5/400/300"],
    available_today_slots: ["18:00-19:00", "19:00-20:00", "21:00-22:00"]
  },
  {
    id: "p_riy_padel_1",
    venue_id: "v_riy_2",
    name: "Padel Club - Court A",
    city: "Riyadh",
    sport: "padel",
    format: "2",
    surface: "moquette sable",
    indoor: true,
    ac: true,
    lighting: true,
    price_per_hour_sar: 220,
    photos: ["https://picsum.photos/seed/padel/400/300"],
    available_today_slots: ["17:00-18:00", "20:00-21:00"]
  }
];

// --- Routes ---
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/pitches', (req, res) => {
  const { city } = req.query;
  if (city) {
    return res.json(pitches.filter(p => p.city.toLowerCase() === city.toLowerCase()));
  }
  return res.json(pitches);
});

// --- Démarrage ---
app.listen(PORT, '0.0.0.0', () => {
  console.log(`PlayArena API listening on :${PORT}`);
});
