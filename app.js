const API = 'https://api.quotable.io/random';  
let afficheTemps = document.querySelector('.time');
let afficheScore = document.querySelector('.score');

let phraseAEcrire = document.querySelector('.phraseAEcrit');
let phraseTest    = document.querySelector('.phrase-test');

let temps = 60;
let score = 0;
let  phraseScore;
afficheTemps.textContent =`Temps : ${temps}`;
afficheScore.textContent =`score : ${score}`;

let timer = setInterval(time,1000)
 
function time(){
    temps--;
    afficheTemps.textContent =`Temps : ${temps}`;
    afficheScore.textContent =`score : ${score}`;
    if (temps === 0) {
        clearInterval(timer)
    }
}

async function afficherNvPhrase(){

    const appel = await fetch(API);
    const resultat = await appel.json()
    const phrase = resultat.content;
    phraseScore = phrase.length; 
    // console.log(resultat);
    // console.log(phrase);
    phraseAEcrire.textContent ='';

    console.log(phrase.split(''));
    phrase.split('').forEach(carac => {
        const span = document.createElement('span');
        span.textContent = carac;
        phraseAEcrire.appendChild(span);
    });

    phrase.textContent = null;

};
afficherNvPhrase();

phraseTest.addEventListener("input",()=>{
    const tabPhrase = phraseAEcrire.querySelectorAll('span');
    const tabTest   = phraseTest.value.split('');

    let correct = true;

    tabPhrase.forEach((caractere,index)=>{
        const caracteres = tabTest[index];

        if (caracteres == null){
            caractere.classList.remove('correct');
            caractere.classList.remove('incorrect');
            correct = false;
        }
        else if (caracteres === caractere.textContent) {
            caractere.classList.add('correct');
            caractere.classList.remove('incorrect');
        }
        else{
            caractere.classList.remove('correct');
            caractere.classList.add('incorrect');
            correct = false;
        }
    });

    if (correct) {
        afficherNvPhrase();
        score += phraseScore;  
        phraseTest.value='';
    }
});
