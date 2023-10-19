// Sample bot data. Replace this with your JSON data.
const botData = [
    /* ... Your JSON data ... */
];

// Handle bot selection and updates
let botArmy = [];
let totalCost = 0;

function updateBotDetails(bot) {
    document.getElementById("swap").src = bot.imgUrl;
    const chosenBotDetails = `
        <h3>${bot.name}</h3>
        <p>${bot.description}</p>
        <p>Cost: ${bot.cost}</p>
    `;
    document.getElementById("chosenBotDetails").innerHTML = chosenBotDetails;
}

function addToBotArmy(bot) {
    botArmy.push(bot);
    totalCost += bot.cost;
    
    const selectedBots = document.querySelector('.selectedBots');
    const botItem = document.createElement('div');
    botItem.innerHTML = `<p>${bot.name} - ${bot.cost}</p>`;
    selectedBots.appendChild(botItem);
    
    document.getElementById("totalCost").innerText = totalCost;
}

document.addEventListener('DOMContentLoaded', () => {
    const botGridContainer = document.getElementById('botGridContainer');
    
    // Populate bot grid
    botData.forEach(bot => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('gridItem');
        const botImage = document.createElement('img');
        botImage.src = bot.imgUrl;
        
        gridItem.appendChild(botImage);
        botGridContainer.appendChild(gridItem);

        // Handle click event for each bot
        gridItem.addEventListener('click', () => {
            updateBotDetails(bot);
            
            const addBotButton = document.getElementById("addBotButton");
            addBotButton.onclick = () => addToBotArmy(bot);
        });
    });
});
