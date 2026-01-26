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

// Test d'utilisation de localStorage
localStorage.setItem("Player Name", "Legolas");

const strPlayerName = localStorage.getItem("Player Name");
console.log(strPlayerName);