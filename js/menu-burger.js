document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.querySelector(".main-nav");
    const header = document.querySelector("header");
    const menuLinks = document.querySelectorAll(".main-menu a");

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
        this.classList.toggle("open");
        header.classList.toggle("nav-open");
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener("click", function (event) {
        if (!nav.contains(event.target) && event.target !== menuToggle) {
            nav.classList.remove("active");
            menuToggle.classList.remove("open");
            header.classList.remove("nav-open");
        }
    });

    // Fermer le menu lors de la sélection d'un élément du menu
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            nav.classList.remove("active");
            menuToggle.classList.remove("open");
            header.classList.remove("nav-open");
        });
    });
});
