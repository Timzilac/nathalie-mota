document.addEventListener('DOMContentLoaded', function () {
    const photo = document.querySelector('.a-propos .photo-description .my-photo');
    const description = document.querySelector('.a-propos .photo-description .description');
    let hasScrolled = false; // Pour éviter l'effet au chargement

    // Fonction pour vérifier si l'élément est visible dans le viewport
    function isElementVisible(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    // Fonction qui active l'animation uniquement lorsqu'on scroll vers la section
    function activateAnimations() {
        // On empêche l'animation au chargement de la page
        if (!hasScrolled) {
            if (window.scrollY > 50) {
                hasScrolled = true;
            } else {
                return;
            }
        }

        // Si la section est visible, on ajoute la classe
        if (isElementVisible(photo)) {
            photo.classList.add('visible');
            description.classList.add('visible');
        } else {
            // Si la section sort de l'écran, on retire la classe pour rejouer l'effet
            photo.classList.remove('visible');
            description.classList.remove('visible');
        }
    }

    // Écouteur d'événements sur le scroll
    window.addEventListener('scroll', activateAnimations);
});
