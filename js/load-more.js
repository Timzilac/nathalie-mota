jQuery(document).ready(function($){
    var paged = 1;
    var loading = false;

    function load_photos() {
        if (loading) return;

        loading = true;

        console.log('Requête Ajax envoyée');

        jQuery.ajax({
            url: load_more_params.ajax_url,
            type: 'POST',
            data: {
                action: 'load_more_photos',
                paged: paged,
                nonce: load_more_params.nonce  // Assure-toi que le nonce est bien envoyé
            },
            success: function(response) {
                console.log('Réponse Ajax :', response);

                if (paged === 1) {
                    jQuery('#photo-container').html(response);
                    jQuery('#load-more-btn').text('Charger plus');
                } else {
                    jQuery('#photo-container').append(response);
                }

                jQuery('#load-more-btn').text(paged > 1 ? 'Charger moins' : 'Charger plus');
                loading = false;
            },
            error: function(xhr, status, error) {
                console.log('Erreur Ajax :', error);
            }
        });
    }

    jQuery('#load-more-btn').on('click', function() {
        paged = paged === 1 ? 2 : 1;
        load_photos();
    });

    load_photos();
});
