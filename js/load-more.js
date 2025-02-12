jQuery(document).ready(function($) {
    var paged = 1; // Initialiser la pagination à 1
    var loading = false;
    var limit = $('#photo-gallery').data('limit') || 8; // Récupérer la limite via data-limit (par défaut 8)
    var loadedPhotos = []; // Stocker les photos chargées

    // Fonction pour charger les photos
    function load_photos() {
        if (loading) return;

        loading = true;

        jQuery.ajax({
            url: load_more_params.ajax_url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                paged: paged,
                nonce: load_more_params.nonce,
                limit: limit
            },
            success: function(response) {
                if (paged === 1) {
                    // Si c'est la première page, remplacer le contenu
                    jQuery('#photo-container').html(response);
                    loadedPhotos = [response]; // Stocker la première page de photos
                } else {
                    // Sinon, ajouter le contenu à la fin
                    jQuery('#photo-container').append(response);
                    loadedPhotos.push(response); // Ajouter les nouvelles photos à la liste
                }

                // Vérifier le nombre de photos retournées
                var photoCount = jQuery('#photo-container .photo-item').length;

                // Mettre à jour le texte du bouton en fonction de l'état
                if (photoCount < limit * paged) {
                    // S'il n'y a plus de photos à charger, masquer le bouton
                    jQuery('#load-more-btn').hide();
                } else {
                    // Sinon, afficher "Charger plus" ou "Charger moins" en fonction de l'état
                    if (paged === 1) {
                        jQuery('#load-more-btn').text('Charger plus').show();
                    } else {
                        jQuery('#load-more-btn').text('Charger moins').show();
                    }
                }

                loading = false;
            },
            error: function(xhr, status, error) {
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

    // Gestion du clic sur le bouton "Charger plus" ou "Charger moins"
    jQuery('#load-more-btn').on('click', function() {
        if ($(this).text() === 'Charger plus') {
            paged++; // Incrémenter la pagination
            load_photos(); // Charger les photos supplémentaires
        } else {
            unload_photos(); // Retirer les photos récemment ajoutées
        }
    });

    // Charger les photos à l'initialisation
    load_photos();

    // S'assurer que le bouton est "Charger plus" au chargement de la page
    jQuery('#load-more-btn').text('Charger plus');
});