jQuery(document).ready(function($) {
    var loading = false;
    var limit = $('#photo-gallery').data('limit') || 8; // Récupérer la limite via data-limit (par défaut 8)

    // Masquer l'option par défaut ("Formats") au démarrage de la page
    $('#filter-format-options input[type="radio"][value=""]').closest('label').hide();
    $('#filter-category-options input[type="radio"][value=""]').closest('label').hide();
    $('#sort-by-options input[type="radio"][value="default"]').closest('label').hide(); // Masquer l'option "Trier par" par défaut

    // Fonction pour fermer tous les menus déroulants et retirer la classe dropdown-open
    function closeAllDropdowns() {
        $('.dropdown-content').hide();
        $('.filter-container button').removeClass('dropdown-open');
    }

    // Fonction pour charger les photos
    function load_photos(paged = 1, category = '', format = '', sort = 'default') {
        if (loading) return;

        loading = true;

        $.ajax({
            url: load_more_params.ajax_url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                paged: paged,
                nonce: load_more_params.nonce,
                limit: limit,
                category: category,
                format: format,
                sort: sort
            },
            success: function(response) {
                if (paged === 1) {
                    $('#photo-container').html(response);
                } else {
                    $('#photo-container').append(response);
                }

                // Vérifier le nombre de photos retournées
                var photoCount = $('#photo-container .photo-item').length;

                // Masquer le bouton "Charger plus" si le nombre de photos est inférieur à la limite
                if (photoCount < limit * paged) {
                    $('#load-more-btn').hide();
                } else {
                    $('#load-more-btn').show();
                }

                loading = false;
            },
            error: function(xhr, status, error) {
                console.error(error);
                loading = false;
            }
        });
    }

    // Gestion de l'affichage du menu déroulant au clic du bouton de format
    $('#filter-format-button').on('click', function(e) {
        e.stopPropagation(); // Empêcher la propagation de l'événement
        var dropdown = $(this).next('.dropdown-content');
        if (dropdown.is(':visible')) {
            closeAllDropdowns();
        } else {
            closeAllDropdowns();
            dropdown.toggle();
            $(this).addClass('dropdown-open');
        }
    });

    // Fermer le menu déroulant et mettre à jour le bouton après sélection d'une option de format
    $('#filter-format-options input[type="radio"]').on('change', function() {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button'); // Récupérer le bouton associé
        var selectedText = $(this).closest('label').text().trim(); // Récupérer le texte de l'option sélectionnée

        // Réafficher toutes les options du menu déroulant
        dropdown.find('label').show();

        // Masquer l'option sélectionnée dans le menu déroulant
        $(this).closest('label').hide();

        // Mettre à jour le texte du bouton
        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');

        // Fermer le menu déroulant
        closeAllDropdowns();

        // Récupérer les valeurs des filtres
        var format = $('#filter-format-options input[type="radio"]:checked').val();
        var category = $('#filter-category-options input[type="radio"]:checked').val();
        var sort = $('#sort-by-options input[type="radio"]:checked').val();

        // Recharger les photos avec les nouveaux filtres (cumulés)
        load_photos(1, category, format, sort);
    });

    // Réinitialiser les filtres si l'utilisateur sélectionne l'option par défaut de format
    $('#filter-format-options input[type="radio"][value=""]').on('change', function() {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button'); // Récupérer le bouton associé

        // Réinitialiser le texte du bouton
        button.html('Formats <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');

        // Afficher toutes les options du menu déroulant
        dropdown.find('label').show();

        // Fermer le menu déroulant
        closeAllDropdowns();

        // Récupérer les valeurs des filtres
        var format = $('#filter-format-options input[type="radio"]:checked').val();
        var category = $('#filter-category-options input[type="radio"]:checked').val();
        var sort = $('#sort-by-options input[type="radio"]:checked').val();

        // Recharger les photos avec les filtres cumulés
        load_photos(1, category, format, sort);
    });

    // Gestion de l'affichage du menu déroulant au clic du bouton de catégorie
    $('#filter-category-button').on('click', function(e) {
        e.stopPropagation(); // Empêcher la propagation de l'événement
        var dropdown = $(this).next('.dropdown-content');
        if (dropdown.is(':visible')) {
            closeAllDropdowns();
        } else {
            closeAllDropdowns();
            dropdown.toggle();
            $(this).addClass('dropdown-open');
        }
    });

    // Fermer le menu déroulant et mettre à jour le bouton après sélection d'une option de catégorie
    $('#filter-category-options input[type="radio"]').on('change', function() {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button'); // Récupérer le bouton associé
        var selectedText = $(this).closest('label').text().trim(); // Récupérer le texte de l'option sélectionnée

        // Réafficher toutes les options du menu déroulant
        dropdown.find('label').show();

        // Masquer l'option sélectionnée dans le menu déroulant
        $(this).closest('label').hide();

        // Mettre à jour le texte du bouton
        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');

        // Fermer le menu déroulant
        closeAllDropdowns();

        // Récupérer les valeurs des filtres
        var category = $('#filter-category-options input[type="radio"]:checked').val();
        var format = $('#filter-format-options input[type="radio"]:checked').val();
        var sort = $('#sort-by-options input[type="radio"]:checked').val();

        // Recharger les photos avec les nouveaux filtres (cumulés)
        load_photos(1, category, format, sort);
    });

    // Réinitialiser les filtres si l'utilisateur sélectionne l'option par défaut de catégorie
    $('#filter-category-options input[type="radio"][value=""]').on('change', function() {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button'); // Récupérer le bouton associé

        // Réinitialiser le texte du bouton
        button.html('Catégories <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');

        // Afficher toutes les options du menu déroulant
        dropdown.find('label').show();

        // Fermer le menu déroulant
        closeAllDropdowns();

        // Récupérer les valeurs des filtres
        var category = $('#filter-category-options input[type="radio"]:checked').val();
        var format = $('#filter-format-options input[type="radio"]:checked').val();
        var sort = $('#sort-by-options input[type="radio"]:checked').val();

        // Recharger les photos avec les filtres cumulés
        load_photos(1, category, format, sort);
    });

    // Gestion de l'affichage du menu déroulant au clic du bouton de tri
    $('#sort-by-button').on('click', function(e) {
        e.stopPropagation(); // Empêcher la propagation de l'événement
        var dropdown = $(this).next('.dropdown-content');
        if (dropdown.is(':visible')) {
            closeAllDropdowns();
        } else {
            closeAllDropdowns();
            dropdown.toggle();
            $(this).addClass('dropdown-open');
        }
    });

    // Fermer le menu déroulant et mettre à jour le bouton après sélection d'une option de tri
    $('#sort-by-options input[type="radio"]').on('change', function() {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button'); // Récupérer le bouton associé
        var selectedText = $(this).closest('label').text().trim(); // Récupérer le texte de l'option sélectionnée

        // Réafficher toutes les options du menu déroulant
        dropdown.find('label').show();

        // Masquer l'option sélectionnée dans le menu déroulant
        $(this).closest('label').hide();

        // Mettre à jour le texte du bouton
        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');

        // Fermer le menu déroulant
        closeAllDropdowns();

        // Récupérer les valeurs des filtres
        var sort = $('#sort-by-options input[type="radio"]:checked').val();
        var category = $('#filter-category-options input[type="radio"]:checked').val();
        var format = $('#filter-format-options input[type="radio"]:checked').val();

        // Recharger les photos avec les nouveaux filtres (cumulés)
        load_photos(1, category, format, sort);
    });

    // Fermer les menus déroulants lors d'un clic en dehors
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.filter-container').length) {
            closeAllDropdowns();
        }
    });

    // Charger les photos à l'initialisation
    load_photos();
});