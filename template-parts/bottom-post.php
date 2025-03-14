<div class="related-photo">
    <h2>Vous aimerez aussi</h2>
    <?php
    $current_photo_id = get_the_ID();
    $current_categories = get_the_terms($current_photo_id, 'categorie');

    // Vérifier qu'il y a bien une catégorie
    $category_id = !empty($current_categories) && !is_wp_error($current_categories) ? $current_categories[0]->slug : '';
    
    // Afficher seulement si une catégorie existe
    if (!empty($category_id)) : ?>
        <div id="photo-gallery" data-limit="2" data-single="<?php echo $current_photo_id; ?>"
            data-category="<?php echo esc_attr($category_id); ?>">
            <div id="photo-container" class="gallery-content">
                <!-- Les photos seront chargées ici via Ajax -->
            </div>
        </div>
    <?php endif; ?>
    
    <?php get_template_part('template-parts/lightbox'); ?>
    
</div>
