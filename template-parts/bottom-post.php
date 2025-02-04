<div class="related-photo">
    <h2>Vous aimerez aussi</h2>
    <div class="related-photo-container">
        <?php
        // Obtenir la catégorie de l'article actuel
        $terms = wp_get_post_terms(get_the_ID(), 'categorie'); // Remplacez 'categorie' par le nom de votre taxonomie si nécessaire
        if (!empty($terms)) {
            $term_ids = array();
            foreach ($terms as $term) {
                $term_ids[] = $term->term_id;
            }

            // Query pour récupérer les autres articles dans la même catégorie
            $args = array(
                'post_type' => 'photo', // Le type de contenu personnalisé pour les photos
                'posts_per_page' => 2, // Nombre d'articles à afficher
                'post__not_in' => array(get_the_ID()), // Exclure l'article actuel
                'tax_query' => array(
                    array(
                        'taxonomy' => 'categorie', // Taxonomie pour la catégorie (vérifiez le nom exact)
                        'field' => 'id',
                        'terms' => $term_ids,
                        'operator' => 'IN',
                    ),
                ),
            );
            $related_query = new WP_Query($args);

            // Afficher les résultats
            if ($related_query->have_posts()):
                while ($related_query->have_posts()):
                    $related_query->the_post();
                    ?>
                    <div class="photo-item">
                        <a href="<?php the_permalink(); ?>">
                            <?php if (has_post_thumbnail()): ?>
                                <?php the_post_thumbnail('high'); ?>
                            <?php endif; ?>
                        </a>
                    </div>
                    <?php
                endwhile;
            else:
                echo '<p>Aucune photo similaire trouvée.</p>';
            endif;

            // Reset postdata
            wp_reset_postdata();
        }
        ?>
    </div>
</div>