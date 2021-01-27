import header from "./modules/header";
import players from "./modules/players";
import slider from "./modules/slider";
import rows from "./modules/rows";
import select from "./modules/select";


window.addEventListener("DOMContentLoaded", () => {
    header();
    players();
    slider();
    rows();
    select();
});