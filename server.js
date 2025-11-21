const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/'); },
  filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});

app.post('/analyze', (req, res) => {
  res.json({ message: 'Analysis complete', data: req.body });
});

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });