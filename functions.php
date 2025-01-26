<?php
function ajouter_styles_theme() {
    wp_enqueue_style(
        'style-principal',
        get_stylesheet_uri() 
    );
}
add_action('wp_enqueue_scripts', 'ajouter_styles_theme');
?>
