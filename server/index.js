/* ATELIER platform backend — Express + JSON file persistence.
 * Serves the built Vite frontend (dist/) and the JSON API on one port.
 */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 8080;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ contacts: [], bookings: [] }, null, 2));
}

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return { contacts: [], bookings: [] };
  }
}
function writeDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '256kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'atelier', time: new Date().toISOString() });
});

function validate(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') errors.push('invalid body');
  if (!payload?.name || String(payload.name).trim().length < 2) errors.push('name required');
  if (!payload?.phone || String(payload.phone).trim().length < 6) errors.push('phone required');
  return errors;
}

function persist(kind) {
  return (req, res) => {
    const body = req.body || {};
    const errors = validate(body);
    if (errors.length) return res.status(400).json({ ok: false, errors });
    const entry = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      storeSlug: body.storeSlug || null,
      name: String(body.name).slice(0, 200),
      phone: String(body.phone).slice(0, 40),
      message: body.message ? String(body.message).slice(0, 4000) : '',
      extras: Object.fromEntries(
        Object.entries(body)
          .filter(([k]) => !['name', 'phone', 'message', 'storeSlug'].includes(k))
          .map(([k, v]) => [k, typeof v === 'string' ? v.slice(0, 500) : v])
      ),
      createdAt: new Date().toISOString(),
    };
    const db = readDb();
    db[kind].push(entry);
    writeDb(db);
    return res.json({ ok: true, id: entry.id });
  };
}

app.post('/api/contact', persist('contacts'));
app.post('/api/booking', persist('bookings'));

/* static frontend + SPA fallback */
const dist = path.join(__dirname, '..', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1h', index: false, redirect: false }));
  /* SPA fallback (Express 5: no '*' routes) */
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[atelier] listening on :${PORT}`);
});
