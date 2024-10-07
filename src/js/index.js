import { Campeon } from "./campeon.js";

const DOM = {
    boton: document.getElementById('boton'),
    campeones: document.getElementById('campeones'),
    imagen: document.querySelector('.portada'),
    
};

let campeonesData = {}; 

boton.addEventListener('click', mostrarCampeones);

async function getCampeones() {
    const url = "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json";
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        campeonesData = datos.data; 
        return campeonesData;
    } catch (error) {
        console.log(error.message);
    }
}

function mostrarCampeones() {
    DOM.boton.style.display = 'none';
    DOM.imagen.style.display = 'none';
    getCampeones().then((datos) => {
        mostrarInformacion(datos);
    }).then(() => {
        let info = document.querySelectorAll('.carta');
        info.forEach((a) => {
            a.addEventListener('click', () => {
                mostrarInfo(a.id);
            });
        });
    });
}

function mostrarInformacion(datos) {
    const result = Object.values(datos);
    result.forEach((champ) => {
        let campeon = new Campeon(champ);
        DOM.campeones.innerHTML += `
        <div class="carta" id="${campeon.name}">
            <img class="imagen" src=${campeon.imagen}>
            <div class="nombre">${campeon.name}</div>
        </div>`;
    });
}

function mostrarInfo(id) {
    const champData = campeonesData[id];
    if (!champData) {
        console.error('Campeón no encontrado');
        return; 
    }

    const campeon = new Campeon(champData); 

    
    const splashDiv = document.createElement('div');
    splashDiv.classList.add('splash-fullscreen');

    
    splashDiv.innerHTML = `
        <img src="${campeon.splasArt}" alt="${campeon.name}">
        <div class="titulo-campeon">${campeon.titulo}</div> <!-- Título del campeón -->
    `;

  
    document.body.appendChild(splashDiv);

   
    splashDiv.addEventListener('click', (event) => {
        if (event.target === splashDiv) {
            splashDiv.remove(); 
        }
    });
}
