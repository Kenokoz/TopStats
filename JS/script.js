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

        navElements.forEach((elem, i) => {
            elem.addEventListener("click", () => {
                if (elem === navElements[1]) {
                    window.removeEventListener("scroll", showHeaderByScroll);
                    document.querySelector(".players").scrollIntoView({
                        behavior:"smooth",
                        block:"start"
                    });
                    hideHeader();
                    setTimeout(() => {
                        window.addEventListener("scroll", showHeaderByScroll);
                    }, 650);
                }else if (elem === navElements[2]){
                    window.removeEventListener("scroll", showHeaderByScroll);
                    document.querySelector(".stats").scrollIntoView({
                        behavior:"smooth",
                        block:"start"
                    });
                    hideHeader();
                    setTimeout(() => {
                        window.addEventListener("scroll", showHeaderByScroll);
                    }, 650);
                }else {
                    document.querySelector(".intro").scrollIntoView({
                        behavior:"smooth",
                        block:"start"
                    });
                }
            });
        });
    }
    navScroll();

    // Render cards
    
    const players = ["ZywOo", "s1mple", "device", "NiKo", "ropz", "electronic", "syrsoN", "mantuu",
     "valde", "stavn", "dupreeh", "Magisk", "XANTARES", "Brollan", "huNter-"];
    const teams = ["Vitality", "Natus Vincere", "Astralis", "FaZe", "Mousesports", "Natus Vincere", "BIG", "OG", "Heroic", "OG", "Astralis", "Astralis", "BIG", "Fnatic", "G2"];
    const nickInput = document.querySelector(".search__input");
    const searchForm = document.querySelector(".search");
    const playerError = document.querySelector(".search__error");
    
    class PlayerCard {
        constructor (position, nick, team) {
            this.position = position;
            this.nick = nick;
            this.team = team;
        }

        render() {
            const newPlayerCard = document.createElement("div");
            newPlayerCard.classList.add("player__card");
            newPlayerCard.innerHTML = `
                <div class="player__img">
                    <img src="Images/players/${this.position}.png" class="player__photo">
                </div>
                <div class="player__descr">
                    <div><b>Position: </b>${this.position}</div>
                    <div><b>Nickname: </b>${this.nick}</div>
                    <div><b>Team: </b>${this.team}</div>
                    <div><b>Avg K/D: </b>1.28</div>
                    <div class="player__about">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloribus cupiditate enim minus quo.
                </div>
            `;
            return newPlayerCard;
        }
    }

    function renderAllPlayers() {
        let numOfSlide = 0;
        let count = 0    

        players.forEach((player, position) => {
            count++;
            const card = new PlayerCard(position + 1, player, teams[position]).render();
            document.querySelectorAll(".players__slide")[numOfSlide].append(card);

            if (count == 5) {
                numOfSlide++;
                count = 0;
            }
        });
    }

    renderAllPlayers();
    
    // Button Get Stats

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let isFound = false;

        if (playerError.style.opacity == 1) {
            playerError.style.opacity = 0;
        }
        players.forEach((player, i) => {
            if (player.toLowerCase() === nickInput.value.toLowerCase()) {
                
                document.querySelector(".stats .player__card").remove();

                document.querySelector(".stats .stats__suptitle").innerHTML = 
                    `<span class="stats__span">Stats</span> of ${player}`;

                const card = new PlayerCard(i + 1, player, teams[i]).render();
                document.querySelector(".stats__items").insertAdjacentElement("afterbegin", card);
                
                document.querySelector(".stats").scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });
                
                isFound = true;
                event.target.reset();
            }
        });

        if (!isFound) {
            playerError.style.opacity = 1;    
        }
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