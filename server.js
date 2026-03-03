// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serva frontend

const DATA_FILE = path.join(__dirname, 'data.json');

// Läs data från fil
function readData() {
  if (!fs.existsSync(DATA_FILE)) return { users: {}, passwords: {} };
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Skriv data till fil
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Hämta all data
app.get('/load', (req, res) => {
  res.json(readData());
});

// Spara all data
app.post('/save', (req, res) => {
  writeData(req.body);
  res.json({ status: 'ok' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server körs på port " + PORT));
