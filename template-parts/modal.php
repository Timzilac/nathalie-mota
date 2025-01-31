<button id="myBtn">Nous contacter</button>

<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close"></span>
    <img src="<?php echo get_template_directory_uri(); ?>/images/contact-header.png" alt="contact-header" class="contact-header">
    <?php echo do_shortcode('[contact-form-7 id="a249bac" title="Contact-form-new"]'); ?>
  </div>
</div>