export class Item
{
	#type;
	#action;
	#value;
	
	constructor(type, action, value)
	{
		this.#type 		= type;
		this.#action 	= action;
		this.#value 	= value;
	}
	
	toJSON(key)
	{
		return {
			type: this.#type,
			action: this.#action,
			value: this.#value
		};
	}
	
	static fromJSON(objJson)
	{
		// On construit un objet Item à partir de l'objet JSON transmis
		const objItem = new Item(objItem.type, 
			objItem.action, objItem.value
		);
		
		return objItem;
	}
}