jQuery(document).ready(function ($) {
    var loading = false;
    var limit = $('#photo-gallery').data('limit') || 8;
    var single = $('#photo-gallery').data('single'); // ID de la photo actuelle
    var defaultCategory = $('#photo-gallery').data('category') || "";
    var format = "";
    var sort = "default";

    // Masquer les options par défaut
    $('#filter-format-options input[type="radio"][value=""]').closest('label').hide();
    $('#filter-category-options input[type="radio"][value=""]').closest('label').hide();
    $('#sort-by-options input[type="radio"][value="default"]').closest('label').hide();

    // Fonction pour fermer tous les menus déroulants
    function closeAllDropdowns() {
        $('.dropdown-content').hide();
        $('.filter-container button').removeClass('dropdown-open');
    }

    // Fonction helper : récupérer la valeur du filtre ou renvoyer la valeur par défaut si absente ou vide
    function getFilterValue(selector, defaultVal) {
        var value = $(selector + ' input[type="radio"]:checked').val();
        if (typeof value === "undefined" || value === null || value.trim() === "") {
            return defaultVal;
        }
        return value;
    }

    // Fonction pour charger les photos avec les filtres
    function load_photos(paged, category, format, sort) {
        paged = paged || 1;
        // Forcer la valeur par défaut si la catégorie est vide
        if (!category || category.trim() === "") {
            category = defaultCategory;
        }
        if (loading) return;
        loading = true;

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
                if (!response) {
                    $('#photo-container');
                } else {
                    if (paged === 1) {
                        $('#photo-container').html(response);
                    } else {
                        $('#photo-container').append(response);
                    }

                    var photoCount = $('#photo-container .photo-item').length;
                    if (photoCount < limit * paged) {
                        $('#load-more-btn').hide(); // Cacher le bouton s'il n'y a pas assez de photos
                    } else {
                        $('#load-more-btn').show();
                    }
                }
                loading = false;
            }
        });
    }

    // Fonction pour mettre à jour les photos en fonction des filtres actuels
    function updatePhotos() {
        var cat = getFilterValue('#filter-category-options', defaultCategory);
        var fmt = getFilterValue('#filter-format-options', "");
        var srt = getFilterValue('#sort-by-options', "default");

        if (srt === "recent-to-old") {
            srt = "date_desc";
        } else if (srt === "old-to-recent") {
            srt = "date_asc";
        }

        load_photos(1, cat, fmt, srt);
    }

    // Gestion des événements sur le filtre Format
    $('#filter-format-options input[type="radio"]').on('change', function () {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button');
        var selectedText = $(this).closest('label').text().trim();

        dropdown.find('label').show();
        $(this).closest('label').hide();

        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');
        closeAllDropdowns();

        updatePhotos();
    });

    // Gestion des événements sur le filtre Catégorie
    $('#filter-category-options input[type="radio"]').on('change', function () {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button');
        var selectedText = $(this).closest('label').text().trim();

        dropdown.find('label').show();
        $(this).closest('label').hide();

        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');
        closeAllDropdowns();

        updatePhotos();
    });

    // Gestion des événements sur le filtre Tri
    $('#sort-by-options input[type="radio"]').on('change', function () {
        var dropdown = $(this).closest('.dropdown-content');
        var button = dropdown.prev('button');
        var selectedText = $(this).closest('label').text().trim();

        dropdown.find('label').show();
        $(this).closest('label').hide();

        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');
        closeAllDropdowns();

        updatePhotos();
    });

    // Clic sur les boutons pour afficher les menus déroulants
    $('#filter-format-button, #filter-category-button, #sort-by-button').on('click', function (e) {
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

    // Forcer la sélection par défaut pour le filtre Catégorie si aucun bouton n'est coché
    var $defaultRadio = $('#filter-category-options input[type="radio"][value="' + defaultCategory + '"]');
    if ($defaultRadio.length && !$defaultRadio.is(':checked')) {
        $defaultRadio.prop('checked', true);
    }

    // Lancer le chargement initial des photos avec un léger délai pour s'assurer que le DOM est prêt
    setTimeout(function () {
        load_photos(1, defaultCategory, "", "default");
    }, 100);
});
