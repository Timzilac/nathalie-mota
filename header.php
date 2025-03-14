<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <title>Nathalie Mota</title>
    <?php wp_head(); ?>
</head>

<body>
    <header>
        <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="Logo de Nathalie Mota" height="14"
            width="216" />

        <button id="menu-toggle" aria-label="Ouvrir le menu">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <?php
        $menu_name = 'main-menu';
        $menu = wp_get_nav_menu_object($menu_name);

        if ($menu) {
            $menu_items = wp_get_nav_menu_items($menu->term_id);

            if (!empty($menu_items)) {
                echo '<nav class="main-nav"><ul class="main-menu">';
                foreach ($menu_items as $item) {
                    echo '<li><a href="' . esc_url($item->url) . '">' . esc_html($item->title) . '</a></li>';
                }
                echo '<li><a id="contactLink" href="#">Contact</a></li>';
                echo '</ul></nav>';
            }
        }
        ?>
    </header>