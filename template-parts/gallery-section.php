<?php
$photo_limit = isset($photo_limit) ? $photo_limit : 8; // Limite par défaut à 8 photos
?>

<?php if ($photo_limit !== 2): ?>
<div class="gallery-filters">
    <div class="category-format-filters">
        <div class="filter-container">
            <button id="filter-category-button"
                data-arrow-image="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png">
                Catégories <img src="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png" alt="arrow"
                    height="7" width="12">
            </button>
            <div id="filter-category-options" class="dropdown-content">
                <label>
                    <input type="radio" name="filter-category" value="" checked> Catégories
                </label>
                <?php
                $categories = get_terms(['taxonomy' => 'categorie', 'hide_empty' => true]);
                foreach ($categories as $category) {
                    echo "<label>
        <input type='radio' name='filter-category' value='{$category->slug}'> {$category->name}
      </label>";
                }
                ?>
            </div>
        </div>
        <div class="filter-container">
            <button id="filter-format-button"
                data-arrow-image="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png">
                Formats <img src="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png" alt="arrow"
                    height="7" width="12">
            </button>
            <div id="filter-format-options" class="dropdown-content">
                <label>
                    <input type="radio" name="filter-format" value="" checked> Formats
                </label>
                <?php
                $formats = get_terms(['taxonomy' => 'format', 'hide_empty' => true]);
                foreach ($formats as $format) {
                    echo "<label>
                        <input type='radio' name='filter-format' value='{$format->slug}'> {$format->name}
                      </label>";
                }
                ?>
            </div>
        </div>
    </div>
    <div class="filter-container">
        <button id="sort-by-button"
            data-arrow-image="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png">
            Trier par <img src="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png" alt="arrow"
                height="7" width="12">
        </button>
        <div id="sort-by-options" class="dropdown-content">
            <label>
                <input type="radio" name="sort-by" value="default" checked> Trier par
            </label>
            <label>
                <input type="radio" name="sort-by" value="recent-to-old"> Date récente
            </label>
            <label>
                <input type="radio" name="sort-by" value="old-to-recent"> Date ancienne
            </label>
        </div>
    </div>
</div>
<?php endif; ?>

<div id="photo-gallery" data-limit="<?php echo esc_attr($photo_limit); ?>">

    <?php if ($photo_limit !== 2): ?>
        <div id="photo-container" class="gallery-content">
            <!-- Les photos seront chargées ici via Ajax -->
        </div>
    <?php endif; ?>

    <?php if ($photo_limit === 2): ?>
        <?php
        // Récupérer la photo actuelle et sa catégorie
        $current_photo_id = get_the_ID();
        $current_category = get_the_terms($current_photo_id, 'categorie');
        $current_format = get_the_terms($current_photo_id, 'format'); // Récupérer le format
    
        if ($current_category && !is_wp_error($current_category)) {
            // Récupérer l'ID de la catégorie
            $category_id = $current_category[0]->term_id;

            // Récupérer l'ID du format
            $format_id = $current_format ? $current_format[0]->term_id : '';

            // Requête pour récupérer les photos de la même catégorie (hors photo actuelle)
            $args = array(
                'post_type' => 'photo',
                'posts_per_page' => 2, // Limiter à 2 photos
                'post__not_in' => array($current_photo_id), // Exclure la photo actuelle
                'tax_query' => array(
                    array(
                        'taxonomy' => 'categorie',
                        'field' => 'id',
                        'terms' => $category_id,
                        'operator' => 'IN',
                    ),
                    array(
                        'taxonomy' => 'format',
                        'field' => 'id',
                        'terms' => $format_id, // Ajouter un filtre pour le format si présent
                        'operator' => 'IN',
                    ),
                ),
            );

            $related_query = new WP_Query($args);

            if ($related_query->have_posts()) {
                echo '<div id="related-photos" class="gallery-content">';
                while ($related_query->have_posts()) {
                    $related_query->the_post();
                    // Récupérer les catégories et formats associés à chaque photo
                    $categories = wp_get_post_terms(get_the_ID(), 'categorie');
                    $formats = wp_get_post_terms(get_the_ID(), 'format');
                    $category_slugs = wp_list_pluck($categories, 'slug');
                    $format_slugs = wp_list_pluck($formats, 'slug');
                    ?>
                    <div class="photo-item" data-fullscreen="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>"
                        data-reference="<?php echo get_post_meta(get_the_ID(), 'reference', true); ?>"
                        data-category="<?php echo esc_attr(implode(' ', $category_slugs)); ?>"
                        data-format="<?php echo esc_attr(implode(' ', $format_slugs)); ?>">
                        <?php if (has_post_thumbnail()): ?>
                            <?php the_post_thumbnail('medium'); ?>
                        <?php else: ?>
                            <p>No thumbnail available</p>
                        <?php endif; ?>

                        <div class="photo-overlay">
                            <div class="photo-icons">
                                <div class="fullscreen-icon">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/fullscreen.png" alt="Fullscreen">
                                </div>
                                <div class="eye-icon" onclick="window.location.href='<?php the_permalink(); ?>'">
                                    <img src="<?php echo get_template_directory_uri(); ?>/images/icon-eye.png" alt="Voir">
                                </div>
                                <div class="category-title">
                                    <span class="photo-title"><?php the_title(); ?></span>
                                    <span
                                        class="photo-category"><?php echo esc_html(implode(', ', wp_list_pluck($categories, 'name'))); ?></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                }
                echo '</div>'; // Fermer #related-photos
            } else {
                echo '<p>Aucune photo similaire</p>';
            }

            wp_reset_postdata(); // Réinitialiser la requête
        } else {
            echo '<p>Aucune photo similaire</p>';
        }
        ?>
    <?php endif; ?>

    <?php if ($photo_limit !== 2): ?>
        <button id="load-more-btn">Charger plus</button>
    <?php endif; ?>
</div>

<!-- Lightbox pour afficher les images en plein écran -->
<div id="lightbox" class="lightbox">
    <div class="lightbox-content">
        <img id="lightbox-img" src="" alt="Fullscreen">
        <div class="lightbox-info">
            <div id="lightbox-reference"></div>
            <div id="lightbox-category"></div>
        </div>
        <button id="prev-photo"><span>&larr;</span> Précédent</button>
        <button id="next-photo">Suivant <span>&rarr;</span></button>
    </div>
</div>