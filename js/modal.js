document.addEventListener("DOMContentLoaded", () => {
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the link that opens the modal
var contactLink = document.getElementById("contactLink");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button or the link, open the modal
btn.addEventListener("click", () => {
    modal.style.display = "block";
});
contactLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    modal.style.display = "block";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
});