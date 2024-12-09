document.addEventListener('DOMContentLoaded', function() {
    // Función para verificar la edad del usuario
    function verificarEdad() {
        const day = prompt("Ingrese su día de nacimiento (DD):");
        const month = prompt("Ingrese su mes de nacimiento (MM):");
        const year = prompt("Ingrese su año de nacimiento (AAAA):");

        // Validar entradas
        if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
            alert("Debe ingresar una fecha de nacimiento válida.");
            return verificarEdad();
        }

        const birthDate = new Date(year, month - 1, day); // Mes - 1 porque los meses en JS son 0-11
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Ajustar la edad si aún no ha pasado su cumpleaños este año
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age >= 18) {
            alert("Acceso concedido. Bienvenido!");
            // Mostrar el contenido principal del sitio
            document.getElementById('main-content').style.display = 'block';
        } else {
            alert("Acceso denegado. Debe ser mayor de 18 años para acceder a este sitio.");
            // Ocultar el contenido principal del sitio
            document.getElementById('main-content').style.display = 'none';
            return verificarEdad(); // Volver a pedir la fecha
        }
    }

    // Inicialmente ocultar el contenido principal del sitio
    document.getElementById('main-content').style.display = 'none';

    // Verificar la edad del usuario
    verificarEdad();
});

async function obtenerDatos() {
    try {
        const response = await fetch('https://jscriptcouse-default-rtdb.firebaseio.com/tragos.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const cardDeck = document.getElementById('card-deck');
        cardDeck.innerHTML = ''; 

        for (let key in data) {  
            const objeto = data[key]; 

            const card = document.createElement('div');  
            card.classList.add('card');

            const imagen = document.createElement('img');
            imagen.classList.add('card-img-top');
            imagen.src = objeto.imagen;
            imagen.alt = objeto.nombre; // Mejora de accesibilidad

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const titulo = document.createElement('h5');
            titulo.classList.add('card-title');
            titulo.textContent = objeto["nombre"];

            const ingrediente = document.createElement('p'); 
            ingrediente.classList.add('card-text'); 
            ingrediente.textContent = objeto["ingredienteppal"];

            const buttonReceta = document.createElement('button'); 
            buttonReceta.textContent = 'Receta';
            buttonReceta.classList.add('btn', 'btn-secondary'); 
            buttonReceta.onclick = () => {
                window.location.href = objeto.linkreceta;             };
             
            cardBody.appendChild(titulo);
            cardBody.appendChild(ingrediente);
            cardBody.appendChild(buttonReceta)
            
            card.appendChild(imagen);
            card.appendChild(cardBody);

            cardDeck.appendChild(card);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setTimeout(obtenerDatos, 5000);
    }
}

obtenerDatos();