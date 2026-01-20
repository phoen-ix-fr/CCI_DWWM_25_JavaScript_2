import { Cell } from './cell_class.js';

export class Character extends Cell
{
	_characterClass;
	
	constructor(strCharacterClass) {
		super();
		
		this._characterClass = strCharacterClass;
	}

	render()
	{
		// Appel la méthode render du parent, on récupère la DIV
		const elDiv = super.render();
		
		// Rajouter le background image spécifique au characterClass
		elDiv.style.backgroundImage = `url("assets/${this._type}_${this._characterClass}.png")`;
		
		return elDiv;
	}
}