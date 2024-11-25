/*---------------------------------------------------------------------
    File Name: whatsapp.var.js
---------------------------------------------------------------------*/
// Variable para almacenar la última URL utilizada
let lastUrl = "";

// Seleccionar todos los enlaces con la clase "randomLink"
document.querySelectorAll('.randomLink').forEach(function(element) {
    element.addEventListener('click', function(e) {
        e.preventDefault(); // Evita la acción predeterminada del enlace

        // Lista de URLs
        var urls = [
            "https://api.whatsapp.com/send?phone=51900006000&text=Deseo%20más%20información%20de%20los%20servicios%20de%20Cable%20Tacna",
            "https://api.whatsapp.com/send?phone=51900007000&text=Deseo%20más%20información%20de%20los%20servicios%20de%20Cable%20Tacna",
            "https://api.whatsapp.com/send?phone=51900008000&text=Deseo%20más%20información%20de%20los%20servicios%20de%20Cable%20Tacna"
        ];

        var randomUrl = "";

        // Seleccionar una URL aleatoria que no sea igual a la última utilizada
        do {
            randomUrl = urls[Math.floor(Math.random() * urls.length)];
        } while (randomUrl === lastUrl);

        // Actualizar la última URL seleccionada
        lastUrl = randomUrl;

        // Abrir la URL en una nueva pestaña
        window.open(randomUrl, '_blank');
    });
});
