import { Character } from './character_class.js';

export class Player extends Character
{
	#posCurrent; 	//< Position courante du joueur
	
	#xp;			//< Gestion des points d'expérience
	#maxXp;
	
	constructor(strCharacterClass, name, hp, maxHp, strength, agility, level, posCurrent, xp, maxXp)
	{
		// Appel du constructeur parent en transmettant tous les paramètres nécessaires
		super(strCharacterClass, name, hp, maxHp, strength, agility, level);
		
		// Spécifie un type particulier
		this._type		 = 'player';
		
		this.#posCurrent = posCurrent;
		
		this.#xp = xp;
		this.#maxXp = maxXp;
	}

	getCurrentPosition()
	{
		return this.#posCurrent;
	}
	
	setCurrentPosition(posNewPosition)
	{
		this.#posCurrent = posNewPosition;
	}
}
