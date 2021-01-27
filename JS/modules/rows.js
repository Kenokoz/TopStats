function rows() {
    class RowStats {
        constructor(date, result, score, map, kda) {
            this.date = date;
            this.result = result;
            this.score = score;
            this.map = map;
            this.kda = kda;
            this.checkRes = result === "Won" ? "won__span" : "lost__span";
        }

        render() {
            const row = document.createElement("div");
            row.classList.add("stats__row");
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
    };

    function renderAllRows() {
        const {
            date,
            results,
            scores,
            maps,
            kda
        } = statsDb;
        for (let i = 0; i < 10; i++) {
            const row = new RowStats(date, results[i], scores[i], maps[i], kda[i]).render();
            document.querySelector(".stats__table").append(row);
        }
    }
    renderAllRows();
}

export default rows;