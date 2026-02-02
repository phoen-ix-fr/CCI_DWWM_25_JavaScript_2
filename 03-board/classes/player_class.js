import { Character } from './character_class.js';

export class Player extends Character
{
	#posCurrent; 	//< Position courante du joueur
	
	#xp;			//< Gestion des points d'expérience
	#maxXp;
	
	#inventory;
	
	constructor(strCharacterClass, name, hp, maxHp, strength, agility, level, posCurrent, xp, maxXp)
	{
		// Appel du constructeur parent en transmettant tous les paramètres nécessaires
		super(strCharacterClass, name, hp, maxHp, strength, agility, level);
		
		// Spécifie un type particulier
		this._type		 = 'player';
		
		this.#posCurrent = posCurrent;
		
		this.#xp = xp;
		this.#maxXp = maxXp;
		
		this.#inventory = [];
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
	
	addInventory(items)
	{
		// On fusionne les éléments de l'inventaire actuel avec les nouveaux éléments (items)
		this.#inventory = this.#inventory.concat(items);
	}
	
	renderInfos()
	{
		return "C'est toi...";
	}
	
	/**
	/*	Surcharge de la méthode toJson() de la classe Object
	/*	@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
	/*
	/*  Par défaut : {"_type":"player","_isFightable":false,"_characterClass":"Archer","_name":"Legolas","_hp":100,"_maxHp":100,"_strength":50,"_agility":300,"_level":1}
	*/
	toJSON(key)
	{
		// Comportement global au niveau de la classe Character
		const jsonParent 	= super.toJSON(key);
		
		// On rajoute ce qui est spécifique à la classe Player
		jsonParent.xp 		= this.#xp;
		jsonParent.maxXp 	= this.#maxXp;
		
		return jsonParent;
		
		/*
		// On construit un objet littéral à partir de l'objet courant
		return {
			type: this._type,
			name: this._name,
			characterClass: this._characterClass,
			hp: this._hp,
			maxHp: this._maxHp,
			strength: this._strength,
			agility: this._agility,
			level: this._level,
			xp: this.#xp,
			maxXp: this.#maxXp
		};
		*/
	}
	
	/**
	/*	
	 */
	static fromJSON(objJson, posPlayer)
	{
		const objPlayer = new Player(objJson.characterClass, 
			objJson.name, objJson.hp, objJson.maxHp, 
			objJson.strength, objJson.agility, objJson.level,
			posPlayer, objJson.xp, objJson.maxXp);
		
		return objPlayer;
	}
}
