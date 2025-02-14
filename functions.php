<?php
function load_more_scripts()
{
    wp_enqueue_script('jquery');
    wp_enqueue_script('load-more', get_theme_file_uri('/js/load-more.js'), array('jquery'));
    wp_localize_script('load-more', 'load_more_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('load_more_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'load_more_scripts');

function my_theme_enqueue_styles()
{
    wp_enqueue_style('my_theme_style', get_stylesheet_uri());
    wp_enqueue_style('my-theme-extra-style', get_theme_file_uri('/theme.css'));
    wp_enqueue_script('my-theme-extra-script', get_theme_file_uri('/js/modal.js'));
    wp_enqueue_script('filtre-photo-script', get_theme_file_uri('/js/filtre-photo.js'), array('jquery'));
    wp_enqueue_script('lightbox-script', get_theme_file_uri('/js/lightbox.js'));
    wp_enqueue_script('contact-nav-script', get_theme_file_uri('/js/nav-next-before.js'));
    wp_enqueue_script('menu-burger-script', get_theme_file_uri('/js/menu-burger.js'));
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');

function load_more_photos()
{
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'load_more_nonce')) {
        die('Permission refusée');
    }

    $paged = isset($_POST['paged']) ? intval($_POST['paged']) : 1;
    $limit = isset($_POST['limit']) ? intval($_POST['limit']) : 8;
    $post_not_in = !empty($_POST['post_not_in']) ? array(intval($_POST['post_not_in'])) : array();

    // Ajouter ici l'ID de la photo actuelle pour l'exclure de toutes les sections
    $current_photo_id = isset($_POST['post_not_in']) ? intval($_POST['post_not_in'][0]) : 0;
    if ($current_photo_id) {
        $post_not_in[] = $current_photo_id; // Ajouter la photo actuelle à la liste d'exclusion
    }

    // Simplification de la requête, sans les filtres supplémentaires
    $args = array(
        'post_type'      => 'photo',
        'posts_per_page' => $limit,
        'paged'          => $paged,
        'post__not_in'   => $post_not_in,  // Exclure la photo actuelle
    );

    // Debugging: Afficher les paramètres de la requête
    error_log("Arguments de la requête simplifiée: " . print_r($args, true));

    $query = new WP_Query($args);

    if (!$query->have_posts()) {
        error_log("Aucune photo trouvée après exclusion.");
    }

    $output = '';

    if ($query->have_posts()) {
        ob_start();

        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('template-parts/display-photo');
        }

        $output = ob_get_clean();
    }

    wp_reset_postdata();

    echo $output;
    wp_die();
}


add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');
?>
