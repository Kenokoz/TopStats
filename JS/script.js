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
    const nickInput = document.querySelectorAll(".search__input");
    const searchForm = document.querySelectorAll(".search");
    const playerError = document.querySelectorAll(".search__error");
    
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
                    <p class="player__about">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi doloribus cupiditate.
                    </p>
                    <div class="player__stat">Stats</div>
                </div>
            `;
            return newPlayerCard;
        }
    }

    function renderAllPlayers() {
        let numOfSlide = 0;
        let count = 0    

        players.forEach((nick, position) => {
            count++;
            const card = new PlayerCard(position + 1, nick, teams[position]).render();
            document.querySelectorAll(".players__slide")[numOfSlide].append(card);

            if (count == 5) {
                numOfSlide++;
                count = 0;
            }
        });
    }

    renderAllPlayers();
    
    // Button Get Stats

    function renderCardByBtn(pos, nick, targetBtn) {
        document.querySelector(".stats .player__card").remove();

        document.querySelector(".stats .stats__suptitle").innerHTML = 
            `<span class="stats__span">Stats</span> of ${nick}`;

        const card = new PlayerCard(pos, nick, teams[pos - 1]).render();
        document.querySelector(".stats__items").insertAdjacentElement("afterbegin", card);
        document.querySelector(".stats .player__stat").remove();
        
        if (!targetBtn.classList.contains("search-stats")) {
            document.querySelector(".stats").scrollIntoView({
                behavior:"smooth",
                block:"start"
            });
        }
    }

    searchForm.forEach(form => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let isFound = false;
    
            playerError.forEach(er => {
                if (er.style.opacity == 1) {
                    er.style.opacity = 0;
                }
            })
            
            players.forEach((nick, pos) => {
                nickInput.forEach(nickInput => {
                    if (nick.toLowerCase() === nickInput.value.toLowerCase()) {
                        renderCardByBtn(pos + 1, nick, event.target);

                        isFound = true;
                        event.target.reset();
                    }
                })
            });
    
            if (!isFound && event.target.classList.contains("search-stats")) {
                playerError[1].style.opacity = 1;    
            } else if (!isFound) {
                playerError[0].style.opacity = 1;
            }
        });
    })
    

    // Button Stats

    const statsButtons = document.querySelectorAll(".players .player__stat");

    statsButtons.forEach(btn => {
        const pos = +btn.parentElement.innerText.substring(10, 12) - 1;
        btn.addEventListener("click", (event) => {
            players.forEach(nick => {
                if (event.target.parentElement.innerText.includes(nick)){
                    renderCardByBtn(pos + 1, nick, event.target);
                }
            });
        });
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

    //Select

    const wrappers = document.querySelectorAll(".select__wrapper");
    const arrowElem = "<div class='select__arrow'>Arrow</div>";
    wrappers.forEach((wrapper, i) => {
        wrapper.addEventListener("click", (e) => {
            if (wrapper.classList.contains("active")) {
                wrapper.classList.remove("active");
                if (e.target.classList.contains("select__item")){
                    wrapper.querySelector(".select__title").innerHTML = 
                        e.target.innerText + arrowElem;

                    switch (i) {
                        case 0:
                            showSelectedRowsByMap();
                            break;
                    
                        case 1:
                            showSelectedRowsByRes();
                            break;
                        default:
                            showSelectedRowsByKda()
                            break;
                    }
                }
            } else {
                wrapper.classList.add("active");
            }
        });
    });

    // Reset

    const reset = document.querySelector(".select__reset");
    const selectTitles = document.querySelectorAll(".select__title");
    reset.addEventListener("click", () => {
        const namesOfTitle = ["Map", "Result", "K/A/D"];
        const rows = document.querySelectorAll(".stats__row");

        selectTitles.forEach((title, i) => {
            title.innerHTML = namesOfTitle[i] + arrowElem;
        });
        wrappers.forEach(wrapper => {
            wrapper.classList.remove("active");
        });

        rows.forEach(row => {
            row.style.display = "block";
        });
    })


    // Row factory

    class RowStats {
        constructor (date, result, score, map, kda) {
            this.date = date;
            this.result = result;
            this.score = score;
            this.map = map;
            this.kda = kda;
            this.checkRes = result === "Won"? "won__span" : "lost__span";
        }

        render() {
            const row = document.createElement("div");
            row.classList.add("stats__row")
            if (this.result === "Lost") {
                row.classList.add("stats__row-lost");
            } else {
                row.classList.add("stats__row-won");
            }
            row.innerHTML = `
                <div class="stats__inner">
                    <div class="stats__date">${this.date}</div>
                    <div class="stats__res"><span class="${this.checkRes}">${this.result}</span></div>
                    <div class="stats__score">${this.score}</div>
                    <div class="stats__map">${this.map}</div>
                    <div class="stats__kda">${this.kda}</div>
                </div>
            `;
            return row;
        }
    }

    const statsDb = {
        date: "Dec 2 2020",
        results: ["Lost", "Won", "Won", "Won", "Lost", "Won", "Lost", "Lost", "Won", "Won"],
        scores: ["10/16", "16/14", "16/11", "16/7", "9/16", "16/13", "14/16", "14/16", "16/4", "16/12"],
        maps: ["Dust 2", "Mirage", "Dust 2", "Mirage", "Train", "Dust 2", "Inferno", "Inferno", "Dust 2", "Dust 2"],
        kda: ["21-11-20", "16-4-25", "10-3-19", "18-4-11", "20-6-23", "24-2-7", "20-6-19", "23-8-22", "23-2-22", "29-6-24"]
    }

    function renderAllRows() {
        const {date, results, scores, maps, kda} = statsDb;
        for (let i = 0; i < 10; i++) {
            const row = new RowStats(date, results[i], scores[i], maps[i], kda[i]).render();
            document.querySelector(".stats__table").append(row);
        }
    }
    renderAllRows();
    


    function showSelectedRowsByMap() {
        const mapsOfRow = document.querySelectorAll(".stats__map");
        const mapTitle = document.querySelectorAll(".select__title")[0].innerText;
        mapsOfRow.forEach(map => {
            const row = map.parentElement.parentElement;
            if (!mapTitle.includes(map.innerText) && !mapTitle.includes("All")) {
                row.style.display = "none";
            } else {
                row.style.display = "block";
            }
        });
    }

    function showSelectedRowsByRes() {
        const resultsOfRow = document.querySelectorAll(".stats__res");
        const resultTitle = document.querySelectorAll(".select__title")[1].innerText;
        resultsOfRow.forEach(res => {
            const row = res.parentElement.parentElement;

            if (!resultTitle.includes(res.innerText) && !resultTitle.includes("All")) {
                row.style.display = "none";
            } else {
                row.style.display = "block";
            }
        });
    }

    function showSelectedRowsByKda() {
        const kdasOfRow = document.querySelectorAll(".stats__kda");
        const kdaTitle = document.querySelectorAll(".select__title")[2].innerText;
        kdasOfRow.forEach(kda => {
            const row = kda.parentElement.parentElement;
            
            if (!kdaTitle.includes(kda.innerText) && !kdaTitle.includes("All")) {
                row.style.display = "none";
            } else {
                row.style.display = "block";
            }
        });
    }
});