document.addEventListener("DOMContentLoaded", function () {
    // Création de la lightbox avec les boutons et les infos de la photo
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `
        <button class="lightbox-prev" style="display: none;" aria-label="Image précédente"><span>&larr;</span> Précédente</button>
        <div class="lightbox-content">
            <img src="" alt="" class="lightbox-img">
            <div class="category-reference">
                <span class="photo-reference"></span>
                <span class="photo-category"></span>
            </div>
        </div>
        <button class="lightbox-next" style="display: none;" aria-label="Image suivante">Suivante <span>&rarr;</span></button>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");
    const lightboxReference = lightbox.querySelector(".photo-reference");
    const lightboxCategory = lightbox.querySelector(".photo-category");

    // Récupération de tous les éléments de la galerie
    const galleryItems = Array.from(document.querySelectorAll(".photo-item"));
    let currentIndex = -1; // Index de l'image actuellement affichée

    // Met à jour l'affichage des flèches selon la position actuelle
    function updateArrowsVisibility() {
        prevButton.style.display = currentIndex > 0 ? "flex" : "none";
        nextButton.style.display = currentIndex < galleryItems.length - 1 ? "flex" : "none";
    }

    // Ouvre la lightbox et affiche l'image et les infos de la photo
    function openLightbox(index) {
        if (index < 0 || index >= galleryItems.length) return;
        currentIndex = index;
        const photoItem = galleryItems[currentIndex];

        const img = photoItem.querySelector("img");
        const reference = photoItem.getAttribute("data-reference") || "";
        const category = photoItem.getAttribute("data-category") || "";

        if (img) {
            lightboxImg.src = img.src;
            lightboxReference.textContent = reference;
            lightboxCategory.textContent = category;
            lightbox.classList.add("active");
            updateArrowsVisibility();
        }
    }

    // Ajout de l'événement "click" sur chaque overlay pour ouvrir la lightbox
    document.querySelectorAll(".photo-overlay").forEach((overlay) => {
        overlay.addEventListener("click", function (e) {
            e.stopPropagation();
            // Trouve l'élément .photo-item parent
            const photoItem = overlay.closest(".photo-item");
            // Recherche l'index de cet élément dans le tableau
            currentIndex = galleryItems.indexOf(photoItem);
            openLightbox(currentIndex);
        });
    });

    // Gestion du bouton "précédent"
    prevButton.addEventListener("click", function (e) {
        e.stopPropagation();
        if (currentIndex > 0) {
            openLightbox(currentIndex - 1);
        }
    });

    // Gestion du bouton "suivant"
    nextButton.addEventListener("click", function (e) {
        e.stopPropagation();
        if (currentIndex < galleryItems.length - 1) {
            openLightbox(currentIndex + 1);
        }
    });

    // Ferme la lightbox lorsque l'on clique en dehors de l'image et des boutons
    lightbox.addEventListener("click", function (e) {
        if (e.target !== lightboxImg && e.target !== prevButton && e.target !== nextButton) {
            lightbox.classList.remove("active");
        }
    });
});
