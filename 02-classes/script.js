// Import de la classe Character à partir du fichier character_class.js
import { Character } from './character_class.js';
import { Player } from './player_class.js';

let posPlayerInitial = {x: 0, y: 2}; //< Objet littéral qui stocke une position (x, y

// Instanciation d'un nouvel objet Player
// On transmet les valeurs au constructeur dans l'ordre défini
let objPlayer = new Player('Sköl', 'warrior', 100, 500, 20, posPlayerInitial, 1, 0, 100);

console.log(objPlayer.getName());

objPlayer.move(0, 5); //< La nouvelle position doit être X: 0 et Y: 2+5 = 7
console.log(objPlayer);

// Instanciation d'un ennemi (gobelin)
// cf. Kévin pour le nom chelou
let objGobelin = new Character('Wabbajack', 'gobelin', 25, 200, 400, {x: 0, y: 0}, 1);

console.log(objGobelin.getName());

objGobelin.showCurrentHp();

// Le gobelin attaque le joueur
objGobelin.attack(objPlayer);

// Lance une attaque du joueur sur le gobelin
objPlayer.attack(objGobelin);

objGobelin.showCurrentHp();
