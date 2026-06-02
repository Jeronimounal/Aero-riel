// ============================================================
//  AERO-RIEL — Servidor Express
//  Ejecutar: node server.js  |  Dev: npx nodemon server.js
// ============================================================

const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ──────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// ── Rutas ────────────────────────────────────────────────────
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// ── API de imágenes: devuelve lista de renders disponibles ───
app.get('/api/renders', (req, res) => {
  const fs = require('fs');
  const rendersDir = path.join(__dirname, 'public/images/renders');
  const quijoteDir = path.join(__dirname, 'public/images/quijote');

  const renders = fs.existsSync(rendersDir)
    ? fs.readdirSync(rendersDir)
        .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .map(f => ({ name: f, url: `/images/renders/${f}` }))
    : [];

  const quijote = fs.existsSync(quijoteDir)
    ? fs.readdirSync(quijoteDir)
        .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .map(f => ({ name: f, url: `/images/quijote/${f}` }))
    : [];

  res.json({ renders, quijote, total: renders.length + quijote.length });
});

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Iniciar servidor ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ✈  AERO-RIEL servidor corriendo');
  console.log(`  🌐 http://localhost:${PORT}`);
  console.log('');
});

module.exports = app;
