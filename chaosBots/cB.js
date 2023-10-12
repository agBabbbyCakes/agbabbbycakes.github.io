
document.querySelectorAll('.gridItem').forEach(item => {
    item.addEventListener('click', function() {
        // Get the first column
        const firstColumn = document.getElementById('leftBotContainer');

        // Create a new element with the same content as the clicked item
        const newItem = document.createElement('div');
        newItem.classList.add('gridItem');
        newItem.style.backgroundColor = this.style.backgroundColor;

        // Add the new item to the first column
        firstColumn.appendChild(newItem);
    });
});


document.querySelectorAll('.gridItem img').forEach(img => {
    img.addEventListener('click', function() {
        let selectedBotImg = document.getElementById('selectedBotImg');
        let imgElement = selectedBotImg.querySelector('img');

        if (!imgElement) {
            imgElement = document.createElement('img');
            selectedBotImg.appendChild(imgElement);
        }

        imgElement.src = this.src;
    });
});