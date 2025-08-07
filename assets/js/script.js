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
window.addEventListener('load', function () {
    document.body.classList.remove('hidden');
});

// LazyLoad
window.addEventListener('DOMContentLoaded', function () {
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazyload"
    });
});

// Download scripts after load page
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
}

// Add script file for Fancybox
document.addEventListener('click', function (e) {
    const fancyTrigger = e.target.closest('[data-fancybox]');
    if (fancyTrigger) {
        if (!window.FancyboxInitialized) {
            window.FancyboxInitialized = true;

            loadScript('assets/js/plugins/fancybox.min.js', function () {
                $('[data-fancybox]').fancybox({
                    buttons: ["zoom", "slideShow", "fullScreen", "thumbs", "close"],
                    loop: true,
                    protect: true
                });

                $('.popup__close').on('click', function () {
                    $.fancybox.close();
                });
                fancyTrigger.click();
            });
        }
    }
});

// Add script file for mask for phones
document.addEventListener('DOMContentLoaded', function () {
    const phoneInputs = document.querySelectorAll('.phone');
    if (phoneInputs.length === 0) return;

    let maskLoaded = false;

    function initPhoneMask() {
        if (!maskLoaded) {
            maskLoaded = true;

            loadScript('assets/js/plugins/phones-mask.js', function () {
                phoneInputs.forEach(input => {
                    $(input).mask("+55 (999) 999-99-99");
                });
            });
        }
        phoneInputs.forEach(input => input.removeEventListener('mouseenter', initPhoneMask));
    }

    phoneInputs.forEach(input => {
        input.addEventListener('mouseenter', initPhoneMask);
    });
});

// Add script file for google map
window.addEventListener('load', () => {
  setTimeout(() => {
    const script = document.createElement('script');
    script.src = 'assets/js/plugins/map.js';
    script.defer = true;
    document.body.appendChild(script);
  }, 1000); // задержка 3 секунды
});


// Parallax/jarallax effect
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
}

function initJarallax() {
    if (window.JarallaxInitialized) return;
    if (window.innerWidth <= 1024) return;

    window.JarallaxInitialized = true;
    loadScript('assets/js/plugins/jarallax.min.js', () => {
        requestAnimationFrame(() => {
            const jarallaxElements = document.querySelectorAll('.jarallax');
            jarallax(jarallaxElements, {
                speed: 0.5,
                imgSize: 'cover',
                imgPosition: 'center',
            });
        });
    });
}

const userEvents = ['scroll', 'click', 'touchstart', 'mousemove'];

userEvents.forEach(eventName => {
    window.addEventListener(eventName, initJarallax, {
        passive: true,
        once: true
    });
});


// Home slider
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
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
        const targetId = this.getAttribute('href');

        if (!targetId || targetId.length < 2 || targetId === '#!' || targetId === '#') {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();

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

// Tabs
// $(function () {
//     $("div.tabs__btns").on("click", "div.tabs__btn:not(.active)", function () {
//         $(this)
//             .addClass("active")
//             .siblings()
//             .removeClass("active")
//             .closest("div.tabs")
//             .find("div.tabs__item")
//             .removeClass("active")
//             .eq($(this).index())
//             .addClass("active");
//     });
// });

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

// Load projects
document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.projects__container .projects__box');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let visibleCount = 6;
    const increment = 3;

    cells.forEach((cell, index) => {
        if (index < visibleCount) {
            cell.style.display = 'block';
        } else {
            cell.style.display = 'none';
        }
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function (e) {
            e.preventDefault();
            let hiddenCount = 0;

            for (let i = visibleCount; i < visibleCount + increment && i < cells.length; i++) {
                cells[i].style.display = 'block';
                hiddenCount++;
            }

            visibleCount += hiddenCount;

            if (visibleCount >= cells.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
});

// <!---------- jQuery ----------!>
if (typeof jQuery !== 'undefined') {
    $(document).ready(function () {

        // Accordion 
        var Accordion = function (el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;

            var dropdownlink = this.el.find('.accordion__title');
            dropdownlink.on('click', {
                el: this.el,
                multiple: this.multiple
            }, this.dropdown);
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
        };

        var accordion = new Accordion($('.accordion'), false);
    });
}
