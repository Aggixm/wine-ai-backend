const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.fields([{ name: 'front' }, { name: 'back' }]), (req, res) => {
  console.log(req.files);
  res.json({ message: 'Dateien hochgeladen' });
});

app.post('/analyze', (req, res) => {
  const sampleResult = {
    grape: "Cabernet Sauvignon",
    taste: "trocken, fruchtig",
    foodPairing: "Rindfleisch, Pasta",
    bestBefore: "2026-12-31"
  };
  res.json(sampleResult);
});

app.post('/add-wine', (req, res) => {
  const wine = req.body;
  const dataPath = path.join(__dirname, 'data', 'wines.json');
  let wines = [];
  if (fs.existsSync(dataPath)) {
    wines = JSON.parse(fs.readFileSync(dataPath));
  }
  wines.push(wine);
  fs.writeFileSync(dataPath, JSON.stringify(wines, null, 2));
  res.json({ message: 'Wein hinzugefügt', wine });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});