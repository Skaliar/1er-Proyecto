
const url = "http://localhost:4000/api/json"; 

jsonForm.addEventListener("submit", (e) => {
    e.preventDefault();
    grabar(e);
});

window.addEventListener("DOMContentLoaded", () => {
    // Llamar a la función para mostrar datos al cargar la página
    mostrarDatosEnPagina();
});

let label = document.getElementById("prueba")

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
            console.log(data);
        })
        .catch((error) => {
            console.error(error); // Imprime el error en la consola
            label.value = `Error: ${error.message}`
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

        const tabla = document.createElement("table");
        tabla.classList.add("tabla-datos");

        const encabezado = document.createElement("thead");
        const encabezadoHTML = "<tr><th>Nombre</th><th>Celular</th><th>Email</th><th>Mensaje</th></tr>";
        encabezado.innerHTML = encabezadoHTML;

        tabla.appendChild(encabezado);

        // Agregar filas de datos
        const cuerpoTabla = document.createElement("tbody");

        data.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td><p>${item.name}</p></td>
            <td><p>${item.telefono}</p></td>
            <td><p>${item.mail}</p></td>
            <td><p class="pMensaje">${item.mensaje}</p></td>`;
            cuerpoTabla.appendChild(fila);
        });

        tabla.appendChild(cuerpoTabla);
        container.appendChild(tabla);
        
    } 
    catch (error) {
        console.error("Error al obtener y mostrar datos:", error);
    }
}