function header() {
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


    const showHeaderByScroll = function () {
        if (window.pageYOffset < scrollTop) {
            showHeader();
        } else {
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
                        behavior: "smooth",
                        block: "start"
                    });
                    hideHeader();
                    setTimeout(() => {
                        window.addEventListener("scroll", showHeaderByScroll);
                    }, 650);
                } else if (elem === navElements[2]) {
                    window.removeEventListener("scroll", showHeaderByScroll);
                    document.querySelector(".stats").scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                    hideHeader();
                    setTimeout(() => {
                        window.addEventListener("scroll", showHeaderByScroll);
                    }, 650);
                } else {
                    document.querySelector(".intro").scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        });
    }
    navScroll();
}

export default header;