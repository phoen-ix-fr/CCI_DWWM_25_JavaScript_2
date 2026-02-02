import { Cell } from './cell_class.js';

export class Item extends Cell
{
	#action;
	#value;
	
	constructor(type, action, value)
	{
		super(); //< On appelle le constructeur parent
		
		this._type 		= type;
		this.#action 	= action;
		this.#value 	= value;
	}
	
	getType()
	{
		return this._type;
	}
	
	getAction()
	{
		return this.#action;
	}
	
	getValue()
	{
		return this.#value;
	}

	render()
	{
		// Appel la méthode render du parent, on récupère la DIV
		const elDiv = super.render();
		
		elDiv.classList.add('item');
		
		// Rajouter le background image spécifique au characterClass
		elDiv.style.backgroundImage = `url("assets/item_${this._type}.png")`;
		
		return elDiv;
	}
	
	toJSON(key)
	{
		return {
			type: this._type,
			action: this.#action,
			value: this.#value
		};
	}
	
	static fromJSON(objJson)
	{
		// On construit un objet Item à partir de l'objet JSON transmis
		const objItem = new Item(objJson.type, 
			objJson.action, objJson.value
		);
		
		return objItem;
	}
}