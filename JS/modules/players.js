function players() {
    const players = ["ZywOo", "s1mple", "device", "NiKo", "ropz", "electronic", "syrsoN", "mantuu",
        "valde", "stavn", "dupreeh", "Magisk", "XANTARES", "Brollan", "huNter-"
    ];
    const teams = ["Vitality", "Natus Vincere", "Astralis", "FaZe", "Mousesports", "Natus Vincere", "BIG", "OG", "Heroic", "OG", "Astralis", "Astralis", "BIG", "Fnatic", "G2"];
    const nickInput = document.querySelectorAll(".search__input");
    const searchForm = document.querySelectorAll(".search");
    const playerError = document.querySelectorAll(".search__error");

    class PlayerCard {
        constructor(position, nick, team) {
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
        let count = 0;

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
                behavior: "smooth",
                block: "start"
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
            });

            players.forEach((nick, pos) => {
                nickInput.forEach(nickInput => {
                    if (nick.toLowerCase() === nickInput.value.toLowerCase()) {
                        renderCardByBtn(pos + 1, nick, event.target);

                        isFound = true;
                        event.target.reset();
                    }
                });
            });

            if (!isFound && event.target.classList.contains("search-stats")) {
                playerError[1].style.opacity = 1;
            } else if (!isFound) {
                playerError[0].style.opacity = 1;
            }
        });
    });


    // Button Stats

    const statsButtons = document.querySelectorAll(".players .player__stat");

    statsButtons.forEach(btn => {
        const pos = +btn.parentElement.innerText.substring(10, 12) - 1;
        btn.addEventListener("click", (event) => {
            players.forEach(nick => {
                if (event.target.parentElement.innerText.includes(nick)) {
                    renderCardByBtn(pos + 1, nick, event.target);
                }
            });
        });
    });
}

export default players;