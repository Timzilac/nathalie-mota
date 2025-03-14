<?php
$image = get_page_by_title('banner-image', OBJECT, 'attachment'); // Recherche par titre
$image_medium = $image ? wp_get_attachment_image_src($image->ID, 'high') : false;
?>
<section class="banner">
    <img class="image-banner" src="<?php echo esc_url($image_medium[0]); ?>" alt="Lacoste Timothé" height="400px"
        width="1440px">
    <div class="title-sub-banner">
        <h1 class="titre-banner">Timothé Lacoste</h1>
        <h2 class="sub-banner">Développeur web</h2>
    </div>
</section>