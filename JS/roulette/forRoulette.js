let container = document.getElementById('container_list')
let nombres = [];
let lista = document.createElement('ul');
let indice = 0;
const tiempoRuleta=8000     // Temps que dona volta la ruleta en milisegons.

const jsConfetti = new JSConfetti()
const audioRun = document.getElementById("runRuolette");
const audioWinner = document.getElementById("winner");

function loadNames(){ //JAB 20230612 Convertir a funció
    // L'opció predeteminada, és la que es troba a la línia 4 del fitxer
    //let fNombres ='grupA.txt'   //JAB 20230612
    const grupTriat = document.getElementById("grup-dropdown"); //JAB 20230612
    let fNombres= grupTriat.value //JAB 20230612

    fetch(fNombres)
        .then(response => response.text())
        .then(data => {
            nombres = data.split('\n').filter(Boolean);
            nombres.forEach(nombre => {
                let elemento = document.createElement('li');
                let texto = document.createTextNode(nombre);
                elemento.appendChild(texto);
                lista.appendChild(elemento);
            });
            container.appendChild(lista);
        })
        .catch(error => console.error(error));
}

function spindNames() {
    indice = (indice + nombres.length - 1) % nombres.length;
    nombres.forEach((nombre, i) => {
        let elemento = lista.children[i];
        elemento.textContent = nombres[(indice + i) % nombres.length];
    });
}

let intervalId = null;
function startSpin() {
    loadNames() //JAB20230612
    audioRun.play();
    restartRullet();
    nombres.sort(() => Math.random() - 0.5);
    intervalId = setInterval(spindNames,100);
    setTimeout(stopWinner, tiempoRuleta);
}

function restartRullet() {
    clearInterval(intervalId);
    intervalId = null;
}
function stopWinner() {
    clearInterval(intervalId);
    audioWinner.play()
    intervalId = null;
    jsConfetti.addConfetti({
        emojis: ['🍉', '👺', '💩', '🧠', '🙇‍♀️', '❤️‍🩹', '🐕‍🦺', '🪱', '🦚', '🥟', '🍦', '🏄', '🎿', '⚽', '🚡', '🚤', '🔍', '🖥', '🏳️‍🌈', '🏳️‍🌈', '🏳️‍🌈', '🏳️‍🌈', '🔝', '💾', '💿', '📷', '💻', '📲', '😛', '😝', '🐼', '🐻‍❄️'],
        confettiRadius: 10,
        confettiNumber: 120,
        emojiSize: 50,
    })
}
document.getElementById("rotar").addEventListener("click", startSpin);
document.getElementById("grup-dropdown").addEventListener("click", loadNames); //JAB 20230612

