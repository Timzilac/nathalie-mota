<div class="photo-item" data-fullscreen="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>"
    data-reference="<?php echo get_post_meta(get_the_ID(), 'reference', true); ?>">
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
                <span class="photo-category">
                    <?php
                    $categories = wp_get_post_terms(get_the_ID(), 'categorie');
                    echo !empty($categories) ? esc_html($categories[0]->name) : 'Sans catégorie';
                    ?>
                </span>
            </div>
        </div>
    </div>
</div>