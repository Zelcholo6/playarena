# PlayArena — MVP Scaffold (FR)

Monorepo minimal pour démarrer l’app de réservation d’installations sportives.

## Dossiers
- `frontend/` — App Expo React Native (FR) avec **splash animé** (dégradé bleu foncé) et **logo en header**.
- `backend/` — API Node/Express mock (OTP fictif, recherche terrains, réservation avec QR).
- `openapi/` — Spécification OpenAPI v0.

## Prérequis
- Node.js 18+
- npm ou yarn
- iPhone avec Expo Go

## Lancer l’API
```
cd backend
cp .env.example .env
npm i
npm run dev
```
API sur http://localhost:3000

## Lancer l’app mobile
```
cd frontend
npm i
npm run start
```
Ouvre avec Expo Go sur iOS/Android.  
Flux: Accueil → Fiche terrain → Paiement (mock) → QR de confirmation.

