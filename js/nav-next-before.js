document.addEventListener("DOMContentLoaded", function () {
    const preview = document.createElement("div");
    preview.classList.add("nav-thumbnail-preview");
    document.body.appendChild(preview);

    let hoverTimeout;

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("mouseover", function () {
            clearTimeout(hoverTimeout);
            const thumbnailUrl = this.getAttribute("data-thumbnail");

            if (thumbnailUrl) {
                preview.innerHTML = `<img src="${thumbnailUrl}" alt="Preview" style="max-width: 100%; height: auto;">`;
                preview.style.visibility = "visible";
                preview.style.opacity = "1";

                // Définir une position fixe
                preview.style.right = "50px";
                preview.style.top = "925px";
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
