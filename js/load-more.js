jQuery(document).ready(function ($) {
    var paged = 1; // Initialiser la pagination à 1
    var loading = false;
    var limit = $('#photo-gallery').data('limit') || 8; // Récupérer la limite via data-limit (par défaut 8)
    var loadedPhotos = []; // Stocker les photos chargées
    var single = $('#photo-gallery').data('single'); // ID de la photo actuelle
    var defaultCategory = $('#photo-gallery').data('category') || "";
    var format = "";
    var sort = "default";
    var category = defaultCategory;

    // Fonction pour charger les photos
    window.load_photos = function (paged, category, format, sort) {
        if (loading) return;

        loading = true;

        jQuery.ajax({
            url: load_more_params.ajax_url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                paged: paged,
                nonce: load_more_params.nonce,
                post_not_in: [single], // Exclure la photo actuelle
                limit: limit,
                category: category,
                format: format,
                sort: sort
            },
            success: function (response) {
                var response_data = response.data.data;
                if (paged === 1) {
                    // Si c'est la première page, remplacer le contenu
                    jQuery('#photo-container').html(response_data);
                    loadedPhotos = [response_data]; // Stocker la première page de photos
                } else {
                    // Sinon, ajouter le contenu à la fin
                    jQuery('#photo-container').append(response_data);
                    loadedPhotos.push(response_data); // Ajouter les nouvelles photos à la liste
                }

                // Vérifier le nombre de photos retournées
                var photoCount = response.data.count;

                if (photoCount <= limit * paged) {
                    // S'il n'y a plus de photos à charger, masquer le bouton
                    jQuery('#load-more-btn').hide();
                } else {
                    // Sinon, afficher "Charger plus"
                    jQuery('#load-more-btn').text('Charger plus').show();
                }
                loading = false;
            },
            error: function (xhr, status, error) {
                console.error(error);
                loading = false;
            }
        });
    }

    // Fonction pour retirer les photos récemment ajoutées
    function unload_photos() {
        if (loadedPhotos.length > 1) {
            loadedPhotos.pop(); // Retirer la dernière page de photos chargées
            jQuery('#photo-container').html(loadedPhotos.join('')); // Mettre à jour le contenu avec les photos restantes
            paged--; // Décrémenter la pagination
        }

        // Si on revient à la première page, changer le texte du bouton
        if (paged === 1) {
            jQuery('#load-more-btn').text('Charger plus');
        }
    }

    // Gestion du clic sur le bouton "Charger plus"
    jQuery('#load-more-btn').on('click', function () {
        if ($(this).text() === 'Charger plus') {
            paged++; // Incrémenter la pagination
            load_photos(paged, category, format, sort); // Charger les photos supplémentaires
        }
    });

    // Charger les photos à l'initialisation
    load_photos();

    // S'assurer que le bouton est "Charger plus" au chargement de la page
    jQuery('#load-more-btn').text('Charger plus');
});