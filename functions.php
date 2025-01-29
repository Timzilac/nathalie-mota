<?php

function enqueue_modal_script() {
    wp_enqueue_script('modal-script', get_template_directory_uri() . '/js/modal.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_modal_script');