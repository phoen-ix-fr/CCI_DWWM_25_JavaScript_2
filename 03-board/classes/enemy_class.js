import { Character } from './character_class.js';

export class Enemy extends Character
{	
	constructor(strCharacterClass)
	{
		super(strCharacterClass);
		
		// Spécifie un type particulier
		this._type = 'enemy';
		
		// Un ennemi est attaquable
		this._isFightable = true;
	}
}