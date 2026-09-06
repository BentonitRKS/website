// ==========================================================================
// PT BENTONIT REKAYASA SIPIL
// GLOBAL JAVASCRIPT
// ==========================================================================
// File ini digunakan oleh seluruh halaman website.
//
// Fungsi utama:
// 1. Hamburger menu / mobile navigation
// 2. Header scroll effect
// 3. Reveal animation
// 4. Why Us accordion
//
// CATATAN:
// Logika khusus suatu halaman layanan sebaiknya ditempatkan di file JS
// khusus apabila nantinya benar-benar diperlukan.
//
// Untuk halaman Sondir, Bor, Laboratorium, dan Survei Topografi,
// interaksi visual sederhana seperti hover panel sebaiknya tetap
// ditangani oleh CSS agar ringan dan mudah dipelihara.
// ==========================================================================



// ==========================================================================
// 1. HAMBURGER MENU / MOBILE NAVIGATION
// ==========================================================================
// Menangani menu navigasi mobile pada seluruh halaman yang menggunakan
// struktur header standar website.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // Mengambil elemen navigasi utama
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
    // Toggle hamburger menu
    // ----------------------------------------------------------------------

    if (hamburger && mobileMenu) {

        hamburger.addEventListener('click', () => {

            // Mengubah status hamburger
            const isActive = hamburger.classList.toggle('active');

            // Membuka / menutup menu mobile
            mobileMenu.classList.toggle('active');


            // --------------------------------------------------------------
            // Accessibility
            // --------------------------------------------------------------

            hamburger.setAttribute(
                'aria-expanded',
                isActive ? 'true' : 'false'
            );

        });


        // ------------------------------------------------------------------
        // Dukungan keyboard untuk hamburger
        // ------------------------------------------------------------------
        // Enter atau Space akan menghasilkan perilaku yang sama dengan klik.
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
    // Menutup menu mobile setelah link navigasi diklik
    // ----------------------------------------------------------------------

    menuItems.forEach((item) => {

        item.addEventListener('click', () => {

            // Menutup hamburger
            if (hamburger) {

                hamburger.classList.remove('active');

                hamburger.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }


            // Menutup menu
            if (mobileMenu) {

                mobileMenu.classList.remove('active');

            }

        });

    });

});



// ==========================================================================
// 2. HEADER SCROLL EFFECT
// ==========================================================================
// Mengubah tampilan header ketika pengguna mulai melakukan scroll.
//
// Header hanya diproses jika struktur header tersedia pada halaman.
// Dengan demikian app.js tetap aman digunakan pada seluruh halaman website.
// ==========================================================================

const header = document.querySelector(
    '.header.container'
);


if (header) {

    document.addEventListener('scroll', () => {

        const scrollPosition = window.scrollY;


        // ------------------------------------------------------------------
        // Kondisi ketika halaman sudah mulai di-scroll
        // ------------------------------------------------------------------

        if (scrollPosition > 250) {

            header.style.backgroundColor = '#29323c';

        } else {

            header.style.backgroundColor = 'transparent';

        }

    });

}



// ==========================================================================
// 3. REVEAL ON SCROLL
// ==========================================================================
// Menampilkan elemen secara bertahap ketika elemen memasuki viewport.
//
// Sistem ini dapat digunakan oleh:
// - index.html
// - sondir-cpt.html
// - bor-drilling.html
// - laboratorium.html
// - survei-topografi.html
// - halaman layanan lainnya
//
// Cukup tambahkan class:
//
//     class="reveal"
//
// pada elemen yang ingin dianimasikan.
// ==========================================================================


// --------------------------------------------------------------------------
// Mengecek dukungan browser terhadap IntersectionObserver
// --------------------------------------------------------------------------

if ('IntersectionObserver' in window) {


    const observerOptions = {

        root: null,

        rootMargin: '0px',

        // Animasi mulai ketika sekitar 15% elemen terlihat
        threshold: 0.15

    };


    // ----------------------------------------------------------------------
    // Membuat observer
    // ----------------------------------------------------------------------

    const revealOnScroll = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    // Mengaktifkan animasi melalui CSS
                    entry.target.classList.add('active');


                    // ------------------------------------------------------
                    // Elemen hanya perlu dianimasikan satu kali.
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

    const reveals = document.querySelectorAll(
        '.reveal'
    );


    // ----------------------------------------------------------------------
    // Mendaftarkan setiap elemen ke observer
    // ----------------------------------------------------------------------

    reveals.forEach((reveal) => {

        revealOnScroll.observe(reveal);

    });

}



// ==========================================================================
// 4. WHY US ACCORDION
// ==========================================================================
// Accordion hanya aktif apabila section #why-us tersedia.
//
// Perilaku:
// - Hover  : menampilkan preview
// - Mouse leave : preview kembali tertutup
// - Click  : membuka / mengunci accordion
// - Click kembali : menutup accordion
// - Enter / Space : mendukung keyboard
//
// Karena selector menggunakan #why-us, bagian ini tidak akan mengganggu
// halaman layanan seperti Sondir, Bor, Laboratorium, atau Topografi.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {


    // ----------------------------------------------------------------------
    // Mengambil seluruh item Why Us
    // ----------------------------------------------------------------------

    const whyUsItems = document.querySelectorAll(
        '#why-us .service-item'
    );


    // ----------------------------------------------------------------------
    // Jika halaman tidak memiliki #why-us,
    // maka fungsi ini tidak perlu dijalankan.
    // ----------------------------------------------------------------------

    if (!whyUsItems.length) {

        return;

    }


    // ----------------------------------------------------------------------
    // Menambahkan behavior ke setiap item
    // ----------------------------------------------------------------------

    whyUsItems.forEach((item) => {


        // ==================================================================
        // A. HOVER ENTER
        // ==================================================================

        item.addEventListener('mouseenter', () => {

            // Hover hanya bersifat preview apabila accordion belum dikunci
            if (!item.classList.contains('is-open')) {

                item.classList.add('is-hovered');

                item.setAttribute(
                    'aria-expanded',
                    'true'
                );

            }

        });


        // ==================================================================
        // B. HOVER LEAVE
        // ==================================================================

        item.addEventListener('mouseleave', () => {

            // Jangan menutup jika item sedang dikunci melalui klik
            if (!item.classList.contains('is-open')) {

                item.classList.remove('is-hovered');

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

            const isOpen = item.classList.contains(
                'is-open'
            );


            // ----------------------------------------------------------------
            // Jika sudah terbuka
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
            // Jika masih tertutup
            // ----------------------------------------------------------------

            else {

                item.classList.add(
                    'is-open'
                );

                item.classList.remove(
                    'is-hovered'
                );

                item.setAttribute(
                    'aria-expanded',
                    'true'
                );

            }

        });


        // ==================================================================
        // D. KEYBOARD ACCESSIBILITY
        // ==================================================================
        // Enter dan Space berfungsi sama seperti klik.
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



// ==========================================================================
// 5. GLOBAL SERVICE-PAGE COMPATIBILITY
// ==========================================================================
// Bagian ini sengaja ringan.
//
// Website nantinya akan memiliki beberapa layanan yang saling berhubungan,
// misalnya:
//
//     Sondir / CPT
//          ↓
//     Bor + SPT
//          ↓
//     Laboratorium
//          ↓
//     Survei Topografi
//          ↓
//     Integrasi Data / Interpretasi
//
// Hubungan antar layanan tersebut sebaiknya dibuat melalui HTML <a href>
// sehingga tetap dapat diakses walaupun JavaScript dimatikan.
//
// JavaScript GLOBAL tidak perlu memaksakan redirect atau navigasi layanan.
//
// Contoh HTML yang direkomendasikan nantinya:
//
//     <a href="bor-drilling.html">Bor & SPT</a>
//     <a href="laboratorium.html">Laboratorium</a>
//     <a href="survei-topografi.html">Survei Topografi</a>
//
// Dengan pendekatan ini setiap halaman tetap berdiri sendiri, tetapi
// seluruh layanan membentuk satu ekosistem penyelidikan dan data geoteknik.
// ==========================================================================



// ==========================================================================
// 6. CATATAN PENGEMBANGAN
// ==========================================================================
// Apabila website nantinya membutuhkan interaksi yang lebih kompleks,
// misalnya:
//
// - Filter portofolio
// - Gallery proyek
// - Modal foto
// - Kalkulator estimasi
// - Form quotation
// - Dynamic service selector
// - Integrasi data proyek
//
// maka fungsi tersebut sebaiknya dibuat dalam modul / file JS khusus.
//
// Jangan memasukkan seluruh logika halaman ke dalam app.js.
//
// Prinsip:
//
//     app.js
//         → fungsi website yang bersifat GLOBAL
//
//     sondir.js
//         → fungsi khusus Sondir jika suatu saat diperlukan
//
//     drilling.js
//         → fungsi khusus Bor / SPT
//
//     laboratory.js
//         → fungsi khusus Laboratorium
//
//     topography.js
//         → fungsi khusus Survei Topografi
//
// Untuk saat ini, Sondir belum membutuhkan JavaScript khusus karena
// hover technical panel dapat ditangani sepenuhnya oleh CSS.
// ==========================================================================



// ==========================================================================
// END OF GLOBAL JAVASCRIPT
// ==========================================================================
// PT BENTONIT REKAYASA SIPIL
// ==========================================================================
