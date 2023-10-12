window.onload = function() {
    fetch('chaosBots.json')
        .then(response => response.json())
        .then(bots => {
            const botTable = document.getElementById('botTable');
            bots.forEach(bot => {
                const row = botTable.insertRow();
                row.insertCell().textContent = bot.name;
                row.insertCell().textContent = bot.title;
                row.insertCell().textContent = bot.description;
                const imgCell = row.insertCell();
                const img = document.createElement('img');
                img.src = bot.imgUrl;
                imgCell.appendChild(img);
            });
        });
}