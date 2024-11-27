import fs from 'fs';
import path from 'path';

// Path ke file responses.json
const filePath = path.join(process.cwd(), 'responses.json');

// Fungsi untuk menangani permintaan GET (ambil data)
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Baca data dari file JSON
      const data = fs.readFileSync(filePath, 'utf-8');
      const responses = JSON.parse(data);
      res.status(200).json(responses);
    } catch (err) {
      res.status(500).json({ message: 'Gagal membaca data.' });
    }
  } else if (req.method === 'POST') {
    // Fungsi untuk menangani permintaan POST (terima data dan simpan)
    try {
      const newResponse = req.body;
      
      // Baca file JSON yang ada
      const data = fs.readFileSync(filePath, 'utf-8');
      const responses = JSON.parse(data || '[]');
      
      // Tambahkan data baru
      responses.push(newResponse);
      
      // Tulis data kembali ke file
      fs.writeFileSync(filePath, JSON.stringify(responses, null, 2));
      
      res.status(200).json({ message: 'Data berhasil disimpan.' });
    } catch (err) {
      res.status(500).json({ message: 'Gagal menyimpan data.' });
    }
  } else {
    // Jika metode HTTP lainnya
    res.status(405).json({ message: 'Metode tidak diizinkan' });
  }
}
