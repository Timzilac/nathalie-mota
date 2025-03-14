<?php
$image = get_page_by_title('timothe', OBJECT, 'attachment'); 
$image_medium = $image ? wp_get_attachment_image_src($image->ID, 'high') : false;
?>

<section id="a-propos" class="a-propos">
    <div class="image-title">
        <h3>À propos de moi</h3>
    </div>
    <div class="photo-description">
        <div class="my-photo">
            <img class="image-banner" src="<?php echo esc_url($image_medium[0]); ?>" alt="Lacoste Timothé">
        </div>
        <div class="description">
            <p><span class="first-letter">J</span>e suis <strong>Timothé Lacoste</strong>, développeur web passionné,
                spécialisé dans la création de sites web
                performants et modernes. Actuellement, je travaille en tant que Freelance à temps plein
                pour
                l'entreprise <span class="tooltip">
                    <a href="https://nucleusstrategie.com/fr" target="_blank">Nucléus Stratégie
                        <img src="https://nucleusstrategie.com/opengraph-image.jpeg?4a659e5a38129f7f"
                            alt="Aperçu du site">
                    </a>
                </span> en
                tant que <strong>Coordinateur au développement web</strong>.
            </p>
            <p>Fort d'une expérience internationale et d'une grande capacité d'adaptation, je maîtrise des outils comme
                <strong>Sanity</strong>, <strong>WordPress</strong>, <strong>Shopify</strong>, <strong>Liquid</strong>,
                <strong>PHP</strong>, <strong>JavaScript</strong>, <strong>JQuery</strong>, <strong>Elementor</strong>
                et bien
                d'autres. Mon
                objectif
                est de créer des expériences web intuitives, design et adaptées aux besoins des entreprises.
            </p>
            <div class="formation">OpenClassrooms</div>
            <div class="competence">
                <ul class="left">
                    <li><img src="<?php echo get_template_directory_uri(); ?>/images/logo-tim.png"
                            alt="Logo de Timothé Lacoste">Création de sites WordPress efficaces</li>
                    <li><img src="<?php echo get_template_directory_uri(); ?>/images/logo-tim.png"
                            alt="Logo de Timothé Lacoste">Gutenberg, Elementor</li>
                    <li><img src="<?php echo get_template_directory_uri(); ?>/images/logo-tim.png"
                            alt="Logo de Timothé Lacoste">Personnaliser des thèmes et des plugins</li>
                    <li><img src="<?php echo get_template_directory_uri(); ?>/images/logo-tim.png"
                            alt="Logo de Timothé Lacoste">Optimiser des sites existants</li>
                </ul>
                <ul class="right">
                    <li><img src="<?php echo get_template_directory_uri(); ?>/images/logo-tim.png"
                            alt="Logo de Timothé Lacoste">Créer des sites complexes en HTML, CSS, PHP,JavaScript et
                        JQuery</li>
                    <li><img src="<?php echo get_template_directory_uri(); ?>/images/logo-tim.png"
                            alt="Logo de Timothé Lacoste">Gérer un projet web de A à Z</li>
                    <li><img src="<?php echo get_template_directory_uri(); ?>/images/logo-tim.png"
                            alt="Logo de Timothé Lacoste">Figma</li>
                    <li><img src="<?php echo get_template_directory_uri(); ?>/images/logo-tim.png"
                            alt="Logo de Timothé Lacoste">Xamp ou Local</li>
                </ul>
            </div>
            <p>Cette expertise me permet aujourd'hui d'accompagner mes clients dans la réalisation de leurs projets web,
                qu'il s'agisse de <strong>création de sites vitrine</strong>, <strong>développement de boutiques en
                    ligne</strong> ou encore <strong>optimisation de sites existants</strong>. Mon objectif principal
                est de proposer des solutions web
                performantes, adaptées aux besoins spécifiques de chaque entreprise.</p>

        </div>
    </div>
</section>