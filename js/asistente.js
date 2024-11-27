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
});

// Cerrar el chat y borrar la conversación
closeChat.addEventListener("click", () => {
  chatBox.style.display = "none";   // Oculta el chat
  chatButton.style.display = "block"; // Muestra la imagen
  // Puedes agregar lógica adicional si necesitas limpiar mensajes
});

// Enviar mensaje al presionar "Enter"
chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Enviar mensaje al hacer clic en "Enviar"
sendButton.addEventListener("click", sendMessage);

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
  message.innerText = text;
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
        addMessage("bot", "Por favor, ingresa tu cédula para consultar tu pago.\n0 - Retroceder");
        break;
      case "2":
        navigationStack.push("main"); // Guardar el menú actual en la pila
        currentMenu = "soporte";
        showSupportMenu();
        break;
      case "3":
        addMessage("bot", "Aquí tienes nuestros servicios:\n- Desarrollo web\n- Soporte técnico\n0 - Retroceder");
        break;
      default:
        addMessage("bot", "Opción no válida. Por favor, selecciona una opción del menú:\n0 - Retroceder");
    }
  } else if (currentMenu === "consulta") {
    // Validar que el input sea un número (cédula)
    if (!/^\d+$/.test(input)) {
      addMessage("bot", "Por favor, ingresa un número de cédula válido.\n0 - Retroceder");
      return;
    }

    // Simular búsqueda de cédula
    addMessage("bot", `Buscando información para la cédula: ${input}...\n0 - Retroceder`);
    currentMenu = "main"; // Volver automáticamente al menú principal después de consultar
    showMainMenu();
  } else if (currentMenu === "soporte") {
    // Manejar submenú de soporte técnico
    switch (input) {
      case "1":
        navigationStack.push("soporte"); // Guardar el menú actual en la pila
        addMessage("bot", "Por favor, describe tu problema técnico.\n0 - Retroceder");
        break;
      case "2":
        addMessage("bot", "Para consultas de facturación, contacta a soporte@empresa.com.\n0 - Retroceder");
        break;
      case "3":
        currentMenu = "main"; // Regresar al menú principal
        showMainMenu();
        break;
      default:
        addMessage("bot", "Opción no válida. Por favor, selecciona una opción del menú:\n0 - Retroceder");
    }
  }
}

// Mostrar el menú principal
function showMainMenu() {
  addMessage(
    "bot",
    "Bienvenido al chat, selecciona una opción:\n1 - Consultar mi pago\n2 - Soporte técnico\n3 - Conocer servicios"
  );
}

// Mostrar el submenú de soporte técnico
function showSupportMenu() {
  addMessage(
    "bot",
    "Estás en el menú de soporte técnico. Selecciona una opción:\n1 - Problemas técnicos\n2 - Consultas sobre facturación\n3 - Volver al menú principal\n0 - Retroceder"
  );
}

// Mostrar el menú actual
function showMenu(menu) {
  if (menu === "main") {
    showMainMenu();
  } else if (menu === "soporte") {
    showSupportMenu();
  }
}
