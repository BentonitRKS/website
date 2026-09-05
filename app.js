// --- KODE LOGIKA HAMBURGER MENU (MOBILE) ---
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.remove('active');
		mobile_menu.classList.remove('active');
	});
});


// --- KODE ANIMASI SCROLL (MUNCUL SEKALI) ---
// Membuat IntersectionObserver untuk mendeteksi kapan elemen terlihat di layar
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Elemen akan memicu animasi saat 15% bagiannya terlihat di layar
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Menambahkan class 'active' yang memicu CSS opacity 1 & translateY(0)
            entry.target.classList.add('active');
            
            // Berhenti memantau elemen ini agar ia tidak hilang lagi saat scroll ke atas
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Menerapkan observer ke semua elemen yang memiliki class 'reveal'
const reveals = document.querySelectorAll('.reveal');
reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
});
