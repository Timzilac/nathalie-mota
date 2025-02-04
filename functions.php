<?php
function my_theme_enqueue_styles()
{
    wp_enqueue_style('my_theme_style', get_stylesheet_uri());
    wp_enqueue_style('my-theme-extra-style', get_theme_file_uri('/theme.css'));
    wp_enqueue_script('my-theme-extra-script', get_theme_file_uri('/js/modal.js'));
    wp_enqueue_script('filtre-photo-script', get_theme_file_uri('/js/section-photo-filtre.js'));
    wp_enqueue_script('lightbox-photo-script', get_theme_file_uri('/js/lightbox-photo.js'));
    wp_enqueue_script('nav-next-before-script', get_theme_file_uri('/js/nav-next-before.js'));
}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');
?>