// Hier finden wir das Knopf und den <p> Komponente by id
const button = document.getElementById('exampleButton') as HTMLButtonElement;
const messageElement = document.getElementById('message') as HTMLParagraphElement;

// Geben die kurze Nachricht aus
const displayMessage = () => {
  messageElement.textContent = 'Hello World!';
};

// Subscribe to event (kann man als Obersver Pattern betrachten. Das gleiche gibt's in Unity)
button.addEventListener('click', displayMessage);