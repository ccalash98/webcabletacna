// Elementos del DOM
const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const minimizeChat = document.getElementById("minimizeChat");

// Estado inicial
let currentMenu = "main"; // Controla en qué menú o etapa está el usuario
const navigationStack = []; // Pila para guardar historial de navegación

// Mostrar el chat y ocultar el botón de la imagen
chatButton.addEventListener("click", () => {
  chatButton.style.display = "none"; // Oculta la imagen
  chatBox.style.display = "flex";   // Muestra el chat
});

// Minimizar el chat y mostrar la imagen
minimizeChat.addEventListener("click", () => {
  chatBox.style.display = "none";   // Oculta el chat
  chatButton.style.display = "block"; // Muestra la imagen
  // No se borra la conversación ni se cambia el estado actual
});

// Cerrar el chat y borrar la conversación
closeChat.addEventListener("click", () => {
  chatBox.style.display = "none";   // Oculta el chat
  chatButton.style.display = "block"; // Muestra la imagen
  chatMessages.innerHTML = ""; // Borra todos los mensajes del contenedor
  currentMenu = "main"; // Restablece el menú principal
  navigationStack.length = 0; // Limpia la pila de navegación
});

// Mostrar el chat y cargar el estado adecuado
chatButton.addEventListener("click", () => {
  chatBox.style.display = "flex"; // Muestra el chat
  chatButton.style.display = "none"; // Oculta la imagen

  if (chatMessages.innerHTML.trim() === "") {
    // Si no hay mensajes previos, mostrar el menú inicial
    showMainMenu();
  }
});


// Enviar mensaje al hacer clic en "Enviar"
sendButton.addEventListener("click", sendMessage);
// Enviar mensaje al presionar "Enter"
chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita el comportamiento por defecto (como saltos de línea)
    sendMessage();
  }
});

// Función para enviar mensaje
function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return; // Evitar mensajes vacíos
  addMessage("user", userMessage); // Mostrar el mensaje del usuario
  chatInput.value = ""; // Limpiar el campo de entrada
  handleResponse(userMessage); // Manejar la respuesta
}

// Agregar mensaje al chat
function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerHTML = text;
  chatMessages.appendChild(message);

  // Hacer scroll al final
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Manejar respuestas según la entrada del usuario
function handleResponse(input) {
  if (input === "0") {
    // Retroceder al menú anterior si existe
    if (navigationStack.length > 0) {
      currentMenu = navigationStack.pop(); // Volver al menú anterior
      showMenu(currentMenu);
    } else {
      // Si no hay historial, mostrar el menú principal
      addMessage("bot", "Ya estás en el menú principal.");
      showMainMenu();
    }
    return;
  }

  // Manejo de menús según el estado actual
  if (currentMenu === "main") {
    switch (input) {
      case "1":
        navigationStack.push("main"); // Guardar el menú actual en la pila
        currentMenu = "consulta";
        addMessage("bot", "Por favor, ingresa tu cédula para consultar tu pago.<br>\n0. Retroceder");
        break;
      case "2":
        navigationStack.push("main"); // Guardar el menú actual en la pila
        currentMenu = "pagos";
        showFormaPago();
        break;
      case "3":
          navigationStack.push("main"); // Guardar el menú actual en la pila
          currentMenu = "ubicacion";
          showUbicacion();
        break;
      case "4":
          navigationStack.push("main"); // Guardar el menú actual en la pila
          currentMenu = "asesor";
          showAsesor();
        break;
      case "5":
          navigationStack.push("main"); // Guardar el menú actual en la pila
          currentMenu = "soporte";
          showSupportMenu();
        break;
      case "Asesor Humano":
        navigationStack.push("main"); // Guardar el menú actual en la pila
        addMessage("bot", "Aquí tienes nuestros servicios:<br>\n- Desarrollo web<br>\n- Soporte técnico<br>\n0 - Retroceder");
        break;
      default:
        addMessage("bot", "Opción no válida. Por favor, selecciona una opción del menú:<br>\n0 - Retroceder");
    }
  } else if (currentMenu === "consulta") {
    // Validar que el input sea un número (cédula)
    if (!/^\d+$/.test(input)) {
      addMessage("bot", "Por favor, ingresa un número de cédula válido.<br>\n0 - Retroceder");
      return;
    }
    // Simular búsqueda de cédula
    addMessage("bot", `Buscando información para la cédula: ${input}...<br>\n0 - Retroceder`);
    currentMenu = "consulta"; // Volver automáticamente al menú principal después de consultar
    // showMainMenu();
    return;

  } else if (currentMenu === "pagos") {
    // Manejar submenú de pagos
    switch (input) {
      case "1":
        navigationStack.push("pagos"); // Guardar el menú actual en la pila
        addMessage("bot", "Fecha Limite de Pago, dia 30 - 31 de cada mes.<br>\n0. Retroceder");
        break;
      case "2":
        navigationStack.push("pagos");
        addMessage("bot", "Pago de servicios disponibles en :<br>\n AGENTES BCP CODIGO - 22832<br>\n BANCA MOVIL BCP - APLICATIVO BCP - YAPE<br>\n Solo con tu Nro de DNI<br>\n0. Retroceder");
        break;
      case "3":
        currentMenu = "main"; // Regresar al menú principal
        showMainMenu();
        break;
      default:
        addMessage("bot", "Opción no válida. Por favor, selecciona una opción del menú:<br>\n0. Retroceder");
    }
  } else if (currentMenu === "ubicacion") {
    // Manejar submenú de ubicacion
    switch (input) {
      case "1":
        navigationStack.push("ubicacion"); // Guardar el menú actual en la pila
        addMessage("bot", "Nuestros Horario de Atencion son :<br>\n Lunes a viernes Mañana 8:30 hrs a 13:30 hrs, Tarde 14:00 hrs a 17:00 hrs<br>\n Sabado 8:30hrs a 13:00hrs.<br>\n Asistente Virtual 24 Hrs<br>\n0. Retroceder");
        break;
      case "2":
        navigationStack.push("ubicacion"); // Guardar el menú actual en la pila
        addMessage(
          "bot", 
          `Haz click en las direcciones para ubicarnos<br>
           Cono Sur: <br><a href="https://maps.app.goo.gl/j4YTWSjoQZkF5dQ28" target="_blank"><b style="color: blue;">Villa El Salvador MZ. A Lote 01</b></a><br>
           Ciudad Perdida: <br><a href="https://maps.app.goo.gl/cEgHY19cqtqu4SjL7" target="_blank"><b style="color: blue;">Asoc. Los Angeles H-5</b></a><br>
           Cercado: <br><a href="https://goo.gl/maps/DwR8yvLzGDJfd5CUA" target="_blank"><b style="color: blue;">Parque Industrial Mz. J Lote 07</b></a><br>
           0. Retroceder`
        );
                break;
      case "3":
        currentMenu = "main"; // Regresar al menú principal
        showMainMenu();
        break;
      default:
        addMessage("bot", "Opción no válida. Por favor, selecciona una opción del menú:<br>\n0. Retroceder");
    }
  } else if (currentMenu === "asesor") {
    // Manejar submenú de asesor
    switch (input) {
      case "1":
        navigationStack.push("asesor"); // Guardar el menú actual en la pila
        addMessage("bot", "Comunicate Con Nosotros<br>\n0. Retroceder");
        break;
      case "2":
        navigationStack.push("asesor"); // Guardar el menú actual en la pila
        addMessage("bot", "Comunicate con uno de nuestros asesores<br>\n0. Retroceder");
        break;
      case "3":
        currentMenu = "main"; // Regresar al menú principal
        showMainMenu();
        break;
      default:
        addMessage("bot", "Opción no válida. Por favor, selecciona una opción del menú:<br>\n0. Retroceder");
    }
  } else if (currentMenu === "soporte") {
    // Manejar submenú de soporte técnico
    switch (input) {
      case "1":
        navigationStack.push("soporte"); // Guardar el menú actual en la pila
        addMessage("bot", "Por favor, describe tu problema técnico.<br>\n0. Retroceder");
        break;
      case "2":
        navigationStack.push("soporte"); // Guardar el menú actual en la pila
        addMessage("bot", "Para consultas de facturación, contacta a soporte@empresa.com.<br>\n0. Retroceder");
        break;
      case "3":
        currentMenu = "main"; // Regresar al menú principal
        showMainMenu();
        break;
      default:
        addMessage("bot", "Opción no válida. Por favor, selecciona una opción del menú:<br>\n0. Retroceder");
    }
  }
}

// Mostrar el menú principal
function showMainMenu() {
  addMessage(
    "bot",
    "Digita el nro que deseas consultar 😊 <br>\n1. Consulta de pago 🪙<br>\n2. Forma de Pago🪙<br>\n3. Horarios - Ubicacion 🏠<br>\n4. Contactate Con un Asesor 🙋‍♂️<br>\n5. Soporte Tecnico 🧑‍🔧"
  );
}
// Mostrar el submenú de Forma de pagos
function showFormaPago() {
  addMessage(
    "bot",
    "Estás en el menú de Forma de Pagos. Selecciona una opción:<br>\n1. Fecha de Pagos<br>\n2. Codigo y Formas de Pago<br>\n3. Volver al menú principal<br>\n0. Retroceder"
  );
}
// Mostrar el submenú de ubicaciones
function showUbicacion() {
  addMessage(
    "bot",
    "Estás en el menú de Informacion. Selecciona una opción:<br>\n1. Horarios<br>\n2. Ubicacion de Oficinas<br>\n3. Volver al menú principal<br>\n0. Retroceder"
  );
}
// Mostrar el submenú de Asesor
function showAsesor() {
  addMessage(
    "bot",
    "Estás en el menú de Atencion Al Cliente. Selecciona una opción:<br>\n1. Central Telefonica<br>\n2. habla con uno de nuestros Asesores<br>\n3. Volver al menú principal<br>\n0. Retroceder"
  );
}
// Mostrar el submenú de soporte técnico
function showSupportMenu() {
  addMessage(
    "bot",
    "Estás en el menú de soporte técnico. Selecciona una opción:<br>\n1. Problemas técnicos<br>\n2. Consultas sobre facturación <br>\n3. Volver al menú principal<br>\n0. Retroceder"
  );
}

// Mostrar el menú actual
function showMenu(menu) {
  if (menu === "main") {
    showMainMenu();
  }  else if (menu === "pagos") {
    showFormaPago();
  } else if (menu === "ubicacion") {
    showUbicacion();
  } else if (menu === "asesor") {
    showAsesor();
  } else if (menu === "soporte") {
    showSupportMenu();
  }
}
 //aqui realizaremos la funcion de consulta:
 
async function fetchFromExcel(cedula) {
  try {
    const response = await fetch("http://localhost:3000/consulta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cedula }),
    });

    const result = await response.json();
    if (result.success) {
      const { data } = result;
      return `Nombre: ${data.Nombre}, Cédula: ${data.Cédula}, Otros datos: ${data.Otros || "N/A"}`;
    } else {
      return result.message || "No se encontraron datos.";
    }
  } catch (error) {
    console.error("Error al consultar el servidor:", error);
    return "Ocurrió un error al realizar la consulta.";
  }
}
