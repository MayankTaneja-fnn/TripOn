document.addEventListener('DOMContentLoaded', function () {
    // Check if Swiper is available
    if (typeof Swiper !== 'undefined') {
        // Initialize Swiper
        const swiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        // Log the swiper instance to ensure it's correctly initialized
        console.log(swiper);
    } else {
        console.error('Swiper not found. Please check the script loading.');
    }
});