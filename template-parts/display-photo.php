<div class="photo-item" data-fullscreen="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>"
    data-title="<?php echo get_the_title(); ?>">
    <?php if (has_post_thumbnail()): ?>
        <div class="overlay">
            <?php the_post_thumbnail('medium'); ?>
            <div class="project-title">
                <h3><?php the_title(); ?></h3>
            </div>
        </div>
    <?php endif; ?>
    <div class="photo-overlay">
        <div class="photo-icons">
            <div class="fullscreen-icon">
                <img src="<?php echo get_template_directory_uri(); ?>/images/fullscreen.png" alt="Fullscreen">
            </div>
        </div>
    </div>
</div>