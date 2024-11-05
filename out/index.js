"use strict";
// Hier finden wir das Knopf und den <p> Komponente by id
var button = document.getElementById('exampleButton');
var messageElement = document.getElementById('message');
// Geben die kurze Nachricht aus
var displayMessage = function () {
    messageElement.textContent = 'Hello World!';
};
// Subscribe to event (kann man als Obersver Pattern betrachten. Das gleiche gibt's in Unity)
button.addEventListener('click', displayMessage);
//# sourceMappingURL=index.js.map