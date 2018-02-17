const $ = el => document.querySelectorAll(el);
const button = $('.chat-container input[type="button"]')[0];

let message = '';

button.addEventListener('click', event => {
    message = $('.chat-container input[type="text"]')[0].value;
    console.log(message);
});
