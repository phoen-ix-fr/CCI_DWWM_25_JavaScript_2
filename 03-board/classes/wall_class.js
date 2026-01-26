import { Cell } from './cell_class.js';

export class Wall extends Cell
{
	constructor() {
		super();
		
		// Spécifie un type particulier
		this._type = 'wall';
	}
	
	renderInfos()
	{
		return "C'est un mur...";
	}
	
	toJSON()
	{
		return {
			type: this._type
		};
	}
}