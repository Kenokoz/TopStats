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
        console.log(navElements);
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
});