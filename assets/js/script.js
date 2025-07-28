// Header/burger-menu
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const body = document.body;
    const overlay = document.querySelector('.header__overlay');
    const menuLinks = document.querySelectorAll('.header__menu a');

    if (burger) {
        burger.addEventListener('click', function () {
            const isActive = burger.classList.toggle('active');
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('no-scroll', isActive);
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            burger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    }

    if (menuLinks.length > 0) {
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                burger.classList.remove('active');
                menu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }
});

// Function for start page
window.addEventListener('load', function() { document.body.classList.remove('hidden'); });

// LazyLoad img/iframe/video
// LazyLoad img/iframe/video
// $(document).ready(function () {
//     $('img[src]').each(function () {
//         var $img = $(this);
//         var src = $img.attr('src');
//         $img.attr('data-src', src);
//         $img.removeAttr('src');
//         $img.addClass('lazyload');
//     });

//     var lazyLoadInstance = new LazyLoad({
//         elements_selector: 'img[data-src], .pre-lazyload, [data-pre-lazyload], video[lazy-src]',
//         data_src: "src",
//         data_srcset: "lazy-srcset",
//         data_sizes: "lazy-sizes",
//         skip_invisible: false,
//         class_loading: "lazyloading",
//         class_loaded: "lazyloaded"
//     });

//     window.addEventListener('LazyLoad::Initialized', function (e) {
//     }, false);

//     $(document).on("init", ".slick-slider", function (e, slick) {
//         lazyLoadInstance.loadAll(slick.$slider[0].getElementsByTagName('img'));
//     });

//     // Init parallax
//     if (typeof $.fn.jarallax !== 'undefined') {
//         $('.jarallax').jarallax({
//             speed: 0.5
//         });

//         $('.jarallax-inline').jarallax({
//             speed: 0.5,
//             keepImg: true,
//             onInit: function () {
//                 lazyLoadInstance.update();
//             }
//         });
//     }

//     $(document).on('updated_wc_div', function () {
//         lazyLoadInstance.loadAll();
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

//     if ("IntersectionObserver" in window) {
//         let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
//             entries.forEach(function (entry) {
//                 if (entry.isIntersecting) {
//                     let lazyImage = entry.target;
//                     lazyImage.src = lazyImage.dataset.src;
//                     lazyImage.classList.remove("lazy");
//                     lazyImageObserver.unobserve(lazyImage);
//                 }
//             });
//         });

//         lazyImages.forEach(function (lazyImage) {
//             lazyImageObserver.observe(lazyImage);
//         });
//     } else {
//         lazyImages.forEach(function (lazyImage) {
//             lazyImage.src = lazyImage.dataset.src;
//         });
//     }
// });

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazyload"
    // можно добавить другие настройки при необходимости
});

// Fancybox
$(document).ready(function() {
    $('[data-fancybox]').fancybox({
        buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "thumbs",
            "close"
        ],
        loop: true,      
        protect: true,  
    });
    $('.popup__close').on('click', function() {
        $.fancybox.close();  
    });
});

// Parallax/jarallax effect
// jarallax(document.querySelectorAll('.jarallax'), {
//     speed: .5,
//     imgSize: 'cover',
//     imgPosition: 'center',
// });

// Home slider
$(document).ready(function () {
    var $slider = $('.home-slider__slick');
    var slideCount = $slider.children().length;

    $slider.slick({
        dots: slideCount > 1,
        arrows: true, 
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    arrows: true,
                    dots: false
                }
            }
        ] 
    });
});

// Add class for header scroll
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');

    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }

        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});


// For scroll page
const headerScroll = document.querySelector('.header');
const menuLinks = document.querySelectorAll('a[href^="#"]');
const headerHeight = 70;

menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            let offsetPosition = targetPosition;

            if (window.innerWidth <= 640) {
                offsetPosition = targetPosition - headerHeight;
            }

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Accordion
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        var dropdownlink = this.el.find('.accordion__title');
        dropdownlink.on('click', {
                el: this.el,
                multiple: this.multiple
            },
            this.dropdown);
    };

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.accordion__info').not($next).slideUp().parent().removeClass('open');
        }
    }

    var accordion = new Accordion($('.accordion'), false);
})

// Tabs
$(function () {
    $("div.tabs__btns").on("click", "div.tabs__btn:not(.active)", function () {
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("div.tabs")
            .find("div.tabs__item")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
    });
});

// For active form
const inputs = document.querySelectorAll('.form__input');
const labels = document.querySelectorAll('.form__label');

if (inputs.length > 0 && labels.length > 0) {
    inputs.forEach((input, index) => {
        const label = labels[index];

        input.addEventListener('focus', function () {
            label.classList.add('active');
        });

        input.addEventListener('blur', function () {
            if (input.value === '') {
                label.classList.remove('active');
            }
        });
    });
}

// Mask for phones
$(function () {
    $("#phone").mask("+55 (999) 999-99-99");
});

// Pop up
// document.addEventListener('DOMContentLoaded', function () {
//     var openPopupButtons = document.querySelectorAll('.openPopup');
//     var popup = document.getElementById('popup');
//     var closePopupWrap = document.getElementsByClassName('popup__container')[0];
//     var closePopupButton = document.getElementsByClassName('popup__close')[0];

//     if (openPopupButtons.length > 0) {
//         openPopupButtons.forEach(function(button) {
//             button.onclick = function() {
//                 if (popup) {
//                     popup.style.visibility = 'visible';
//                     popup.style.opacity = '1';
//                     popup.style.zIndex = '999999';
//                     popup.style.top = '0';
//                     document.body.style.overflow = 'hidden';
//                 }
//             };
//         });
//     }

//     if (closePopupButton) {
//         closePopupButton.onclick = function() {
//             if (popup) {
//                 popup.style.visibility = 'hidden';
//                 popup.style.opacity = '0';
//                 popup.style.zIndex = '-999999';
//                 popup.style.top = '-1000%';
//                 document.body.style.overflow = 'auto';
//             }
//         };
//     }

//     if (closePopupWrap && popup) {
//         window.onclick = function(event) {
//             if (event.target === closePopupWrap) {
//                 popup.style.visibility = 'hidden';
//                 popup.style.opacity = '0';
//                 popup.style.zIndex = '-999999';
//                 popup.style.top = '-1000%';
//                 document.body.style.overflow = 'auto';
//             }
//         };
//     }
// });

// Btn for scroll up 
document.addEventListener('DOMContentLoaded', function () {
    const scrollUpButton = document.querySelector('.scroll-up');

    function toggleScrollUpButton() {
        if (window.scrollY > 100) {
            scrollUpButton.classList.add('show');
        } else {
            scrollUpButton.classList.remove('show');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    toggleScrollUpButton();

    window.addEventListener('scroll', toggleScrollUpButton);

    scrollUpButton.addEventListener('click', scrollToTop);
});

// For phones add/delete class active
document.addEventListener('DOMContentLoaded', function () {
    const phonesIcon = document.querySelector('.phones__icon');
    const phonesSocials = document.querySelector('.phones__socials');

    if (phonesIcon && phonesSocials) {
        function toggleActiveClass() {
            phonesSocials.classList.toggle('active');
        }

        function closeOnClickOutside(event) {
            if (!phonesIcon.contains(event.target) && 
                !phonesSocials.contains(event.target)) {
                phonesSocials.classList.remove('active');
            }
        }

        phonesIcon.addEventListener('click', toggleActiveClass);

        document.addEventListener('click', closeOnClickOutside);
    }
});

// Btn for scroll up 
document.addEventListener('DOMContentLoaded', function () {
    const scrollUpButton = document.querySelector('.scroll-up');

    if (scrollUpButton) {

        function toggleScrollUpButton() {
            if (window.scrollY > 100) {
                scrollUpButton.classList.add('show');
            } else {
                scrollUpButton.classList.remove('show');
            }
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        toggleScrollUpButton();

        window.addEventListener('scroll', toggleScrollUpButton);

        scrollUpButton.addEventListener('click', scrollToTop);
    }
});

// Redirect To ThankYouPage for test
function redirectToThankYouPage(event) {
    event.preventDefault();

    window.location.href = '/thank-you.html'; // onclick="redirectToThankYouPage(event)"
}
