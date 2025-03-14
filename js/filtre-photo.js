jQuery(document).ready(function ($) {
    var loading = false;
    var limit = jQuery('#photo-gallery').data('limit') || 8;
    var single = jQuery('#photo-gallery').data('single'); // ID de la photo actuelle
    var defaultCategory = jQuery('#photo-gallery').data('category') || "";
    var format = "";
    var sort = "default";

    // Masquer les options par défaut
    jQuery('#filter-format-options input[type="radio"][value=""]').closest('label').hide();
    jQuery('#filter-category-options input[type="radio"][value=""]').closest('label').hide();
    jQuery('#sort-by-options input[type="radio"][value="default"]').closest('label').hide();

    // Fonction pour fermer tous les menus déroulants
    function closeAllDropdowns() {
        jQuery('.dropdown-content').hide();
        jQuery('.filter-container button').removeClass('dropdown-open');
    }

    // Fonction helper : récupérer la valeur du filtre ou renvoyer la valeur par défaut si absente ou vide
    function getFilterValue(selector, defaultVal) {
        var value = jQuery(selector + ' input[type="radio"]:checked').val();
        if (typeof value === "undefined" || value === null || value.trim() === "") {
            return defaultVal;
        }
        return value;
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
    jQuery('#filter-format-options input[type="radio"]').on('change', function () {
        var dropdown = jQuery(this).closest('.dropdown-content');
        var button = dropdown.prev('button');
        var selectedText = jQuery(this).closest('label').text().trim();

        dropdown.find('label').show();
        jQuery(this).closest('label').hide();

        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');
        closeAllDropdowns();

        updatePhotos();
    });

    // Gestion des événements sur le filtre Catégorie
    jQuery('#filter-category-options input[type="radio"]').on('change', function () {
        var dropdown = jQuery(this).closest('.dropdown-content');
        var button = dropdown.prev('button');
        var selectedText = jQuery(this).closest('label').text().trim();

        dropdown.find('label').show();
        jQuery(this).closest('label').hide();

        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');
        closeAllDropdowns();

        updatePhotos();
    });

    // Gestion des événements sur le filtre Tri
    jQuery('#sort-by-options input[type="radio"]').on('change', function () {
        var dropdown = jQuery(this).closest('.dropdown-content');
        var button = dropdown.prev('button');
        var selectedText = jQuery(this).closest('label').text().trim();

        dropdown.find('label').show();
        jQuery(this).closest('label').hide();

        button.html(selectedText + ' <img src="' + button.data('arrow-image') + '" alt="arrow" height="7" width="12">');
        closeAllDropdowns();

        updatePhotos();
    });

    // Clic sur les boutons pour afficher les menus déroulants
    jQuery('#filter-format-button, #filter-category-button, #sort-by-button').on('click', function (e) {
        e.stopPropagation();
        var dropdown = jQuery(this).next('.dropdown-content');
        if (dropdown.is(':visible')) {
            closeAllDropdowns();
        } else {
            closeAllDropdowns();
            dropdown.toggle();
            jQuery(this).addClass('dropdown-open');
        }
    });

    // Forcer la sélection par défaut pour le filtre Catégorie si aucun bouton n'est coché
    var $defaultRadio = jQuery('#filter-category-options input[type="radio"][value="' + defaultCategory + '"]');
    if ($defaultRadio.length && !$defaultRadio.is(':checked')) {
        $defaultRadio.prop('checked', true);
    }

    // Lancer le chargement initial des photos avec un léger délai pour s'assurer que le DOM est prêt
    setTimeout(function () {
        load_photos(1, defaultCategory, "", "default");
    }, 100);
});
