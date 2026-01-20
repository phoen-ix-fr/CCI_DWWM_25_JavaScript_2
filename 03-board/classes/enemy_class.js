import { Cell } from './cell_class.js';

export class Enemy extends Cell
{
	_characterClass;
	
	constructor(strCharacterClass) {
		super();
		
		// Spécifie un type particulier
		this._type = 'enemy';
		
		this._characterClass = strCharacterClass;
	}
	
	render()
	{
		// Appel la méthode render du parent, on récupère la DIV
		const elDiv = super.render();
		
		// Rajouter le background image spécifique au characterClass
		elDiv.style.backgroundImage = `url("assets/enemy_${this._characterClass}.png")`;
		
		return elDiv;
	}
}