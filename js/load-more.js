jQuery(document).ready(function ($) {
    var paged = 1;
    var loading = false;
    var initialLimit = 4;
    var limit = 4;
    var initialContent = ""; // Pour sauvegarder les 4 premières photos

    window.load_photos = function (paged, reset = false) {
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
            success: function (response) {

                if (reset) {
                    $('#photo-container').html(response.data.data);
                    initialContent = response.data.data; // Sauvegarde l'état initial
                } else {
                    $('#photo-container').append(response.data.data);
                }

                if (response.data.count <= limit * paged) {
                    $('#load-more-btn').text('Charger moins').addClass('reset').show();
                } else {
                    $('#load-more-btn').text('Charger plus').removeClass('reset').show();
                }

                loading = false;
            },
        });
    }

    $('#load-more-btn').on('click', function () {
        if ($(this).hasClass('reset')) {
            // Retour à l'état initial avec 4 photos
            paged = 1;
            $('#photo-container').html(initialContent);
            $(this).text('Charger plus').removeClass('reset').show();
        } else {
            paged++;
            load_photos(paged);
        }
    });

    // Chargement initial des 4 premières photos
    load_photos(1, true);
    $('#load-more-btn').text('Charger plus').show();
});
