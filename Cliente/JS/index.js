
const url = "http://localhost:4000/api/json"; 

jsonForm.addEventListener("submit", (e) => {
    e.preventDefault();
    grabar(e);
});

window.addEventListener("DOMContentLoaded", () => {
    // Llamar a la función para mostrar datos al cargar la página
    mostrarDatosEnPagina();
});

let label = document.getElementById("error")

async function grabar(e) {
    
    nombre = document.getElementById("Nombre").value;
    telefono = document.getElementById("Celular").value;
    mail = document.getElementById("Email").value;
    mensaje = document.getElementById("Mensaje").value;
    


    const data = {
        id: 0,
        Nombre: nombre,
        Celular: telefono,
        Email: mail,
        Mensaje: mensaje,
    };

    let sendMethod = "POST";
    let api = url;

    console.log(JSON.stringify(data))
    await fetch(api, {
        method: sendMethod,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            label.textContent = JSON.stringify(data.message)
            console.log(data);
            if(label.textContent.length > 0)
            {
                //label.textContent = ""
                document.getElementById("Nombre").value = ""
                document.getElementById("Celular").value = ""
                document.getElementById("Email").value = ""
                document.getElementById("Mensaje").value = ""
            }
        })
        .catch((error) => {
            console.log(error)
            label.textContent = `Error: ${error.message}`
            
})}



async function mostrarDatosEnPagina(e) {
        try {
            // Obtener datos desde el servidor
            const response = await fetch(url, {
                method: "GET",
            });
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
    
            const data = await response.json();
    
            // Generar estructura HTML
            const container = document.getElementById("datosContainer");
            container.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos elementos
    
            const lista = document.createElement("ul");
            const prueba = document.createElement("div")
            lista.classList.add("lista-datos");
    
            // Agregar elementos de lista
            data.forEach((item) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <p><strong>Nombre:</strong> ${item.name}</p>
                    <p><strong>Celular:</strong> ${item.telefono}</p>
                    <p><strong>Email:</strong> ${item.mail}</p>
                    <p class="pMensaje"><strong>Mensaje:</strong> ${item.mensaje}</p><br>
                `;
                prueba.appendChild(listItem)
                lista.appendChild(prueba);
            });
    
            container.appendChild(lista);
            
        } 
        catch (error) {
            console.error("Error al obtener y mostrar datos:", error);
        }
}