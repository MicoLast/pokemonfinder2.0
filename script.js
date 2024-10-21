document.getElementById("fetchButton").addEventListener("click", fetchData);
document.getElementById("shareButton").addEventListener("click", shareData);

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        
        displayData(data, speciesData);
    } catch (error) {
        console.error(error);
        document.getElementById("result").textContent = "Error: " + error.message;
        document.getElementById("pokemonImage").style.display = "none";
    }
}

function displayData(data, speciesData) {
    const resultElement = document.getElementById("result");
    const flavorTextEntries = speciesData.flavor_text_entries;
    const englishDescription = flavorTextEntries.find(entry => entry.language.name === "en").flavor_text;

    
    resultElement.innerHTML = `
        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
        <p>${englishDescription}</p>
    `;

    const pokemonImage = document.getElementById("pokemonImage");
    pokemonImage.src = data.sprites.front_default;
    pokemonImage.alt = data.name;
    pokemonImage.style.display = "block";
}

async function shareData() {
    const jsonData = {
        "name": "Pickau",
        "description": "A quirky inventor with a passion for gadgets and gizmos.",
        "age": 32,
        "occupation": "Inventor",
    };

    try {
        const response = await fetch("https://mseufeduph.webhook.office.com/webhookb2/8ef714f6-81de-4b42-ad2e-c262d5ce04d1@ddedb3cc-596d-482b-8e8c-6cc149a7a7b7/IncomingWebhook/9ef0b875219140eb8135437505a9d31c/e0510d66-17c3-43f4-a3ef-0cf6a6fba189/V24duT1GXj0kuDCkgbXHPSG6tCe2ZunOnaM30gWrZrYuo1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            throw new Error('Failed to send data');
        }

        console.log('Data sent successfully!');
        alert('Data shared sucessfully!');
    } catch (error) {
        console.error(error);
        alert('Error sharing data: ' + error.message);
    }
}

