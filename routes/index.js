// routes/index.js — Rutas principales de Aero-Riel

const express = require('express');
const path    = require('path');
const router  = express.Router();

// Página principal
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;
