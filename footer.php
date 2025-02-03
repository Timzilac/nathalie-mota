<footer>
    <?php
    $menu_name = 'footer-menu'; // Nom exact de ton menu
    $menu = wp_get_nav_menu_object($menu_name); // Récupère l'objet du menu
    
    if ($menu) {
        $menu_items = wp_get_nav_menu_items($menu->term_id); // Récupère les éléments du menu
    
        if (!empty($menu_items)) {
            echo '<nav class="footer-nav"><ul class="footer-menu">';
            foreach ($menu_items as $item) {
                echo '<li><a href="' . esc_url($item->url) . '">' . esc_html($item->title) . '</a></li>';
            }
            echo '<li class="all-right-reserved">Tous droits réservés</li>';
            echo '</ul></nav>';
        } else {
            echo '<p>Le menu "footer-menu" est vide.</p>';
        }
    } else {
        echo '<p>Le menu "footer-menu" n\'existe pas.</p>';
    }
    ?>
    <?php get_template_part('/template-parts/modal'); ?>
</footer>
</body>

</html>