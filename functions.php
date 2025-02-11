<?php
function load_more_scripts() {
    wp_enqueue_script('jquery');  // Enregistrer jQuery

    // Enregistrer ton fichier JavaScript
    wp_enqueue_script('load-more', get_theme_file_uri('/js/load-more.js'), array('jquery'));

    // Passer l'URL de l'Ajax, le nonce et le nombre d'articles par page à JavaScript
    wp_localize_script('load-more', 'load_more_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),  // URL pour envoyer la requête Ajax
        'posts_per_page' => 8,  // Nombre d'articles par page
        'nonce' => wp_create_nonce('load_more_nonce'), // Générer un nonce pour la sécurité
    ));
}
add_action('wp_enqueue_scripts', 'load_more_scripts');



function my_theme_enqueue_styles()
{
    wp_enqueue_style('my_theme_style', get_stylesheet_uri());
    wp_enqueue_style('my-theme-extra-style', get_theme_file_uri('/theme.css'));
    wp_enqueue_script('my-theme-extra-script', get_theme_file_uri('/js/modal.js'));
    // wp_enqueue_script('filtre-photo-script', get_theme_file_uri('/js/section-photo-filtre.js'));
    // wp_enqueue_script('nav-next-before-script', get_theme_file_uri('/js/nav-next-before.js'));
    wp_enqueue_script('lightbox-photo-script', get_theme_file_uri('/js/lightbox-photo.js'));

}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');



// Fonction pour charger les photos via Ajax
function load_more_photos() {
    // Vérifier si le nonce est valide
    if( !isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'load_more_nonce') ) {
        die('Permission refusée'); // Si le nonce est invalide, arrêter l'exécution
    }

    $paged = isset($_POST['paged']) ? $_POST['paged'] : 1;

    $args = array(
        'post_type' => 'photo',  // Assurez-vous que le CPT s'appelle 'photo'
        'posts_per_page' => 8,
        'paged' => $paged,
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        $output = '';
        while ($query->have_posts()) : $query->the_post();
            $output .= '<div class="photo-item">';
            if (has_post_thumbnail()) {
                $output .= get_the_post_thumbnail();
            } else {
                $output .= '<p>No thumbnail available</p>';
            }
            $output .= '</div>';
        endwhile;

        echo $output;
    } else {
        echo 'Aucune photo disponible.';
    }

    wp_reset_postdata();
    wp_die(); // Toujours utiliser wp_die() à la fin d'une requête Ajax
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');


?>