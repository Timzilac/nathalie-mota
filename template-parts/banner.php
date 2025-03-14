<?php
<<<<<<< HEAD
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
=======

$args = array(
    'post_type' => 'photo',
    'posts_per_page' => -1,
);

$photo_posts = get_posts($args);

if (!empty($photo_posts)) {

    $random_photo_post = $photo_posts[array_rand($photo_posts)];

    $image_id = get_post_thumbnail_id($random_photo_post->ID);
    $image_medium = wp_get_attachment_image_src($image_id, 'high');

    if ($image_medium) {
        ?>
        <section class="banner">
            <img class="image-banner" src="<?php echo esc_url($image_medium[0]); ?>" alt="PHOTOGRAPHE EVENT">
            <h1 class="titre-banner">PHOTOGRAPHE EVENT</h1>
        </section>
        <?php
    }
}
?>
>>>>>>> d6f371fa4091af7ebb75545eb4a39bb22dd6764d
