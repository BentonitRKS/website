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

    // ----------------------------------------------------------------------
    // Mencari elemen navigasi utama
    // ----------------------------------------------------------------------

    const hamburger = document.querySelector(
        '.header .nav-bar .nav-list .hamburger'
    );

    const mobileMenu = document.querySelector(
        '.header .nav-bar .nav-list ul'
    );


    // ----------------------------------------------------------------------
    // Mengambil seluruh link navigasi
    // ----------------------------------------------------------------------

    const menuItems = document.querySelectorAll(
        '.header .nav-bar .nav-list ul li a'
    );


    // ----------------------------------------------------------------------
    // TOGGLE HAMBURGER MENU
    // ----------------------------------------------------------------------

    if (hamburger && mobileMenu) {

        hamburger.addEventListener('click', () => {

            // Mengubah status hamburger
            const isActive = hamburger.classList.toggle('active');

            // Mengubah status menu mobile
            mobileMenu.classList.toggle('active');


            // ----------------------------------------------------------------
            // Accessibility
            // Memberikan informasi kepada screen reader mengenai kondisi
            // menu saat ini.
            // ----------------------------------------------------------------

            hamburger.setAttribute(
                'aria-expanded',
                isActive ? 'true' : 'false'
            );

        });


        // ------------------------------------------------------------------
        // KEYBOARD ACCESSIBILITY
        // Memungkinkan hamburger digunakan dengan Enter atau Space.
        // ------------------------------------------------------------------

        hamburger.addEventListener('keydown', (event) => {

            if (
                event.key === 'Enter' ||
                event.key === ' '
            ) {

                event.preventDefault();

                hamburger.click();

            }

        });

    }


    // ----------------------------------------------------------------------
    // MENUTUP MENU SETELAH LINK NAVIGASI DIKLIK
    // ----------------------------------------------------------------------

    menuItems.forEach((item) => {

        item.addEventListener('click', () => {

            // Tutup hamburger
            if (hamburger) {

                hamburger.classList.remove('active');

                hamburger.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }


            // Tutup menu mobile
            if (mobileMenu) {

                mobileMenu.classList.remove('active');

            }

        });

    });

});


// ==========================================================================
// 2. HEADER SCROLL EFFECT
// Mengubah tampilan header ketika pengguna mulai melakukan scroll.
//
// Header hanya diproses jika elemen ".header.container" tersedia.
// Dengan demikian, halaman yang tidak menggunakan header tersebut tetap aman.
// ==========================================================================

const header = document.querySelector(
    '.header.container'
);


if (header) {

    document.addEventListener('scroll', () => {

        const scrollPosition = window.scrollY;


        // ------------------------------------------------------------------
        // Ketika pengguna sudah melakukan scroll
        // ------------------------------------------------------------------

        if (scrollPosition > 250) {

            header.style.backgroundColor = '#29323c';

        }


        // ------------------------------------------------------------------
        // Ketika masih berada di bagian atas halaman
        // ------------------------------------------------------------------

        else {

            header.style.backgroundColor = 'transparent';

        }

    });

}


// ==========================================================================
// 3. REVEAL ON SCROLL
// Menampilkan elemen secara bertahap ketika elemen masuk viewport.
//
// Sistem ini digunakan secara global oleh:
// - index.html
// - sondir-cpt.html
// - halaman layanan lainnya
//
// Elemen cukup diberikan class:
//     class="reveal"
// ==========================================================================


// --------------------------------------------------------------------------
// Mengecek apakah browser mendukung IntersectionObserver
// --------------------------------------------------------------------------

if ('IntersectionObserver' in window) {


    const observerOptions = {

        root: null,

        rootMargin: '0px',

        // Animasi dimulai ketika sekitar 15% elemen terlihat
        threshold: 0.15

    };


    // ----------------------------------------------------------------------
    // Membuat Intersection Observer
    // ----------------------------------------------------------------------

    const revealOnScroll = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    // Mengaktifkan animasi melalui CSS
                    entry.target.classList.add('active');


                    // ------------------------------------------------------
                    // Tidak perlu diamati lagi setelah elemen tampil.
                    // Hal ini mengurangi pekerjaan browser.
                    // ------------------------------------------------------

                    observer.unobserve(entry.target);

                }

            });

        },
        observerOptions
    );


    // ----------------------------------------------------------------------
    // Mencari seluruh elemen dengan class "reveal"
    // ----------------------------------------------------------------------

    const reveals = document.querySelectorAll('.reveal');


    reveals.forEach((reveal) => {

        revealOnScroll.observe(reveal);

    });

}


// ==========================================================================
// 4. WHY US ACCORDION
// Digunakan hanya pada section #why-us.
//
// Sistem ini tidak digunakan pada halaman Sondir.
// Karena itu, jika #why-us tidak ditemukan, kode otomatis dilewati.
//
// Interaksi:
// - Hover        → preview sementara
// - Mouse leave  → kembali tertutup jika belum dikunci
// - Click        → membuka / mengunci accordion
// - Click ulang  → menutup accordion
// - Enter/Space  → akses melalui keyboard
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {


    // ----------------------------------------------------------------------
    // Mencari seluruh item pada section Why Us
    // ----------------------------------------------------------------------

    const whyUsItems = document.querySelectorAll(
        '#why-us .service-item'
    );


    // ----------------------------------------------------------------------
    // Jika halaman tidak memiliki #why-us, hentikan proses.
    // ----------------------------------------------------------------------

    if (!whyUsItems.length) {

        return;

    }


    // ----------------------------------------------------------------------
    // Memproses setiap accordion item
    // ----------------------------------------------------------------------

    whyUsItems.forEach((item) => {


        // ==================================================================
        // A. HOVER / MOUSE ENTER
        // ==================================================================

        item.addEventListener('mouseenter', () => {

            // Hanya menggunakan hover preview jika item belum dikunci
            if (!item.classList.contains('is-open')) {

                item.classList.add('is-hovered');


                // Accessibility state
                item.setAttribute(
                    'aria-expanded',
                    'true'
                );

            }

        });


        // ==================================================================
        // B. MOUSE LEAVE
        // ==================================================================

        item.addEventListener('mouseleave', () => {

            // Jika item belum dikunci melalui click,
            // maka hover preview ditutup.
            if (!item.classList.contains('is-open')) {

                item.classList.remove('is-hovered');


                // Accessibility state
                item.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }

        });


        // ==================================================================
        // C. CLICK
        // ==================================================================

        item.addEventListener('click', () => {

            const isOpen = item.classList.contains('is-open');


            // ----------------------------------------------------------------
            // Jika sedang terbuka → tutup
            // ----------------------------------------------------------------

            if (isOpen) {

                item.classList.remove(
                    'is-open',
                    'is-hovered'
                );


                item.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }


            // ----------------------------------------------------------------
            // Jika sedang tertutup → buka dan kunci
            // ----------------------------------------------------------------

            else {

                item.classList.add('is-open');


                // Hover state tidak diperlukan ketika sudah dikunci
                item.classList.remove('is-hovered');


                item.setAttribute(
                    'aria-expanded',
                    'true'
                );

            }

        });


        // ==================================================================
        // D. KEYBOARD ACCESSIBILITY
        // Memungkinkan accordion dibuka menggunakan:
        // - Enter
        // - Space
        // ==================================================================

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
