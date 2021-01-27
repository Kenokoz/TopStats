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
                    }
                }
            } else {
                wrapper.classList.add("active");
            }
        });
    });

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