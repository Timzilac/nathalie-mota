function theme_enqueue_scripts() {
// Ajouter le fichier modal.js
wp_enqueue_script(
'modal-script',
get_template_directory_uri() . 'js\modal.js',
true // Charger dans le footer
);
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');