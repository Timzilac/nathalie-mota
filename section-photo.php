<?php
get_header();
?>

<Section class="main-gallery">
    <div class="gallery-filters">
        <div class="category-format-filters">
        <select id="filter-category">
            <option value="">catégories</option>
            <?php
            $categories = get_terms(['taxonomy' => 'categorie', 'hide_empty' => true]);
            foreach ($categories as $category) {
                echo "<option value='{$category->slug}'>{$category->name}</option>";
            }
            ?>
        </select>
        
        <select id="filter-format">
            <option value=""><Fieldset></Fieldset>formats</option>
            <?php
            $formats = get_terms(['taxonomy' => 'format', 'hide_empty' => true]);
            foreach ($formats as $format) {
                echo "<option value='{$format->slug}'>{$format->name}</option>";
            }
            ?>
        </select>
        </div>
        <select id="sort-by">
            <option value="">Trier par</option>
            <option value="date_desc">Date (Récent-Ancien)</option>
            <option value="date_asc">Date (Ancien-Récent)</option>
            <option value="title_asc">Titre (A-Z)</option>
            <option value="title_desc">Titre (Z-A)</option>
        </select>
    </div>
    
    <div class="gallery-content">
        <?php
        $args = [
            'post_type'      => 'photo',
            'posts_per_page' => -1,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ];
        $photos = new WP_Query($args);
        
        if ($photos->have_posts()) :
            while ($photos->have_posts()) : $photos->the_post();
                $categories = get_the_terms(get_the_ID(), 'categorie');
                $formats = get_the_terms(get_the_ID(), 'format');
                $date = get_the_date('Y-m-d');
                ?>
                <div class="photo-item" 
                    data-category="<?php echo esc_attr(join(' ', wp_list_pluck($categories, 'slug'))); ?>" 
                    data-format="<?php echo esc_attr(join(' ', wp_list_pluck($formats, 'slug'))); ?>"
                    data-date="<?php echo esc_attr($date); ?>" 
                    data-title="<?php echo esc_attr(get_the_title()); ?>"> 
                    <div class="photo-thumbnail">
                        <?php the_post_thumbnail('high'); ?>
                    </div>
                </div>
                <?php
            endwhile;
            wp_reset_postdata();
        else :
            echo '<p>Aucune photo trouvée.</p>';
        endif;
        ?>
    </div>
</Section>

<?php get_footer(); ?>

