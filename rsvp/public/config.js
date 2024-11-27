const form = document.getElementById('rsvpForm');
const responsesList = document.getElementById('responsesList');

// Fungsi untuk menampilkan data dari JSON
function displayResponses(responses) {
  responsesList.innerHTML = '';
  if (responses.length === 0) {
    responsesList.innerHTML = '<p>Tidak ada data RSVP.</p>';
  } else {
    responses.forEach(response => {
      const responseElement = document.createElement('div');
      responseElement.classList.add('card', 'mb-3');

      // Menentukan class dan warna untuk kehadiran
      let kehadiranClass = '';
      if (response.kehadiran === 'Hadir') {
        kehadiranClass = 'badge bg-success'; // Hijau untuk Hadir
      } else if (response.kehadiran === 'Tidak Hadir') {
        kehadiranClass = 'badge bg-danger'; // Merah untuk Tidak Hadir
      }

      responseElement.innerHTML = `
        <div class="card-body shadow-sm">
          <h5 class="card-title">${response.nama}
            <span class="${kehadiranClass}">${response.kehadiran}</span>
          </h5>
          <p class="card-text">${response.ucapan}</p>
        </div>
      `;

      responsesList.appendChild(responseElement);
    });
  }
}


// Ambil data RSVP saat halaman dimuat
fetch('/responses')
  .then(response => response.json())
  .then(data => displayResponses(data))
  .catch(error => console.error('Gagal mengambil data:', error));

// Kirim data ke server
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Ambil data dari form
  const kehadiran = document.getElementById('kehadiran').value;
  const nama = document.getElementById('nama').value;
  const ucapan = document.getElementById('ucapan').value;

  // Kirim data ke server menggunakan fetch
  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kehadiran, nama, ucapan })
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      // Setelah data berhasil disubmit, ambil ulang data dan tampilkan
      fetch('/responses')
        .then(response => response.json())
        .then(data => displayResponses(data));
    })
    .catch(error => alert('Gagal mengirim data: ' + error.message));

  // Reset form
  form.reset();
});