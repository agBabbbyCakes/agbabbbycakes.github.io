let botData = [];

// Fetch bot data from JSON file
fetch('chaosBots.json')
    .then(response => response.json())
    .then(bots => {
        botData = bots;
        populateBotGrid();
    })
    .catch(error => console.error('Error:', error));

// Function to populate bot grid
function populateBotGrid() {
    const botGridContainer = document.getElementById('botGridContainer');
    
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
}

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