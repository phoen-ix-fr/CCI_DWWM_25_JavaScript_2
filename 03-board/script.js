import { Board } from './classes/board_class.js';

// Board(WIDTH, HEIGHT, ID de la DIV du plateau, ID de la DIV des infos du joueur
let objBoard = new Board(8, 8, "grid-game", "inventory");

objBoard.render();

objBoard.updatePlayerInfos();

// Ecoute de l'évènement de touche du clavier
document.addEventListener("keydown", (e) => {
	
	switch(e.key) {
        case 'ArrowUp': 
			objBoard.movePlayer(0, -1);
            break;

        case 'ArrowDown':
			objBoard.movePlayer(0, 1);           
            break;

        case 'ArrowLeft':
			objBoard.movePlayer(-1, 0);            
            break;

        case 'ArrowRight':
			objBoard.movePlayer(1, 0);               
            break;

        default:
            return; // Par défaut on n'effectue rien si ce n'est pas une flèche du clavier
    }
	
	objBoard.render(); //< Met à jour l'affichage
});

document.querySelector('#save-game button').addEventListener('click', () => {
	
	objBoard.saveToLocal();
});


// Requête Asynchrone pour récupérer le template de plateau de niveau 1
fetch('https://cci-api-jdr.phoen-ix.net/api/boards/1', {
	method: 'GET',
	headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(data => {
	
	console.log(data);
	
}).catch(error => console.error('Error: ', error));