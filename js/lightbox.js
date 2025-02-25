document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxReference = document.getElementById("lightbox-reference");
    const lightboxCategory = document.getElementById("lightbox-category");
    const prevBtn = document.getElementById("prev-photo");
    const nextBtn = document.getElementById("next-photo");
  
    let photos = [];
    let currentIndex = 0;
  
    // Ouvrir la lightbox au clic sur l'icône fullscreen (assurez-vous que l'élément cliqué existe)
    document.addEventListener("click", function (event) {
      const fullscreenIcon = event.target.closest(".fullscreen-icon");
      if (fullscreenIcon) {
        const photoItem = event.target.closest(".photo-item");
        if (!photoItem) return;
  
        photos = Array.from(document.querySelectorAll(".photo-item"));
        currentIndex = photos.indexOf(photoItem);
  
        showPhoto(currentIndex);
        lightbox.style.display = "flex";
      }
    });
  
    // Fonction pour afficher la photo dans la lightbox
    function showPhoto(index) {
      if (index >= 0 && index < photos.length) {
        const photoItem = photos[index];
        lightboxImg.src = photoItem.dataset.fullscreen;
        lightboxReference.textContent = photoItem.dataset.reference;
        lightboxCategory.textContent = photoItem.dataset.category;
    
        currentIndex = index;
    
        // Affiche ou masque les boutons en fonction de la position
        prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
        nextBtn.style.display = currentIndex === photos.length - 1 ? "none" : "flex";
      }
    }
    
    // Navigation dans la lightbox
    prevBtn.addEventListener("click", function (event) {
      // Empêche la propagation pour éviter de fermer la lightbox en cliquant sur le bouton
      event.stopPropagation();
      if (currentIndex > 0) {
        showPhoto(currentIndex - 1);
      }
    });
  
    nextBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      if (currentIndex < photos.length - 1) {
        showPhoto(currentIndex + 1);
      }
    });
  
    // Fermer la lightbox en cliquant sur la zone grise
    lightbox.addEventListener("click", function (event) {
      // Vérifie que le clic ne s'est pas produit à l'intérieur de .lightbox-content
      if (!event.target.closest('.lightbox-content')) {
        lightbox.style.display = "none";
      }
    });
  });
  