function slider() {
    const slides = document.querySelectorAll(".players__slide");
    const next = document.querySelector(".players__btn-next");
    const prev = document.querySelector(".players__btn-prev");
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
}

export default slider;