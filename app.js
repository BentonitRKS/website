// ==========================================================================
// PT BENTONIT REKAYASA SIPIL
// GLOBAL JAVASCRIPT
// Digunakan oleh seluruh halaman website
// ==========================================================================


// ==========================================================================
// 1. HAMBURGER MENU / MOBILE NAVIGATION
// Menangani menu mobile pada seluruh halaman yang menggunakan struktur
// header standar website.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // Mencari elemen navigasi utama
    const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
    const mobileMenu = document.querySelector('.header .nav-bar .nav-list ul');

    // Mengambil seluruh link navigasi
    const menuItems = document.querySelectorAll(
        '.header .nav-bar .nav-list ul li a'
    );

    // ----------------------------------------------------------------------
    // Toggle hamburger menu
    // ----------------------------------------------------------------------

    if (hamburger && mobileMenu) {

        hamburger.addEventListener('click', () => {

            const isActive = hamburger.classList.toggle('active');

            mobileMenu.classList.toggle('active');

            // Menjaga informasi aksesibilitas tetap sesuai dengan kondisi menu
            hamburger.setAttribute(
                'aria-expanded',
                isActive ? 'true' : 'false'
            );

        });


        // ------------------------------------------------------------------
        // Dukungan keyboard untuk hamburger
        // ------------------------------------------------------------------

        hamburger.addEventListener('keydown', (event) => {

            if (event.key === 'Enter' || event.key === ' ') {

                event.preventDefault();

                hamburger.click();

            }

        });

    }


    // ----------------------------------------------------------------------
    // Menutup menu setelah link navigasi diklik
    // ----------------------------------------------------------------------

    menuItems.forEach((item) => {

        item.addEventListener('click', () => {

            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }

            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }

        });

    });

});


// ==========================================================================
// 2. HEADER SCROLL EFFECT
// Mengubah tampilan header ketika pengguna mulai melakukan scroll.
// ==========================================================================

const header = document.querySelector('.header.container');

if (header) {

    document.addEventListener('scroll', () => {

        const scrollPosition = window.scrollY;

        if (scrollPosition > 250) {

            header.style.backgroundColor = '#29323c';

        } else {

            header.style.backgroundColor = 'transparent';

        }

    });

}


// ==========================================================================
// 3. REVEAL ON SCROLL
// Menampilkan elemen secara bertahap ketika elemen masuk viewport.
// Sistem ini digunakan oleh index.html maupun halaman layanan seperti
// sondir-cpt.html.
// ==========================================================================

const observerOptions = {

    root: null,

    rootMargin: '0px',

    // Animasi mulai ketika sekitar 15% elemen terlihat
    threshold: 0.15

};


const revealOnScroll = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // Mengaktifkan animasi CSS
                entry.target.classList.add('active');

                // Tidak perlu diamati lagi setelah animasi selesai
                observer.unobserve(entry.target);

            }

        });

    },
    observerOptions
);


// --------------------------------------------------------------------------
// Mencari seluruh elemen dengan class "reveal"
// --------------------------------------------------------------------------

const reveals = document.querySelectorAll('.reveal');

reveals.forEach((reveal) => {

    revealOnScroll.observe(reveal);

});


// ==========================================================================
// 4. WHY US ACCORDION
// Hanya aktif jika section #why-us tersedia.
// Dengan pengecekan ini, kode aman ketika dijalankan pada halaman Sondir.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    const whyUsItems = document.querySelectorAll(
        '#why-us .service-item'
    );


    // Jika halaman tidak mempunyai #why-us, bagian ini dilewati
    if (!whyUsItems.length) {
        return;
    }


    whyUsItems.forEach((item) => {


        // ------------------------------------------------------------------
        // A. HOVER
        // ------------------------------------------------------------------

        item.addEventListener('mouseenter', () => {

            if (!item.classList.contains('is-open')) {

                item.classList.add('is-hovered');

                item.setAttribute('aria-expanded', 'true');

            }

        });


        // ------------------------------------------------------------------
        // B. MOUSE LEAVE
        // ------------------------------------------------------------------

        item.addEventListener('mouseleave', () => {

            if (!item.classList.contains('is-open')) {

                item.classList.remove('is-hovered');

                item.setAttribute('aria-expanded', 'false');

            }

        });


        // ------------------------------------------------------------------
        // C. CLICK
        // ------------------------------------------------------------------

        item.addEventListener('click', () => {

            const isOpen = item.classList.contains('is-open');


            if (isOpen) {

                // Menutup accordion
                item.classList.remove(
                    'is-open',
                    'is-hovered'
                );

                item.setAttribute(
                    'aria-expanded',
                    'false'
                );

            } else {

                // Membuka accordion
                item.classList.add('is-open');

                item.classList.remove('is-hovered');

                item.setAttribute(
                    'aria-expanded',
                    'true'
                );

            }

        });


        // ------------------------------------------------------------------
        // D. KEYBOARD ACCESSIBILITY
        // ------------------------------------------------------------------

        item.addEventListener('keydown', (event) => {

            if (
                event.key === 'Enter' ||
                event.key === ' '
            ) {

                event.preventDefault();

                item.click();

            }

        });

    });

});
