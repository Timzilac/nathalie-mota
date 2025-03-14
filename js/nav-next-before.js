document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".right-contact");
    const preview = document.createElement("div");
    preview.classList.add("nav-thumbnail-preview");
    container.appendChild(preview);

    let hoverTimeout;

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("mouseover", function () {
            clearTimeout(hoverTimeout);
            const thumbnailUrl = this.getAttribute("data-thumbnail");

            if (thumbnailUrl) {
                preview.innerHTML = `<img src="${thumbnailUrl}" alt="Preview">`;
                preview.style.visibility = "visible";
                preview.style.opacity = "1";

                // Définir une position fixe
                preview.style.right = "0";
                preview.style.top = "10px";
            }   
        });

        link.addEventListener("mouseout", function () {
            hoverTimeout = setTimeout(() => {
                preview.style.opacity = "0";
                setTimeout(() => {
                    preview.style.visibility = "hidden";
                }, 200);
            }, 100);
        });
    });
});
