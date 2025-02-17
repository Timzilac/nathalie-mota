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
    wp_enqueue_script('modal-script', get_theme_file_uri('/js/modal.js'));
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
    $post_not_in = !empty($_POST['post_not_in']) ? array_map('intval', (array) $_POST['post_not_in']) : array();

    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : '';
    $format = isset($_POST['format']) ? sanitize_text_field($_POST['format']) : '';
    $sort = isset($_POST['sort']) ? sanitize_text_field($_POST['sort']) : 'default';

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => $limit,
        'paged' => $paged,
        'post__not_in' => $post_not_in,
    );

    // Gestion des filtres avec 'AND' pour éviter les conflits
    $tax_query = array('relation' => 'AND');

    if (!empty($category)) {
        $tax_query[] = array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $category,
        );
    }

    if (!empty($format)) {
        $tax_query[] = array(
            'taxonomy' => 'format',
            'field' => 'slug',
            'terms' => $format,
        );
    }

    if (count($tax_query) > 1) {
        $args['tax_query'] = $tax_query;
    }

    // Trier les résultats par date
    if ($sort === 'date_desc') {
        $args['orderby'] = 'date';
        $args['order'] = 'DESC';
    } elseif ($sort === 'date_asc') {
        $args['orderby'] = 'date';
        $args['order'] = 'ASC';
    }

    $query = new WP_Query($args);

    $output = '';

    if ($query->have_posts()) {
        ob_start();

        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('template-parts/display-photo');
        }

        $output = ob_get_clean();
    } else {
        // Si aucun post n'est trouvé, on affiche un message de "aucun résultat"
        $output = '<p>Aucune photo à afficher.</p>';
    }

    wp_reset_postdata();

    echo $output;
    wp_die();
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');
?>