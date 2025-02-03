document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("filter-category");
    const formatFilter = document.getElementById("filter-format");
    const sortBy = document.getElementById("sort-by");
    const photosContainer = document.querySelector(".gallery-content");
    const allPhotos = Array.from(document.querySelectorAll(".photo-item"));
    let displayedPhotos = [...allPhotos];

    const loadMoreBtn = document.createElement("button");
    const loadLessBtn = document.createElement("button");
    loadMoreBtn.textContent = "Charger plus";
    loadLessBtn.textContent = "Charger moins";
    loadMoreBtn.classList.add("load-more-btn");
    loadLessBtn.classList.add("load-less-btn");

    function updatePhotoDisplay(limit) {
        displayedPhotos.forEach((photo, index) => {
            photo.style.display = index < limit ? "block" : "none";
        });

        if (displayedPhotos.length > 8) {
            photosContainer.after(loadMoreBtn);
            loadMoreBtn.style.display = limit < displayedPhotos.length ? "block" : "none";
            loadLessBtn.style.display = limit === displayedPhotos.length ? "block" : "none";
        } else {
            loadMoreBtn.style.display = "none";
            loadLessBtn.style.display = "none";
        }
    }

    loadMoreBtn.addEventListener("click", function () {
        updatePhotoDisplay(displayedPhotos.length);
        loadMoreBtn.after(loadLessBtn);
    });

    loadLessBtn.addEventListener("click", function () {
        updatePhotoDisplay(8);
    });

    function filterPhotos() {
        const category = categoryFilter.value;
        const format = formatFilter.value;

        displayedPhotos = allPhotos.filter(photo => {
            const matchesCategory = !category || photo.dataset.category.includes(category);
            const matchesFormat = !format || photo.dataset.format.includes(format);
            return matchesCategory && matchesFormat;
        });

        photosContainer.innerHTML = "";
        displayedPhotos.forEach(photo => photosContainer.appendChild(photo));
        sortPhotos(); // Appliquer le tri après le filtrage
    }

    function sortPhotos() {
        let sortValue = sortBy.value;

        // Si aucun tri n'est sélectionné, appliquer "date_desc" par défaut
        if (!sortValue) {
            sortValue = "date_desc";
        }

        displayedPhotos.sort((a, b) => {
            if (sortValue === "date_asc") {
                return new Date(a.dataset.date) - new Date(b.dataset.date);
            } else if (sortValue === "date_desc") {
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            }
            return 0;
        });

        photosContainer.innerHTML = "";
        displayedPhotos.forEach(photo => photosContainer.appendChild(photo));
        updatePhotoDisplay(8);
    }

    categoryFilter.addEventListener("change", filterPhotos);
    formatFilter.addEventListener("change", filterPhotos);
    sortBy.addEventListener("change", sortPhotos);

    filterPhotos(); // Filtrer et trier les photos dès le chargement
});
