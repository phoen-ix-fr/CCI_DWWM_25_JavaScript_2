import { Cell } from './cell_class.js';
import { Item } from './item_class.js';

export class Chest extends Cell
{
	#isOpened;
	#loot; 		//< Tableau d'items
	
	constructor(isOpened) {
		super();
		
		// Spécifie un type particulier
		this._type = 'chest';
		
		// Le coffre contient un butin
		this._isLootable = true;
		
		// Par défaut, le coffre est fermé
		this.#isOpened = isOpened??false;
		
		// On initialise le tableau à vide
		this.#loot = [];
	}
	
	getLoot()
	{
		return this.#loot;
	}
	
	setEmpty()
	{
		this.#loot = [];
		
		this.#isOpened = true; //< Le coffre a été ouvert
	}
	
	renderInfos()
	{
		let strOutput = `<p>C'est un coffre : ${this.#isOpened ? 'Ouvert' : 'Fermé'}</p>`;
		
		strOutput += "<ul>";
		// Boucle sur les items (rajouter les <li>)
		this.#loot.forEach(objItem => {
			
			strOutput += `<li>Type : ${objItem.getType()}, 
				Action: ${objItem.getAction()}, 
				Valeur: ${objItem.getValue()}</li>
			`;
		});
		
		strOutput += "</ul>";
		return strOutput;
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
			isOpened: this.#isOpened,
			loot: this.#loot
		};
	}
	
	addItem(item)
	{
		this.#loot.push(item);
	}
	
	/**
	/*	
	 */
	static fromJSON(objJson)
	{		
		// Instanciation d'un nouvel objet avec les infos du JSON
		const objChest = new Chest(objJson.isOpened);
		
		// On boucle sur la clé "loot" du JSON qui correspond au contenu du coffre
		objJson.loot.forEach(jsonItem => {
			
			console.log(jsonItem);
			
			// Créer un nouvel item et l'ajouter au coffre précédement instancié
			const objItem = Item.fromJSON(jsonItem);
			
			objChest.addItem(objItem);
		});
		
		return objChest;	
	}
}