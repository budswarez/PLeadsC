// ═══════════════════════════════════════════════════════
// PLEADS CRM - Backend Proxy para Google Places API
// Resolve o problema de CORS ao chamar a API do navegador
// ═══════════════════════════════════════════════════════
//
// USO:
//   1. npm install express cors dotenv
//   2. Crie um .env com GOOGLE_API_KEY=sua_chave
//   3. node server/proxy.js
//   4. O proxy roda em http://localhost:3001
//
// O Vite dev server já está configurado para fazer proxy
// de /api/places/* para localhost:3001 automaticamente.
// ═══════════════════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config(); // carrega .env

const app = express();
const PORT = process.env.PROXY_PORT || 3001;
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error('❌ GOOGLE_API_KEY não encontrada no .env');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// ─── Text Search ───
app.get('/api/places/search', async (req, res) => {
  try {
    const { query, pagetoken } = req.query;

    let url;
    if (pagetoken) {
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${pagetoken}&key=${API_KEY}&language=pt-BR`;
    } else {
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}&language=pt-BR&region=br`;
    }

    console.log(`🔍 Search: ${query || `page:${pagetoken?.slice(0,20)}...`}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log(`   → ${data.status}: ${data.results?.length || 0} resultados`);
    res.json(data);
  } catch (err) {
    console.error('❌ Search error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Place Details ───
app.get('/api/places/details', async (req, res) => {
  try {
    const { place_id } = req.query;
    const fields = 'name,formatted_address,formatted_phone_number,international_phone_number,website,rating,user_ratings_total,types,opening_hours,business_status,geometry,price_level,plus_code,url,vicinity';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${API_KEY}&language=pt-BR`;

    console.log(`📍 Details: ${place_id.slice(0, 30)}...`);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('❌ Details error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Health check ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasKey: !!API_KEY });
});

app.listen(PORT, () => {
  console.log(`\n⚡ PLEADS Proxy rodando em http://localhost:${PORT}`);
  console.log(`   API Key: ${API_KEY.slice(0, 8)}...${API_KEY.slice(-4)}`);
  console.log(`   Endpoints:`);
  console.log(`     GET /api/places/search?query=...`);
  console.log(`     GET /api/places/details?place_id=...`);
  console.log(`     GET /api/health\n`);
});
