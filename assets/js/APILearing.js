const dogImage = document.getElementById("HCJA9-dogImage");

    async function getDog(){
        try{
            const response = await fetch("https://api.thedogapi.com/v1/images/search");
            const data = await response.json();
            dogImage.src = data[0].url;
        }catch(error){
            alert("Failed to fetch image");
        }
    }

    // Load one image on start
    getDog();
const image = document.getElementById("HCJA9-pokemonImage");
const info = document.getElementById("pokemonInfo");
const codeBlock = document.querySelector(".HCJA9-code");

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

/* Random Pokémon */
async function getPokemon(){

    const randomId = Math.floor(Math.random() * 1010) + 1;

    try{
        const response = await fetch(API_URL + randomId);
        const data = await response.json();

        /* Better Official Image */
        image.src = data.sprites.other["official-artwork"].front_default 
                    || data.sprites.front_default;

        /* Pokémon Info */
        info.innerHTML = `
            <h3 style="margin-bottom:10px;">${data.name.toUpperCase()} (#${data.id})</h3>

            <p><strong>Type:</strong> 
                ${data.types.map(t => t.type.name).join(", ")}
            </p>

            <p><strong>Height:</strong> ${data.height}</p>

            <p><strong>Weight:</strong> ${data.weight}</p>

            <p><strong>Base Experience:</strong> ${data.base_experience}</p>
        `;

    }catch(error){
        info.innerHTML = "<p style='color:red;'>Error loading Pokémon</p>";
    }
}

/* Copy Code */
function copyCode(button){
    if(!codeBlock) return;
    navigator.clipboard.writeText(codeBlock.textContent);
    button.innerText = "Copied!";
    setTimeout(()=> button.innerText="Copy",2000);
}

/* Load one Pokémon on page load */
getPokemon();
const HCJA11image = document.getElementById("HCJA11-animeImage");
const HCJA11info = document.getElementById("HCJA11-animeInfo");
const HCJA11codeBlock = document.querySelector(".HCJA11-code");

const HCJA11API_URL = "https://api.jikan.moe/v4/characters/";

/* Random Character */
async function getCharacter(){

    const randomId = Math.floor(Math.random() * 20000) + 1;

    try{
        const response = await fetch(HCJA11API_URL + randomId);
        const data = await response.json();

        HCJA11image.src = data.data.images.jpg.image_url;

        HCJA11info.innerHTML = `
            <h3>${data.data.name}</h3>
            <p><strong>Favorites:</strong> ${data.data.favorites}</p>
            <p><strong>About:</strong> ${
                data.data.about 
                ? data.data.about.substring(0,150) + "..."
                : "No description available"
            }</p>
        `;

    }catch(error){
        alert("Error loading character");
    }
}

/* Copy Code */
function copyCode(button){
    navigator.clipboard.writeText(HCJA11codeBlock.textContent);
    button.innerText = "Copied!";
    setTimeout(()=> button.innerText="Copy",2000);
}

/* Load one character on page load */
getCharacter();