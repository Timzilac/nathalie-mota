<?php get_header(); ?>
<div class="main-single">
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
            <div class="left-contact">
                <p>Cette photo vous intéresse ?</p>
                <button id="Contact-reference" data-ref="<?php the_field('reference'); ?>">Contact</button>
            </div>
        </div>
    <?php endwhile; ?>
<?php endif; ?>
</div>
<?php get_footer(); ?>