// --- Wine AI Backend Server ---
// Einfaches Express-Backend mit Upload- und Analysefunktion

import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Ordner für Uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer Setup (Datei-Upload)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// --- Test-Route ---
app.get("/", (req, res) => {
  res.send("🍷 Wine AI Backend läuft erfolgreich!");
});

// --- Upload-Route ---
app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Keine Datei hochgeladen" });
  res.json({
    message: "Upload erfolgreich",
    file: req.file.filename,
  });
});

// --- Analyse-Route ---
app.post("/analyze", (req, res) => {
  const { wineName, notes } = req.body;

  // Beispielhafte KI-Analyse (später durch echtes Modell ersetzbar)
  const result = {
    variety: wineName || "Unbekannter Wein",
    taste: notes || "Keine Beschreibung",
    foodPairing: "Passt gut zu Pasta, Käse oder Fleisch",
    drinkBy: "2028",
  };

  res.json(result);
});

// --- Port-Konfiguration ---
const port = process.env.PORT || 10000; // ✅ wichtig für Render!
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server läuft auf Port ${port}`);
});
