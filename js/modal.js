document.addEventListener("DOMContentLoaded", () => {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the close button
    var span = document.getElementsByClassName("close")[0];

    // Get the Contact-reference button
    var contactReferenceButton = document.getElementById("Contact-reference");

    // Get the contactLink button (this is the one that might not be working)
    var contactLink = document.getElementById("contactLink");

    // Get the input field in the modal
    var refPhotoInput = document.querySelector(".ref-photo");

    // Function to open the modal and fill the ref-photo input
    function openModal(refValue) {
        // Fill the input field with the value
        if (refPhotoInput) {
            refPhotoInput.value = refValue;
        }

        // Show the modal
        modal.style.display = "block";
    }

    // When the user clicks on the Contact-reference button, open the modal
    if (contactReferenceButton) {
        contactReferenceButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default behavior

            // Get the value of data-ref from the button
            var refValue = contactReferenceButton.getAttribute("data-ref");

            // Open the modal with the reference value
            openModal(refValue);
        });
    }

    // When the user clicks on the contactLink button, open the modal
    if (contactLink) {
        contactLink.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default behavior
            openModal(""); // Open the modal without a reference value
        });
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // When the user clicks on the close button, close the modal
    if (span) {
        span.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
});