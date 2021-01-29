function select() {
    const wrappers = document.querySelectorAll(".select__wrapper");
    const arrowElem = "<div class='select__arrow'>Arrow</div>";
    wrappers.forEach((wrapper, i) => {
        wrapper.addEventListener("click", (e) => {
            if (wrapper.classList.contains("active")) {
                wrapper.classList.remove("active");
                if (e.target.classList.contains("select__item")) {
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
                            showSelectedRowsByKda();
                            break;
                    }
                }
            } else {
                wrapper.classList.add("active");
            }
        });
    });

    function selectRows(rows, title) {
        rows.forEach(item => {
            const row = item.parentElement.parentElement;
            if (!title.includes(item.innerText) && !title.includes("All")) {
                row.style.display = "none";
            } else {
                row.style.display = "block";
            }
        });
    }

    function showSelectedRowsByMap() {
        const mapsOfRow = document.querySelectorAll(".stats__map");
        const mapTitle = document.querySelectorAll(".select__title")[0].innerText;

        selectRows(mapsOfRow, mapTitle);
    }

    function showSelectedRowsByRes() {
        const resultsOfRow = document.querySelectorAll(".stats__res");
        const resultTitle = document.querySelectorAll(".select__title")[1].innerText;
        
        selectRows(resultsOfRow, resultTitle);
    }

    function showSelectedRowsByKda() {
        const kdasOfRow = document.querySelectorAll(".stats__kda");
        const kdaTitle = document.querySelectorAll(".select__title")[2].innerText;
        kdasOfRow.forEach(kda => {
            const row = kda.parentElement.parentElement;
            const kdaText = kda.innerText.split("-");
            const kills = +kdaText[0];
            const deaths = +kdaText[2];
            const typeOfKda = kills / deaths;

            if (kdaTitle.includes("Positive")) {
                if (typeOfKda < 1 && !kdaTitle.includes("All")) {
                    row.style.display = "none";
                } else {
                    row.style.display = "block";
                } 
            } else {
                if (typeOfKda >= 1 && !kdaTitle.includes("All")) {
                    row.style.display = "none";
                } else {
                    row.style.display = "block";
                }
            }
            
        });
    }

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
    });
}

export default select;