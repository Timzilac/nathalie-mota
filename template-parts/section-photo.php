<Section class="main-gallery">

    <?php get_template_part('template-parts/filtre-photo'); ?>

    <div id="photo-gallery" data-limit="8">

        <div id="photo-container" class="gallery-content">
            <!-- Les photos seront chargées ici via Ajax -->

        </div>

        <button id="load-more-btn">Charger plus</button>

    </div>

    <?php get_template_part('template-parts/lightbox'); ?>

</Section>