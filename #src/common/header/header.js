let header = document.querySelector('[data-header]');
if (header) {
    let burger = document.querySelector('[data-action="toggle-menu-mobile"]');
    let mobileMenu = header.querySelector('.menu');

    const burgerBtnAnimationToggle = (burger) => {
        burger.classList.toggle('burger--active')
        burger.children[0].classList.toggle('burger__cross--first')
        burger.children[1].classList.toggle('burger__cross--second')
        burger.children[2].classList.toggle('burger__cross--third')
        burger.children[3].classList.toggle('burger__cross--fourth')
    }

    burger.addEventListener('click', () => {
        burgerBtnAnimationToggle(burger);
        this.utils.slideToggle(mobileMenu);
    })


    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
    })

}
