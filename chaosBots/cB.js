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

    // Get the ADD BOT button
    var addBotButton = document.getElementById('addBotButton');

    // Add click event listener to the ADD BOT button
    addBotButton.addEventListener('click', function() {
        // Create a new img element
        var newImg = document.createElement('img');

        // Set the src of the new img to the src of the image with id "swap"
        newImg.src = document.getElementById('swap').src;

        // Set the class of the new img
        newImg.className = 'selectedBotThumbnail';

        // Append the new img to the div with class "selectedBots"
        document.querySelector('.selectedBots').appendChild(newImg);
    });
}