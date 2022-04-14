{
    let carousels = document.querySelectorAll('[data-carousel]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let carouselSwiper = new Swiper(carousel.querySelector('.swiper'), {
                speed: 800,
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 30,
                    }
                },
            });
        })
    }
}