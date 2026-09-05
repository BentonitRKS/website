// ==========================================================================
// 1. KODE LOGIKA HAMBURGER MENU (MOBILE NAVIGATION)
// Mengatur tombol menu navigasi versi layar seluler (buka/tutup menu & efek scroll header)
// ==========================================================================
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

// Event listener untuk membuka/menutup menu saat icon hamburger ditekan
hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

// Mengubah warna latar belakang header secara dinamis saat halaman digulir (scroll)
document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

// Menutup menu mobile secara otomatis saat salah satu daftar link menu diklik
menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.remove('active');
		mobile_menu.classList.remove('active');
	});
});


// ==========================================================================
// 2. KODE ANIMASI SCROLL (REVEAL ON SCROLL)
// Menggunakan IntersectionObserver untuk memunculkan elemen secara bertahap saat digulir
// ==========================================================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Elemen memicu animasi saat 15% bagiannya terlihat di layar
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Menambahkan class 'active' untuk memicu efek transisi CSS opacity & translasi
            entry.target.classList.add('active');
            
            // Berhenti memantau elemen agar animasi tidak terulang saat scroll ke atas
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Menerapkan observer ke seluruh elemen yang memiliki class 'reveal'
const reveals = document.querySelectorAll('.reveal');
reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
});


// ==========================================================================
// 3. KODE INTERAKSI KARTU LAYANAN "MENGAPA MEMILIH KAMI" (ACCORDION & HOVER STATE)
// Mengatur perilaku hover (buka-tutup sementara) dan klik (kunci permanen / toggle)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Menangkap seluruh elemen kartu accordion pada seksi Mengapa Memilih Kami
  const serviceItems = document.querySelectorAll('#why-us .service-item, #services .service-item'); 
  // Catatan: Pada HTML Anda, seksi ini berada di dalam id="why-us"

  const whyUsItems = document.querySelectorAll('#why-us .service-item');

  whyUsItems.forEach(item => {
    
    // A. KONDISI HOVER: Membuka teks sementara saat kursor mendekat
    item.addEventListener('mouseenter', () => {
      // Hanya aktif membuka jika kartu belum dalam status terkunci (locked/clicked)
      if (!item.classList.contains('is-locked')) {
        item.classList.add('is-hovered');
        item.setAttribute('aria-expanded', 'true');
      }
    });

    // B. KONDISI MOUSE LEAVE: Menutup teks kembali saat kursor dijauhkan
    item.addEventListener('mouseleave', () => {
      // Hanya menutup jika tidak dalam status terkunci
      if (!item.classList.contains('is-locked')) {
        item.classList.remove('is-hovered');
        item.setAttribute('aria-expanded', 'false');
      }
    });

    // C. KONDISI KLIK: Mengunci (lock) status terbuka secara permanen atau menutupnya kembali
    item.addEventListener('click', (e) => {
      // Mencegah konflik event bubbling jika ada tag anak di dalamnya
      const isLocked = item.classList.contains('is-locked');

      if (isLocked) {
        // Jika sudah terkunci, klik kedua akan membuka kunci dan menutup kartu
        item.classList.remove('is-locked', 'is-hovered');
        item.setAttribute('aria-expanded', 'false');
      } else {
        // Jika belum terkunci, klik akan mengunci kartu terbuka selamanya sampai diklik lagi
        item.classList.add('is-locked');
        item.classList.remove('is-hovered'); // Bersihkan status hover agar fokus ke status locked
        item.setAttribute('aria-expanded', 'true');
      }
    });

    // D. AKSESIBILITAS KEYBOARD (Dukungan tombol Enter atau Spasi)
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click(); // Memicu fungsi klik yang sama
      }
    });

  });
});
