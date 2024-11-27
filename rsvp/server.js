const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk menerima data RSVP
app.post('/submit', (req, res) => {
  const newResponse = req.body;

  const filePath = path.join(__dirname, 'responses.json');

  // Baca file JSON yang ada
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca file JSON.' });
    }

    const responses = JSON.parse(data || '[]');
    responses.push(newResponse);

    // Tulis kembali ke file JSON
    fs.writeFile(filePath, JSON.stringify(responses, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal menyimpan data ke file JSON.' });
      }

      res.json({ message: 'Terimakasih telah memberikan ucapan kepada mempelai' });
    });
  });
});

// Route untuk mengambil data RSVP dari JSON
app.get('/responses', (req, res) => {
  const filePath = path.join(__dirname, 'responses.json');

  // Baca file JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal membaca file JSON.' });
    }

    res.json(JSON.parse(data || '[]'));
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
