// Elementos del DOM
const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

// Estado inicial del menú
let currentMenu = "main"; // Controla en qué menú o etapa está el usuario

// Mostrar/Ocultar la ventana del chat
chatButton.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
});

// Cerrar el chat
closeChat.addEventListener("click", () => {
  chatBox.style.display = "none";
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
  if (userMessage) {
    addMessage("user", userMessage); // Mostrar el mensaje del usuario
    chatInput.value = ""; // Limpiar el campo de entrada
    handleResponse(userMessage); // Manejar la respuesta
  }
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
    // Retroceder al menú principal
    currentMenu = "main";
    showMainMenu();
    return;
  }

  if (currentMenu === "main") {
    switch (input) {
      case "1":
        currentMenu = "consulta";
        addMessage("bot", "Por favor, ingresa tu cédula para consultar tu pago.\n0 - Retroceder");
        break;
      case "2":
        addMessage("bot", "Conectándote con soporte técnico, por favor espera...\n0 - Retroceder");
        break;
      case "3":
        addMessage("bot", "Aquí tienes nuestros servicios:\n- Desarrollo web\n- Soporte técnico\n0 - Retroceder");
        break;
      default:
        addMessage("bot", "Opción no válida. Por favor, selecciona una opción del menú:\n0 - Retroceder");
    }
  } else if (currentMenu === "consulta") {
    // Procesar la cédula (simulado)
    addMessage("bot", `Buscando información para la cédula: ${input}...\n0 - Retroceder`);
    currentMenu = "main"; // Volver automáticamente al menú principal después de consultar
    showMainMenu();
  }
}

// Mostrar el menú principal
function showMainMenu() {
  addMessage(
    "bot",
    "Bienvenido al chat, selecciona una opción:\n1 - Consultar mi pago\n2 - Soporte técnico\n3 - Conocer servicios"
  );
}
