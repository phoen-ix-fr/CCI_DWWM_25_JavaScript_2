import { Character } from './character_class.js';

export class Player extends Character
{
	_posCurrent; 	//< Position courante du joueur
	
	constructor(strCharacterClass, posCurrent)
	{
		super(strCharacterClass);
		
		// Spécifie un type particulier
		this._type = 'player';
		
		this._posCurrent = posCurrent;
	}

	getCurrentPosition()
	{
		return this._posCurrent;
	}
	
	setCurrentPosition(posNewPosition)
	{
		this._posCurrent = posNewPosition;
	}
}