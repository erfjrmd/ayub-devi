(function () {
    'use strict';
    
    // Ambil parameter dari URL
    var searchParams = new URLSearchParams(window.location.search);

    // Periksa apakah parameter 'kepada' ada
    if (searchParams.has('kepada')) {
        // Ambil nilai dari parameter 'kepada'
        var nama = searchParams.get('kepada');

        // Perbarui teks elemen dengan ID 'kepada-tamu'
        if (nama) {
            document.getElementById("kepada-tamu").innerText = nama;
        } else {
            // Jika parameter ada tapi kosong
            document.getElementById("kepada-tamu").innerText = "Tamu Undangan";
        }
    } else {
        // Jika parameter tidak ada, tampilkan teks default
        document.getElementById("kepada-tamu").innerText = "Tamu Undangan";
    }
})();
