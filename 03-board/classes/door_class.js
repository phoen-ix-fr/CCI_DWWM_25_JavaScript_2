import { Cell } from './cell_class.js';

export class Door extends Cell
{
	#targetLevel;
	
	constructor(targetLevel) {
		super();
		
		// Spécifie un type particulier
		this._type = 'door';
		
		this.#targetLevel = targetLevel;
	}
	
	renderInfos()
	{
		return `C'est une porte vers le niveau ${this.#targetLevel}`;
	}
	
	toJSON()
	{
		return {
			type: this._type,
			targetLevel: this.#targetLevel
		};
	}
	
	/**
	/*	
	 */
	static fromJSON(objJson)
	{
		// Instanciation d'un nouvel objet avec les infos du JSON
		const objDoor = new Door(objJson.targetLevel);
		
		return objDoor;	
	}
}