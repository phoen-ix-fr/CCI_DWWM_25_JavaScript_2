import { Character } from './character_class.js';

export class Player extends Character
{
	constructor(strCharacterClass)
	{
		super(strCharacterClass);
		
		// Spécifie un type particulier
		this._type = 'player';
	}	
}