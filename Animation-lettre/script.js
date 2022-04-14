const target = document.getElementById("target");
let words = ['good', 'beutiful', 'strong', 'smart']; 
let wordIndex = 0;
let letterIndex = 0;

const createLetter = () => {
    const letter = document.createElement('span');
    target.appendChild(letter);

    letter.classList.add('letter');
    letter.style.opacity = '0';
    letter.style.animation = 'anim 5s ease forwards';
    letter.textContent = words[wordIndex][letterIndex];

    setTimeout(() => {
        letter.remove();
    }, 2000)
}

const loop = () => {
    setTimeout (() => {
if(wordIndex >= words.length) {
    wordIndex= 0;
    letterIndex = 0;
    loop;
}

        if  (letterIndex < words[wordIndex].length) {
            createLetter();
            letterIndex++;
            loop();
        }

        else {
            letterIndex = 0;
            wordIndex++;
            setTimeout(() => {
                loop();
            }, 2000);
        }

        }, 80); 
}

loop();
