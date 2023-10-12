window.onload = function() {
    // Get all grid items
    var gridItems = document.querySelectorAll('.gridItem');

    // Add click event listener to each grid item
    gridItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Get the source of the clicked image
            var imgSrc = this.querySelector('img').src;

            // Set the source of the image with id "swap" to the clicked image source
            document.getElementById('swap').src = imgSrc;
        });
    });
}