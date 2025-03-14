<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap"
        rel="stylesheet">
    <title>Timothé Lacoste</title>
    <?php wp_head(); ?>
</head>

<body>
    <header>
        <div class="empty-div"></div>
        <a href="http://portfolio.local/" class="logo-container">
            <img src="<?php echo get_template_directory_uri(); ?>/images/logo-tim.png" alt="Logo de Timothé Lacoste"
                height="235" width="230" />
        </a>
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
                echo '</ul></nav>';
            }
        }
        ?>
    </header>