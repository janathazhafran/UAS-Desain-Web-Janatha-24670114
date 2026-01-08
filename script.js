// ================= AMBIL ELEMEN GREETING =================
const greeting = document.getElementById("greeting");

// ================= AMBIL JAM SAAT INI =================
const hour = new Date().getHours();

// ================= DEFAULT TEKS =================
let text = "Selamat Datang";

// ================= LOGIKA GREETING WAKTU =================
if (hour >= 5 && hour <= 11) {
  text = "Selamat Pagi";
} else if (hour >= 12 && hour <= 14) {
  text = "Selamat Siang";
} else if (hour >= 15 && hour <= 17) {
  text = "Selamat Sore";
} else {
  text = "Selamat Malam";
}

// ================= TAMPILKAN HASIL =================
greeting.textContent = text;



const splineViewer = document.querySelector('spline-viewer');

if (splineViewer) {
    // Kita harus menunggu event 'load' dari Spline, bukan hanya window load
    splineViewer.addEventListener('load', () => {
        const shadow = splineViewer.shadowRoot;
        
        if (shadow) {
            // Buat elemen style baru
            const style = document.createElement('style');
            
            // Isi CSS untuk menyembunyikan elemen ID #logo di dalam shadow DOM
            style.textContent = `
                #logo {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    width: 0 !important;
                    height: 0 !important;
                    pointer-events: none !important;
                }
            `;
            
            // Masukkan style tersebut ke dalam shadow root
            shadow.appendChild(style);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // 1. Buat elemen Modal (Lightbox) secara dinamis
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    // Tambahkan styling dasar untuk lightbox lewat JS (atau bisa dipindah ke CSS)
    Object.assign(lightbox.style, {
        position: 'fixed',
        zIndex: '1000',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'zoom-out',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });

    const img = document.createElement('img');
    Object.assign(img.style, {
        maxWidth: '90%',
        maxHeight: '90%',
        border: '2px solid white',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(134, 101, 228, 0.5)',
        transform: 'scale(0.8)',
        transition: 'transform 0.3s ease'
    });
    lightbox.appendChild(img);

    // 2. Fungsi Buka Gambar
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.style.display = 'flex';
            // Sedikit delay agar transisi opacity berjalan
            setTimeout(() => {
                lightbox.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 10);
            img.src = image.src;
        });
    });

    // 3. Fungsi Tutup Gambar
    lightbox.addEventListener('click', e => {
        if (e.target !== img) { // Tutup jika klik di area gelap (bukan di gambar)
            lightbox.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        }
    });
});