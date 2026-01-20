import { Board } from './classes/board_class.js';

let objBoard = new Board(8, 8, "grid-game");

objBoard.render();

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