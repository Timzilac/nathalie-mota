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
    wp_enqueue_script('lightbox-script', get_theme_file_uri('/js/lightbox.js'));
    wp_enqueue_script('a-propos-script', get_theme_file_uri('/js/a-propos.js'));
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');

function load_more_photos()
{
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'load_more_nonce')) {
        die('Permission refusée');
    }

    $paged = isset($_POST['paged']) ? intval($_POST['paged']) : 1;
    $limit = isset($_POST['limit']) ? intval($_POST['limit']) : 8;

    $args = array(
        'post_type' => 'photo', //
        'posts_per_page' => $limit,
        'paged' => $paged,
    );

    $query = new WP_Query($args);
    $result = array();
    $output = '';

    if ($query->have_posts()) {
        ob_start();
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('template-parts/display-photo');
        }
        $output = ob_get_clean();
    } else {
        $output = '<p>Aucune photo à afficher.</p>';
    }
    

    wp_reset_postdata();
    $result['data'] = $output;
    $result['count'] = $query->found_posts;

    return wp_send_json_success($result);
}

add_action('wp_ajax_load_more_photos', 'load_more_photos');
add_action('wp_ajax_nopriv_load_more_photos', 'load_more_photos');
