jQuery(document).ready(function($){
    var paged = 1;
    var loading = false;
    var limit = $('#photo-gallery').data('limit') || 8; // Récupérer la limite via data-limit (par défaut 8)

    function load_photos() {
        if (loading) return;

        loading = true;

        jQuery.ajax({
            url: load_more_params.ajax_url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                paged: paged,
                nonce: load_more_params.nonce,  // Assure-toi que le nonce est bien envoyé
                limit: limit // Ajouter la limite à la requête AJAX
            },
            success: function(response) {

                if (paged === 1) {
                    jQuery('#photo-container').html(response);
                    jQuery('#load-more-btn').text('Charger plus');
                } else {
                    jQuery('#photo-container').append(response);
                }

                // Modifier le texte du bouton en fonction de la page
                jQuery('#load-more-btn').text(paged > 1 ? 'Charger moins' : 'Charger plus');
                loading = false;
            },
            error: function(xhr, status, error) {

            }
        });
    }

    jQuery('#load-more-btn').on('click', function() {
        // Inverser la pagination entre 1 et 2
        paged = paged === 1 ? 2 : 1;
        load_photos();
    });

    load_photos(); // Charger les photos à l'initialisation
});
