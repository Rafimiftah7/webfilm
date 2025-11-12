document.addEventListener('DOMContentLoaded', () => {

    // Ambil semua container carousel
    const carouselContainers = document.querySelectorAll('.carousel-container');

    // Loop setiap container carousel
    carouselContainers.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const prevButton = container.querySelector('.carousel-btn.prev');
        const nextButton = container.querySelector('.carousel-btn.next');

        if (!track || !prevButton || !nextButton) {
            return; // Lewati jika ada elemen yang hilang
        }

        // Fungsi untuk menggeser carousel
        function scrollCarousel(offset) {
            // Menggeser 'track' sebesar lebar satu 'card' (ditambah gap)
            // Kita ambil lebar card pertama sebagai acuan
            const card = track.querySelector('.card');
            if (!card) return;

            const cardWidth = card.offsetWidth;
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap) || 0;
            
            // Menggeser sebesar lebar 1 card + 1 gap
            track.scrollBy({
                left: (cardWidth + gap) * offset,
                behavior: 'smooth'
            });
        }

        // Fungsi untuk cek dan update tombol panah (apakah di ujung)
        function updateArrowVisibility() {
            // Cek posisi scroll
            const atStart = track.scrollLeft === 0;
            const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10; // Toleransi 10px

            prevButton.style.display = atStart ? 'none' : 'flex';
            nextButton.style.display = atEnd ? 'none' : 'flex';
        }

        // Event listener untuk tombol
        nextButton.addEventListener('click', () => {
            // Geser ke kanan (positif)
            scrollCarousel(1); 
        });

        prevButton.addEventListener('click', () => {
            // Geser ke kiri (negatif)
            scrollCarousel(-1); 
        });

        // Update visibilitas tombol saat di-scroll (termasuk manual scroll)
        track.addEventListener('scroll', updateArrowVisibility);

        // Panggil sekali di awal untuk set kondisi awal
        updateArrowVisibility();
    });
});