<div class="related-photo">
    <h2>Vous aimerez aussi</h2>
    <?php
    $current_photo_id = get_the_ID();
    $current_category = get_the_terms($current_photo_id, 'categorie');
    $category_id = $current_category[0]->term_id;
    ?>

    <div id="photo-gallery" data-limit="2" data-single="<?php echo $current_photo_id; ?>"
        data-category="<?php echo $category_id; ?>">

        <div id="photo-container" class="gallery-content">
            <!-- Les photos seront chargées ici via Ajax -->

        </div>
    </div>
    
    <?php get_template_part('template-parts/lightbox'); ?>
    
</div>