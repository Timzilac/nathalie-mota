<?php
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'my_theme_style', get_stylesheet_uri() );
    wp_enqueue_style('my-theme-extra-style', get_theme_file_uri('/theme.css') );
    wp_enqueue_script('my-theme-extra-script', get_theme_file_uri('/js/modal.js'));
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
?>