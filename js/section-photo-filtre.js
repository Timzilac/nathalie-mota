document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les éléments du DOM
    const sortByButton = document.getElementById('sort-by-button');
    const sortByOptions = document.getElementById('sort-by-options');
    const filterCategoryButton = document.getElementById('filter-category-button');
    const filterCategoryOptions = document.getElementById('filter-category-options');
    const filterFormatButton = document.getElementById('filter-format-button');
    const filterFormatOptions = document.getElementById('filter-format-options');
    const galleryContent = document.querySelector('.gallery-content');
    const photoItems = Array.from(galleryContent.querySelectorAll('.photo-item'));

    // Stocker l'ordre initial des photos pour pouvoir le restaurer
    const initialOrder = photoItems.map(item => item);

    // Masquer les options par défaut au chargement de la page
    hideDefaultOptions();

    // Récupérer les URLs des images de flèche depuis les attributs data-*
    const sortByArrowImageUrl = sortByButton.getAttribute('data-arrow-image');
    const filterCategoryArrowImageUrl = filterCategoryButton.getAttribute('data-arrow-image');
    const filterFormatArrowImageUrl = filterFormatButton.getAttribute('data-arrow-image');

    // Fonction pour créer une image de flèche
    function createArrowImage(url) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'arrow';
        img.height = 7;
        img.width = 12;
        return img;
    }

    // Fonction pour masquer les options par défaut
    function hideDefaultOptions() {
        const defaultSortLabel = sortByOptions.querySelector('label input[value="default"]').parentElement;
        const defaultCategoryLabel = filterCategoryOptions.querySelector('label input[value=""]').parentElement;
        const defaultFormatLabel = filterFormatOptions.querySelector('label input[value=""]').parentElement;
        defaultSortLabel.style.display = 'none';
        defaultCategoryLabel.style.display = 'none';
        defaultFormatLabel.style.display = 'none';
    }

    // Fonction pour ouvrir/fermer les menus déroulants et gérer le style du bouton
    function toggleDropdown(button, options, otherOptions1, otherOptions2) {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // Empêcher la propagation de l'événement
            const isOpen = options.style.display === 'block';
            options.style.display = isOpen ? 'none' : 'block';

            // Ajouter ou supprimer la classe CSS pour le border-radius
            button.classList.toggle('dropdown-open', !isOpen);

            // Fermer les autres menus déroulants
            if (otherOptions1) {
                otherOptions1.style.display = 'none';
                otherOptions1.previousElementSibling.classList.remove('dropdown-open');
            }
            if (otherOptions2) {
                otherOptions2.style.display = 'none';
                otherOptions2.previousElementSibling.classList.remove('dropdown-open');
            }
        });
    }

    // Appliquer la fonction toggleDropdown à chaque bouton
    toggleDropdown(sortByButton, sortByOptions, filterCategoryOptions, filterFormatOptions);
    toggleDropdown(filterCategoryButton, filterCategoryOptions, sortByOptions, filterFormatOptions);
    toggleDropdown(filterFormatButton, filterFormatOptions, sortByOptions, filterCategoryOptions);

    // Fermer les menus déroulants si on clique en dehors
    document.addEventListener('click', function () {
        sortByOptions.style.display = 'none';
        filterCategoryOptions.style.display = 'none';
        filterFormatOptions.style.display = 'none';

        // Supprimer la classe CSS pour le border-radius
        sortByButton.classList.remove('dropdown-open');
        filterCategoryButton.classList.remove('dropdown-open');
        filterFormatButton.classList.remove('dropdown-open');
    });

    // Fonction pour trier les photos
    function sortPhotos(sortBy) {
        switch (sortBy) {
            case 'recent-to-old':
                photoItems.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
                break;
            case 'old-to-recent':
                photoItems.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
                break;
            case 'default':
            default:
                // Restaurer l'ordre initial
                photoItems.sort((a, b) => initialOrder.indexOf(a) - initialOrder.indexOf(b));
                break;
        }

        // Vider la galerie et réinsérer les éléments triés
        galleryContent.innerHTML = '';
        photoItems.forEach(item => galleryContent.appendChild(item));
    }

    // Fonction pour filtrer les photos
    function filterPhotos() {
        const selectedCategory = document.querySelector('input[name="filter-category"]:checked').value;
        const selectedFormat = document.querySelector('input[name="filter-format"]:checked').value;

        photoItems.forEach(item => {
            const categoryMatch = selectedCategory === '' || item.dataset.category.includes(selectedCategory);
            const formatMatch = selectedFormat === '' || item.dataset.format.includes(selectedFormat);

            if (categoryMatch && formatMatch) {
                item.style.display = 'block'; // Afficher l'élément
            } else {
                item.style.display = 'none'; // Masquer l'élément
            }
        });
    }

    // Appliquer le tri lorsque l'utilisateur sélectionne une option
    setupRadioButtons('input[name="sort-by"]', sortByButton, sortByArrowImageUrl, sortPhotos);

    // Appliquer le filtre par catégorie
    setupRadioButtons('input[name="filter-category"]', filterCategoryButton, filterCategoryArrowImageUrl, filterPhotos);

    // Appliquer le filtre par format
    setupRadioButtons('input[name="filter-format"]', filterFormatButton, filterFormatArrowImageUrl, filterPhotos);

    // Fonction générique pour configurer les boutons radio
    function setupRadioButtons(selector, button, arrowImageUrl, callback) {
        document.querySelectorAll(selector).forEach(radio => {
            radio.addEventListener('change', function () {
                // Mettre à jour le texte du bouton avec l'image
                updateButtonText(button, this.value, this.nextSibling.textContent.trim());

                // Ajouter l'image de la flèche
                button.appendChild(createArrowImage(arrowImageUrl));

                // Masquer l'option sélectionnée dans le menu déroulant
                hideSelectedOption(this);

                // Exécuter la fonction de rappel (tri ou filtre)
                callback(this.value);

                // Fermer le menu déroulant après sélection
                button.nextElementSibling.style.display = 'none';
                button.classList.remove('dropdown-open');
            });
        });
    }

    // Fonction pour mettre à jour le texte du bouton
    function updateButtonText(button, value, text) {
        if (value === '') {
            button.innerHTML = `${button.id === 'sort-by-button' ? 'Trier par' : button.textContent.split(' ')[0]} `;
        } else {
            button.innerHTML = `${text} `;
        }
    }

    // Fonction pour masquer l'option sélectionnée dans le menu déroulant
    function hideSelectedOption(selectedRadio) {
        const labels = selectedRadio.closest('div').querySelectorAll('label');
        labels.forEach(label => {
            const input = label.querySelector('input');
            label.style.display = input.value === selectedRadio.value ? 'none' : 'block';
        });
    }
});