const $ = el => document.querySelector(el);
let message = '';

const addRemoveClass = (el, condition, className) => {
   if (condition) {
       el.classList.add(className);
   } else {
       el.classList.remove(className);
   }
};

const updateTextArea = () => {
    const textarea = $('textarea');
    addRemoveClass(textarea, textarea.value !== '', 'dirty');
};

const isValidInput = message => {
    return message.length > 0;
};

$('.chat-form').addEventListener('submit', event => {
    event.preventDefault();
    const textarea = $('textarea');
    const message = textarea.value;
    if (!isValidInput(message)) {
        // show invalid input message
        return;
    }
    $('.json-container').innerHTML = message;

    textarea.value = '';
    updateTextArea();
});

$('textarea').addEventListener('change', updateTextArea);
