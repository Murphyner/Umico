import { SHowNAvCat, ShowSide } from './AllPage'
import { showActual } from './actual-category'
import { getActualTag } from './actual-tags'
import { ShowEndirimSlide } from './endirim-slide'
import './input.css'
import { getMegaData } from './mega-endirim'
import { showMoreSail } from './more-sale'
import './style.css'

showMoreSail()
showActual()
getMegaData()
getActualTag()

/*----------------------Gundelik Endirimler--------------------------*/

ShowEndirimSlide()

/*----------------------Mehsul Kataloqu click---------------------------*/

const navbarCategorySelect = document.getElementById('navbar-category-select')
navbarCategorySelect.onclick = SHowNAvCat

/*----------------------Sidebar Click------------------------------ */

const sidebarBtnOpen = document.getElementById('sidebar-btn-open')
const CloseSide = document.getElementById('CloseSide')
sidebarBtnOpen.onclick = ShowSide
CloseSide.onclick = ShowSide

const sp = document.querySelector('.mySwiper4')

function swiper() {
    let swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    let swiper1 = new Swiper(".mySwiper1", {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1000: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
        },
    });

    let swiper2 = new Swiper(".mySwiper2", {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
        },
    });

    let swiper3 = new Swiper(".mySwiper3", {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
        },
    });

    let swiper4 = new Swiper(".mySwiper4", {
        slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
        },
    });
}

if(sp){
    swiper()
}