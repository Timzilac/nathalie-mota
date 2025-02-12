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

    // Stocker l'ordre initial des photos
    const initialOrder = photoItems.map(item => item);

    // Masquer les options par défaut au chargement de la page
    const defaultSortLabel = sortByOptions.querySelector('label input[value="default"]').parentElement;
    const defaultCategoryLabel = filterCategoryOptions.querySelector('label input[value=""]').parentElement;
    const defaultFormatLabel = filterFormatOptions.querySelector('label input[value=""]').parentElement;
    defaultSortLabel.style.display = 'none';
    defaultCategoryLabel.style.display = 'none';
    defaultFormatLabel.style.display = 'none';

    // Ouvrir/fermer les menus déroulants
    function toggleDropdown(button, options, otherOptions1, otherOptions2) {
        button.addEventListener('click', function () {
            // Afficher ou cacher l'option sélectionnée
            options.style.display = (options.style.display === 'block' ? 'none' : 'block');
            
            // Fermer les autres menus déroulants
            if (otherOptions1) otherOptions1.style.display = 'none';
            if (otherOptions2) otherOptions2.style.display = 'none';
        });
    }

    toggleDropdown(sortByButton, sortByOptions, filterCategoryOptions, filterFormatOptions);
    toggleDropdown(filterCategoryButton, filterCategoryOptions, sortByOptions, filterFormatOptions);
    toggleDropdown(filterFormatButton, filterFormatOptions, sortByOptions, filterCategoryOptions);

    // Fermer les menus déroulants si on clique en dehors
    document.addEventListener('click', function (event) {
        if (!sortByButton.contains(event.target) && !sortByOptions.contains(event.target)) {
            sortByOptions.style.display = 'none';
        }
        if (!filterCategoryButton.contains(event.target) && !filterCategoryOptions.contains(event.target)) {
            filterCategoryOptions.style.display = 'none';
        }
        if (!filterFormatButton.contains(event.target) && !filterFormatOptions.contains(event.target)) {
            filterFormatOptions.style.display = 'none';
        }
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
// Fonction pour mettre la première lettre en majuscule
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function filterPhotos() {
    const selectedCategory = document.querySelector('input[name="filter-category"]:checked') ? capitalizeFirstLetter(document.querySelector('input[name="filter-category"]:checked').value) : '';
    const selectedFormat = document.querySelector('input[name="filter-format"]:checked') ? capitalizeFirstLetter(document.querySelector('input[name="filter-format"]:checked').value) : '';
    
    // Debugging
    console.log('Selected Category:', selectedCategory);
    console.log('Selected Format:', selectedFormat);
    
    photoItems.forEach(item => {
        // Comparer en utilisant capitalizeFirstLetter pour uniformiser la casse
        const categoryMatch = selectedCategory === '' || item.dataset.category === selectedCategory;
        const formatMatch = selectedFormat === '' || item.dataset.format === selectedFormat;
    
        // Affichage ou masquage des éléments en fonction du match
        if (categoryMatch && formatMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

    document.querySelectorAll('input[name="sort-by"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const arrowImage = '<img src="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png" alt="arrow" height="7" width="12">';
            if (this.value === 'default') {
                sortByButton.innerHTML = 'Trier par ' + arrowImage;
            } else if (this.value === 'recent-to-old') {
                sortByButton.innerHTML = 'Date récente - ancienne ' + arrowImage;
            } else if (this.value === 'old-to-recent') {
                sortByButton.innerHTML = 'Date ancienne - récente ' + arrowImage;
            }
    
            // Masquer l'option sélectionnée dans le menu déroulant
            const labels = sortByOptions.querySelectorAll('label');
            labels.forEach(label => {
                const input = label.querySelector('input');
                if (input.value === this.value) {
                    label.style.display = 'none';
                } else {
                    label.style.display = 'block';
                }
            });
    
            // Trier les photos
            sortPhotos(this.value);
    
            // Appliquer également les filtres après le tri
            filterPhotos();
    
            // Fermer le menu déroulant après sélection
            sortByOptions.style.display = 'none';
        });
    });
    

    // Appliquer le filtre par catégorie
    document.querySelectorAll('input[name="filter-category"]').forEach(radio => {
        radio.addEventListener('change', function () {
            // Mettre à jour le texte du bouton avec l'image
            const arrowImage = '<img src="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png" alt="arrow" height="7" width="12">';
            if (this.value === '') {
                filterCategoryButton.innerHTML = 'Catégories ' + arrowImage;
            } else {
                filterCategoryButton.innerHTML = `${this.nextSibling.textContent.trim()} ${arrowImage}`;
            }

            // Masquer l'option sélectionnée dans le menu déroulant
            const labels = filterCategoryOptions.querySelectorAll('label');
            labels.forEach(label => {
                const input = label.querySelector('input');
                if (input.value === this.value) {
                    label.style.display = 'none'; // Masquer l'option sélectionnée
                } else {
                    label.style.display = 'block'; // Afficher les autres options
                }
            });

            // Appliquer le filtre
            filterPhotos();

            // Fermer le menu déroulant après sélection
            filterCategoryOptions.style.display = 'none';
        });
    });

    // Appliquer le filtre par format
    document.querySelectorAll('input[name="filter-format"]').forEach(radio => {
        radio.addEventListener('change', function () {
            // Mettre à jour le texte du bouton avec l'image
            const arrowImage = '<img src="<?php echo get_template_directory_uri();/images/arrow-filter.png" alt="arrow" height="7" width="12">';
            if (this.value === '') {
                filterFormatButton.innerHTML = 'Formats ' + arrowImage;
            } else {
                filterFormatButton.innerHTML = `${this.nextSibling.textContent.trim()} ${arrowImage}`;
            }

            // Masquer l'option sélectionnée dans le menu déroulant
            const labels = filterFormatOptions.querySelectorAll('label');
            labels.forEach(label => {
                const input = label.querySelector('input');
                if (input.value === this.value) {
                    label.style.display = 'none'; // Masquer l'option sélectionnée
                } else {
                    label.style.display = 'block'; // Afficher les autres options
                }
            });

            // Appliquer le filtre
            filterPhotos();

            // Fermer le menu déroulant après sélection
            filterFormatOptions.style.display = 'none';
        });
    });
});
