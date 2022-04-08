const body = document.body;

/* définition de l'interval ou la fcontion est lancée @param-1 la fonction @param-2 l'interval en milliseconde*/
setInterval(rainFall, 10);



function rainFall () {
    /* balise i qui sera injectée dans le html */
    const waterDrop = document.createElement('i');
    
    
/* injection d'une class fontawesome via le CDN la class pui sl'icone en question*/
    waterDrop.classList.add('fas');
    waterDrop.classList.add('fa-tint');

    /* taille de la goute aléatoire */
    waterDrop.style.fontSize = Math.random() * 7 + 'px';

    /* durée animation */
    waterDrop.style.animationDuration = Math.random() * 2 + 's';


    waterDrop.style.opacity = Math.random() + 0.3;

    waterDrop.style.left = Math.random() * window.innerWidth +'px';

    body.appendChild(waterDrop);

    /*kill la goute d'eau premier parametre waterDrop.remove et deuxieme parametre à partir de combien de temps*/
    setTimeout(() => {
        waterDrop.remove();
    }, 6000)
}