jQuery(document).ready(function ($) {
    var loading = false;
    var limit = $('#photo-gallery').data('limit') || 8; // Récupérer la limite via data-limit (par défaut 8)
    var single = $('#photo-gallery').data('single'); // ID de la photo actuelle
    var category = $('#photo-gallery').data('category');
    var format = "";
    var sort = "default";

    // Masquer l'option par défaut ("Formats") au démarrage
    $('#filter-format-options input[type="radio"][value=""]').closest('label').hide();
    $('#filter-category-options input[type="radio"][value=""]').closest('label').hide();
    $('#sort-by-options input[type="radio"][value="default"]').closest('label').hide(); // Masquer l'option "Trier par"

    // Fonction pour fermer tous les menus déroulants
    function closeAllDropdowns() {
        $('.dropdown-content').hide();
        $('.filter-container button').removeClass('dropdown-open');
    }

    // Fonction pour charger les photos avec les filtres
    function load_photos(paged = 1, category = '', format = '', sort = 'default') {
        if (loading) return;

        loading = true;
        console.log("Photo actuelle exclue (post_not_in) :", single);

        $.ajax({
            url: load_more_params.ajax_url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                paged: paged,
                post_not_in: [single], // Exclure la photo actuelle
                nonce: load_more_params.nonce,
                limit: limit,
                category: category,
                format: format,
                sort: sort
            },
            success: function (response) {
                console.log("Réponse AJAX reçue :", response);

                if (!response) {
                    console.log("Aucune photo reçue. Vérifiez la requête PHP.");
                } else {
                    if (paged === 1) {
                        $('#photo-container').html(response);
                    } else {
                        $('#photo-container').append(response);
                    }

                    var photoCount = $('#photo-container .photo-item').length;
                    if (photoCount < limit * paged) {
                        $('#load-more-btn').hide(); // Cacher le bouton si pas de photos restantes
                    } else {
                        $('#load-more-btn').show(); // Afficher le bouton "Load more"
                    }

                    loading = false;
                }
            }
        });
    }

    // Clic sur le bouton de format pour afficher le menu déroulant
    $('#filter-format-button').on('click', function (e) {
        e.stopPropagation();
        var dropdown = $(this).next('.dropdown-content');
        if (dropdown.is(':visible')) {
            closeAllDropdowns();
        } else {
            closeAllDropdowns();
            dropdown.toggle();
            $(this).addClass('dropdown-open');
        }
    });

    // Mettre à jour le bouton et recharger les photos après sélection d'un format
    $('#filter-format-options input[type="radio"]').on('change', function () {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button');
        var selectedText = $(this).closest('label').text().trim();

        dropdown.find('label').show();
        $(this).closest('label').hide();

        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');
        closeAllDropdowns();

        var format = $('#filter-format-options input[type="radio"]:checked').val();
        var category = $('#filter-category-options input[type="radio"]:checked').val();
        var sort = $('#sort-by-options input[type="radio"]:checked').val();

        load_photos(1, category, format, sort);
    });

    // Gérer la sélection du filtre de catégorie
    $('#filter-category-button').on('click', function (e) {
        e.stopPropagation();
        var dropdown = $(this).next('.dropdown-content');
        if (dropdown.is(':visible')) {
            closeAllDropdowns();
        } else {
            closeAllDropdowns();
            dropdown.toggle();
            $(this).addClass('dropdown-open');
        }
    });

    $('#filter-category-options input[type="radio"]').on('change', function () {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button');
        var selectedText = $(this).closest('label').text().trim();

        dropdown.find('label').show();
        $(this).closest('label').hide();

        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');
        closeAllDropdowns();

        var category = $('#filter-category-options input[type="radio"]:checked').val();
        var format = $('#filter-format-options input[type="radio"]:checked').val();
        var sort = $('#sort-by-options input[type="radio"]:checked').val();

        load_photos(1, category, format, sort);
    });

    // Clic sur le bouton de tri pour afficher le menu
    $('#sort-by-button').on('click', function (e) {
        e.stopPropagation();
        var dropdown = $(this).next('.dropdown-content');
        if (dropdown.is(':visible')) {
            closeAllDropdowns();
        } else {
            closeAllDropdowns();
            dropdown.toggle();
            $(this).addClass('dropdown-open');
        }
    });

    $('#sort-by-options input[type="radio"]').on('change', function () {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button');
        var selectedText = $(this).closest('label').text().trim();

        dropdown.find('label').show();
        $(this).closest('label').hide();

        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');
        closeAllDropdowns();

        var sort = $('#sort-by-options input[type="radio"]:checked').val();
        var category = $('#filter-category-options input[type="radio"]:checked').val();
        var format = $('#filter-format-options input[type="radio"]:checked').val();

        load_photos(1, category, format, sort);
    });

    // Charger les photos lors de l'initialisation
    load_photos(1, category, format, sort);
});
