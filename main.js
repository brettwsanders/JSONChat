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
    return message.trim().length > 0;
};


$('.chat-form').addEventListener('submit', event => {
    event.preventDefault();
    const textarea = $('textarea');
    const input = textarea.value;
    if (!isValidInput(input)) {
        // show invalid input message
        textarea.value = '';
        return;
    }
    const message = new Message(input);
    $('.json').innerHTML = message.toJSON();
    textarea.value = '';
    updateTextArea();
});

$('textarea').addEventListener('change', updateTextArea);

/* Message Class */
class Message {
    constructor(message) {
        this.message = message;
        this.data = this.getInitialState();
        this.buildData();
    };

    getInitialState() {
        return {
            mentions: [],
            emoticons: [],
            links: []
        }
    };

    buildData() {
        let startingMention = null;
        let startingEmoticon = null;
        let startingLink = null;

        for (let i = 0; i < this.message.length; i++) {
            const char = this.message[i];
            if (startingMention !== null) {
                let mention;
                if (char === ' ') {
                    mention = this.message.slice(startingMention, i);
                } else if (i === this.message.length - 1) {
                    mention = this.message.slice(startingMention);
                }

                if (mention && mention.length > 0) {
                    this.data.mentions.push(mention);
                    startingMention = null;
                }
            } else if (startingEmoticon !== null) {
                let emoticon;
                if (char === ')') {
                    emoticon = this.message.slice(startingEmoticon, i);
                }
                
                if (emoticon && emoticon.length > 0) {
                    this.data.emoticons.push(emoticon);
                    startingEmoticon = null;
                }
            } else if (startingLink !== null) {
            } else if (char === '@') {
                startingMention = i + 1;
            } else if (char === '(') {
                startingEmoticon = i + 1;
            }
        }
    };

    toJSON() {
        return JSON.stringify(this.data, null, 2);
    };
};
