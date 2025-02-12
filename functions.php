<?php
function load_more_scripts()
{
    wp_enqueue_script('jquery');  // Enregistrer jQuery

    // Enregistrer ton fichier JavaScript
    wp_enqueue_script('load-more', get_theme_file_uri('/js/load-more.js'), array('jquery'));

    // Passer l'URL de l'Ajax, le nonce et le nombre d'articles par page à JavaScript
    wp_localize_script('load-more', 'load_more_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),  // URL pour envoyer la requête Ajax
        'nonce' => wp_create_nonce('load_more_nonce'), // Générer un nonce pour la sécurité
    ));
}
add_action('wp_enqueue_scripts', 'load_more_scripts');



function my_theme_enqueue_styles()
{
    wp_enqueue_style('my_theme_style', get_stylesheet_uri());
    wp_enqueue_style('my-theme-extra-style', get_theme_file_uri('/theme.css'));
    wp_enqueue_script('my-theme-extra-script', get_theme_file_uri('/js/modal.js'));
    wp_enqueue_script('filtre-photo-script', get_theme_file_uri('/js/section-photo-filtre.js'));
    wp_enqueue_script('lightbox-script', get_theme_file_uri('/js/lightbox.js'));
    wp_enqueue_script('contact-nav-script', get_theme_file_uri('/js/nav-next-before.js'));

}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');



// Fonction pour charger les photos via Ajax
function load_more_photos()
{
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'load_more_nonce')) {
        die('Permission refusée');
    }

    $paged = isset($_POST['paged']) ? intval($_POST['paged']) : 1;
    $limit = isset($_POST['limit']) ? intval($_POST['limit']) : 8; // Par défaut 8 photos

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => $limit,
        'paged' => $paged,
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        $output = '';
        while ($query->have_posts()) {
            $query->the_post();
            $photo_id = get_the_ID();
            $photo_title = get_the_title();
            $photo_permalink = get_permalink();
            $photo_format = get_the_terms($photo_id, 'format');
            $photo_format_name = !empty($photo_format) ? esc_html($photo_format[0]->name) : 'Sans format';
            $photo_category = get_the_terms($photo_id, 'categorie');
            $photo_category_name = !empty($photo_category) ? esc_html($photo_category[0]->name) : 'Sans catégorie';
            $photo_reference = get_post_meta($photo_id, 'reference', true);
            $photo_fullscreen = get_the_post_thumbnail_url($photo_id, 'full');

            $output .= '<div class="photo-item" data-fullscreen="' . esc_url($photo_fullscreen) . '" data-format="' . esc_attr($photo_format_name) . '" data-reference="' . esc_attr($photo_reference) . '" data-category="' . esc_html($photo_category_name) . '">';
            if (has_post_thumbnail()) {
                $output .= get_the_post_thumbnail($photo_id, 'medium');
            } else {
                $output .= '<p>No thumbnail available</p>';
            }

            // Overlay
            $output .= '<div class="photo-overlay">';
            $output .= '<div class="photo-icons">';
            $output .= '<div class="fullscreen-icon">';
            $output .= '<img src="' . get_template_directory_uri() . '/images/fullscreen.png" alt="Fullscreen">';
            $output .= '</div>';
            $output .= '<div class="eye-icon" onclick="window.location.href=\'' . $photo_permalink . '\'">';
            $output .= '<img src="' . get_template_directory_uri() . '/images/icon-eye.png" alt="Voir">';
            $output .= '</div>';
            $output .= '<div class="category-title">';
            $output .= '<span class="photo-title">' . esc_html($photo_title) . '</span>';
            $output .= '<span class="photo-category">' . esc_html($photo_category_name) . '</span>';
            $output .= '</div>'; // Fin de .category-title
            $output .= '</div>'; // Fin de .photo-icons
            $output .= '</div>'; // Fin de .photo-overlay
            $output .= '</div>'; // Fin de .photo-item
        }

        echo $output;
    } else {
        echo 'Aucune photo disponible.';
    }

    wp_reset_postdata();
    wp_die();
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');

?>