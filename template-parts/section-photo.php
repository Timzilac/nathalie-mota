<Section class="main-gallery">
    <div class="gallery-filters">
        <div class="category-format-filters">
            <div class="filter-container">
                <button id="filter-category-button"
                    data-arrow-image="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png">
                    Catégories <img src="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png"
                        alt="arrow" height="7" width="12">
                </button>
                <div id="filter-category-options" class="dropdown-content">
                    <label>
                        <input type="radio" name="filter-category" value="" checked> Catégories
                    </label>
                    <?php
                    $categories = get_terms(['taxonomy' => 'categorie', 'hide_empty' => true]);
                    foreach ($categories as $category) {
                        echo "<label>
                        <input type='radio' name='filter-category' value='{$category->slug}'> {$category->name}
                      </label>";
                    }
                    ?>
                </div>
            </div>
            <div class="filter-container">
                <button id="filter-format-button"
                    data-arrow-image="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png">
                    Formats <img src="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png" alt="arrow"
                        height="7" width="12">
                </button>
                <div id="filter-format-options" class="dropdown-content">
                    <label>
                        <input type="radio" name="filter-format" value="" checked> Formats
                    </label>
                    <?php
                    $formats = get_terms(['taxonomy' => 'format', 'hide_empty' => true]);
                    foreach ($formats as $format) {
                        echo "<label>
                        <input type='radio' name='filter-format' value='{$format->slug}'> {$format->name}
                      </label>";
                    }
                    ?>
                </div>
            </div>
        </div>
        <div class="filter-container">
            <button id="sort-by-button"
                data-arrow-image="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png">
                Trier par <img src="<?php echo get_template_directory_uri(); ?>/images/arrow-filter.png" alt="arrow"
                    height="7" width="12">
            </button>
            <div id="sort-by-options" class="dropdown-content">
                <label>
                    <input type="radio" name="sort-by" value="default" checked> Trier par
                </label>
                <label>
                    <input type="radio" name="sort-by" value="recent-to-old"> Date récente
                </label>
                <label>
                    <input type="radio" name="sort-by" value="old-to-recent"> Date ancienne
                </label>
            </div>
        </div>
    </div>

    <div id="photo-gallery">
    <div id="photo-container" class="gallery-content">
    <!-- Les photos seront chargées ici par Ajax -->
</div>

<button id="load-more-btn">Charger plus</button>

</div>
</Section>