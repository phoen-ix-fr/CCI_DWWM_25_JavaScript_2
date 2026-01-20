import { Cell } from './cell_class.js';

export class Wall extends Cell
{
	constructor() {
		super();
		
		// Spécifie un type particulier
		this._type = 'wall';
	}
}