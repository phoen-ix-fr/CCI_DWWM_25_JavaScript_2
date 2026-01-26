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
	
	getXp()
	{
		return this.#xp;
	}
	
	getMaxXp()
	{
		return this.#maxXp;
	}
	
	renderInfos()
	{
		return "C'est toi...";
	}
	
	/**
	/*	Surcharge de la méthode toJson() de la classe Object
	/*	@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
	/*
	/* Par défaut : {"_type":"player","_isFightable":false,"_characterClass":"Archer","_name":"Legolas","_hp":100,"_maxHp":100,"_strength":50,"_agility":300,"_level":1}
	*/
	toJSON(key)
	{
		return "";
	}
}
