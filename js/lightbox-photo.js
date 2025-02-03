document.addEventListener("DOMContentLoaded", function () {
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
lightbox.innerHTML = '<img src="" alt="" class="lightbox-img">';
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector(".lightbox-img");

function attachLightboxEvents() {
    document.querySelectorAll(".photo-overlay").forEach(overlay => {
        overlay.addEventListener("click", function () {
            const img = overlay.closest(".photo-thumbnail").querySelector("img");
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add("active");
            }
        });
    });
}

attachLightboxEvents();

// Fermer l'image en plein écran
lightbox.addEventListener("click", function (e) {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove("active");
    }
});
});