<div class="post">
        <?php if (have_posts()): ?>
            <?php while (have_posts()):
                the_post(); ?>
                <div class="post-left">
                    <h1 class="post-title"><?php the_title(); ?></h1>
                    <div class="post-info">
                        <div class="reference">Référence : <?php the_field('reference'); ?></div>
                        <div class="categorie">Catégorie :
                            <?php
                            // Récupérer les termes associés au post courant pour la taxonomie 'categorie'
                            $terms = get_the_terms(get_the_ID(), 'categorie');
                            // Vérifier si des termes ont été trouvés et si aucune erreur n'est survenue
                            if ($terms && !is_wp_error($terms)) {
                                // Extraire les noms des termes à partir de l'objet des termes
                                $term_names = wp_list_pluck($terms, 'name');
                                // Afficher les noms des termes séparés par une virgule
                                echo implode(', ', $term_names);
                            }
                            ?>
                        </div>
                        <div class="format">Format :
                            <?php $terms = get_the_terms(get_the_ID(), 'format');
                            if ($terms && !is_wp_error($terms)) {
                                $term_names = wp_list_pluck($terms, 'name');
                                echo implode(', ', $term_names);
                            } ?>
                        </div>
                        <div class="type">Type : <?php echo get_post_meta(get_the_ID(), 'type', true); ?></div>
                        <div class="post-year">Année de publication : <?php echo get_the_date('Y'); ?></div>
                    </div>
                    <hr class="separator">
                </div>
                <div class="post-right">
                    <?php if (has_post_thumbnail()) { ?>
                        <div class="post-image">
                            <?php the_post_thumbnail('full'); ?>
                        </div>
                    <?php } ?>
                </div>
            </div>
            <div class="full-contact">
                <div class="left-contact">
                    <p>Cette photo vous intéresse ?</p>
                    <button id="Contact-reference" data-ref="<?php the_field('reference'); ?>">Contact</button>
                </div>
                <?php
                // Définir le Custom Post Type
                $cpt = 'photo'; // Remplacez par votre slug CPT
        
                function get_adjacent_cpt_post($direction = 'prev', $post_type = 'photo')
                {
                    global $post;
                    if (empty($post))
                        return null;

                    $order = ($direction === 'prev') ? 'DESC' : 'ASC';
                    $operator = ($direction === 'prev') ? '<' : '>';

                    $args = array(
                        'post_type' => $post_type,
                        'posts_per_page' => 1,
                        'orderby' => 'post_date',
                        'order' => $order,
                        'post_status' => 'publish',
                        'meta_query' => array(),
                        'date_query' => array(
                            array(
                                'column' => 'post_date',
                                'before' => ($direction === 'prev') ? $post->post_date : null,
                                'after' => ($direction === 'next') ? $post->post_date : null,
                                'inclusive' => false, // Exclut la photo actuelle
                            )
                        )
                    );

                    $query = new WP_Query($args);
                    return $query->have_posts() ? $query->posts[0] : null;
                }

                // Récupérer la photo précédente et suivante
                $prev_post = get_adjacent_cpt_post('prev', $cpt);
                $next_post = get_adjacent_cpt_post('next', $cpt);
                ?>

                <div class="right-contact">
                    <?php if ($prev_post): ?>
                        <a href="<?php echo get_permalink($prev_post->ID); ?>" class="nav-link prev-link"
                            data-thumbnail="<?php echo get_the_post_thumbnail_url($prev_post->ID, 'thumbnail'); ?>">
                            &larr;
                        </a>
                    <?php endif; ?>

                    <?php if ($next_post): ?>
                        <a href="<?php echo get_permalink($next_post->ID); ?>" class="nav-link next-link"
                            data-thumbnail="<?php echo get_the_post_thumbnail_url($next_post->ID, 'thumbnail'); ?>">
                            &rarr;
                        </a>
                    <?php endif; ?>

                    <div class="nav-thumbnail-preview"></div>
                </div>

                <hr class="after-contact">

                <?php wp_reset_postdata(); ?>

            </div>
        <?php endwhile; ?>
    <?php endif; ?>