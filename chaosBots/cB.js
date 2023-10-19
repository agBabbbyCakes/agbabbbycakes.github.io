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
    const botImage = document.createElement('img');
    botImage.src = bot.imgUrl;
    botImage.style.width = '50px'; // Set the width of the thumbnail
    botImage.style.height = '50px'; // Set the height of the thumbnail
    botItem.appendChild(botImage);
    botItem.innerHTML += `<p>${bot.name} - ${bot.cost}</p>`;
    selectedBots.appendChild(botItem);
    
    const removeBotButton = document.createElement('button');
    removeBotButton.innerText = 'Remove';
    botItem.appendChild(removeBotButton);
    
    removeBotButton.addEventListener('click', () => {
        const botIndex = botArmy.indexOf(bot);
        if (botIndex > -1) {
            botArmy.splice(botIndex, 1);
            totalCost -= bot.cost;
            botItem.remove();
            document.getElementById("totalCost").innerText = totalCost.toString().slice(0, 6);
        }
    });
    
    document.getElementById("totalCost").innerText = totalCost.toString().slice(0, 6);


    // Create clear all bots button
    const clearAllBotsButton = document.createElement('button');
    clearAllBotsButton.innerText = 'Clear All Bots';
    document.body.appendChild(clearAllBotsButton); // Append the button to the body or any other container

    clearAllBotsButton.addEventListener('click', () => {
        botArmy = []; // Clear the botArmy array
        totalCost = 0; // Reset the total cost
        document.getElementById("totalCost").innerText = totalCost.toString().slice(0, 6); // Update the total cost display

        // Remove all bot items from the selectedBots div
        const selectedBots = document.querySelector('.selectedBots');
        while (selectedBots.firstChild) {
            selectedBots.removeChild(selectedBots.firstChild);
        }
    });


}