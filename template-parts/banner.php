<?php
$image = get_page_by_title('nathalie-11-scaled', OBJECT, 'attachment'); // Recherche par titre
$image_medium = $image ? wp_get_attachment_image_src($image->ID, 'high') : false;
?>

<section class="banner">
    <img class="image-banner" src="<?php echo esc_url($image_medium[0]); ?>" alt="PHOTOGRAPHE EVENT">
    <h1 class="titre-banner">PHOTOGRAPHE EVENT</h1>
</section>