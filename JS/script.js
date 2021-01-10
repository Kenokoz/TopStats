window.addEventListener("DOMContentLoaded", () => {

    // Header

    const headerLink = document.querySelector(".header__link");
    headerLink.addEventListener("click", event => {
        event.preventDefault();
        location.reload();
        window.scrollTo(0, 0);
    });

    const header = document.querySelector(".header");
    let scrollTop = window.pageYOffset;

    const showHeader = () => {
        header.classList.remove("header__hide");
        header.classList.add("header__show");
    };

    const hideHeader = () => {
        header.classList.remove("header__show");
        header.classList.add("header__hide");
    };

    const showHeaderByScroll = function() { 
        if (window.pageYOffset < scrollTop) {
            showHeader();
        }else {
            hideHeader();
        }
        if (window.pageYOffset === 0) {
            header.classList.remove("header__show");
        }
        scrollTop = window.pageYOffset;
    };
    window.addEventListener("scroll", showHeaderByScroll);


    function navScroll() {
        const navElements = document.querySelectorAll(".nav__link", ".header__link");
        const position = [0, 970, 1939];

        navElements.forEach((elem, i) => {
            elem.addEventListener("click", () => {
                if (elem === navElements[0] || elem === navElements[3]) {
                    window.scrollTo({
                        top: position[i],
                        behavior: "smooth"
                    });  
                }else {
                    window.removeEventListener("scroll", showHeaderByScroll);
                    window.scrollTo({
                        top: position[i],
                        behavior: "smooth"
                    });   
                    hideHeader();
                    setTimeout(() => {
                        window.addEventListener("scroll", showHeaderByScroll);
                    }, 550);
                }
            });
        });
    }
    navScroll();

    // Get stats
    const players = ["ZywOo", "s1mlpe", "device", "NiKo", "ropz", "electronic", "syrsoN", "mantuu",
     "valde", "stavn", "dupreeh", "Magisk", "XANTARES", "Brollan", "huNter-"];
    const search = document.querySelector(".search__btn");
    const nickInput = document.querySelector(".search__input");
    const searchForm = document.querySelector(".search");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 1939,
            behavior: "smooth"
        }); 
        event.target.reset();

        players.forEach((player, i) => {
            // if (player.includes(nickInput.value)) {
            //     document.querySelector(".player__card").remove();
            //     const newPlayerCard = document.createElement("div");
            //     newPlayerCard.classList.add("player__card");
            //     newPlayerCard.innerHTML = `
            //         <div class="player__img">
            //             <img src="Images/players/${i + 1}.png" class="player__photo">
            //         </div>
            //         <div class="player__descr">
            //             <div><b>Nickname: </b>${player}</div>
            //             <div><b>Team: </b>Vitality</div>
            //             <div><b>Avg K/D: </b>1.28</div>
            //             <div class="player__about">
            //             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloribus cupiditate enim minus quo.
            //         </div>
            //     `;
            //     document.querySelector(".stats__items").append(newPlayerCard);
            // }
        });
        console.log(players[0]);
        console.log(nickInput.value);
    });
    
    

    //Slider
    const slides = document.querySelectorAll(".players__slide");
    const next = document.querySelector(".players__btn-next");
    const prev = document.querySelector(".players__btn-prev");
    const slidesWrapper = document.querySelector(".players__wrapper");
    const slidesField = document.querySelector(".players__inner");
    const width = "1200px";
    const dots = document.querySelectorAll(".slider__dot");
    const teamsSlidesField = document.querySelector(".teams__inner");
    let slideIndex = 0;
    let offset = 0;

    function addActiveToSlide() {
        dots.forEach(dot => {
            dot.classList.remove("slider__dot-active");
        });
        dots[slideIndex].classList.add("slider__dot-active");
    }

    function moveSlide() {
        slidesField.style.transform = `translateX(-${offset}px)`;
        teamsSlidesField.style.transform = `translateX(-${offset}px)`;
    }

    next.addEventListener("click", () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        moveSlide();

        if (slideIndex == slides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }

        addActiveToSlide();
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        moveSlide();

        if (slideIndex == 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex--;
        }

        addActiveToSlide();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", (e) => {
            dot.setAttribute("slide-to", i);
            slideIndex = e.target.getAttribute("slide-to");

            offset = +width.slice(0, width.length - 2) * (slideIndex);
            moveSlide();
            addActiveToSlide();
        });
    });
});