import { Cell } from './cell_class.js';

export class Chest extends Cell
{
	#isOpened;
	
	constructor(isOpened) {
		super();
		
		// Spécifie un type particulier
		this._type = 'chest';
		
		// Par défaut, le coffre est fermé
		this.#isOpened = isOpened??false;
	}
	
	renderInfos()
	{
		return `C'est un coffre : ${this.#isOpened ? 'Ouvert' : 'Fermé'}`;
	}

	render()
	{
		// Appel la méthode render du parent, on récupère la DIV
		const elDiv = super.render();
		
		// Rajouter le background image spécifique au characterClass
		elDiv.style.backgroundImage = `url("assets/${this._type}_${this.#isOpened ? 'opened' : 'closed'}.png")`;
		
		return elDiv;
	}
	
	toJSON()
	{
		return {
			type: this._type,
			isOpened: this.#isOpened
		};
	}
	
	/**
	/*	
	 */
	static fromJSON(objJson)
	{
		// Instanciation d'un nouvel objet avec les infos du JSON
		const objChest = new Chest(objJson.isOpened);
		
		return objChest;	
	}
}