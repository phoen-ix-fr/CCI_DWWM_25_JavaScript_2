import { Cell } from './cell_class.js';

export class Character extends Cell
{
	_characterClass;
	
	_name; 				//< Nom du personnage, visibilité en protégée (_)
	
	_hp;
	_maxHp;
	
	_strength; 			//< Force du personnage (liée aux dégats infligés)
	_agility; 			//< Agilité du personnage (liée aux dégâts reçus)
	
	_level;				//< Niveau du personnage
	
	constructor(strCharacterClass, name, hp, maxHp, strength, agility, level) {
		super();
		
		this._characterClass 	= strCharacterClass;
		this._name 				= name;
		this._hp 				= hp;
		this._maxHp 			= maxHp;
		this._strength 			= strength;
		this._agility 			= agility;
		this._level 			= level;
	}

	render()
	{
		// Appel la méthode render du parent, on récupère la DIV
		const elDiv = super.render();
		
		// Rajouter le background image spécifique au characterClass
		elDiv.style.backgroundImage = `url("assets/${this._type}_${this._characterClass.toLowerCase()}.png")`;
		
		return elDiv;
	}
	
	getCharacterClass()
	{
		return this._characterClass;
	}
	
	getName()
	{
		return this._name;
	}
	
	getStrength()
	{
		return this._strength;
	}
	
	getAgility()
	{
		return this._agility;
	}
	
	getLevel()
	{
		return this._level;
	}
	
	getHp()
	{
		return this._hp;
	}
	
	getMaxHp()
	{
		return this._maxHp;
	}
	
	toJSON(key)
	{
		// On construit un objet littéral à partir de l'objet courant
		return {
			type: this._type,
			name: this._name,
			characterClass: this._characterClass,
			hp: this._hp,
			maxHp: this._maxHp,
			strength: this._strength,
			agility: this._agility,
			level: this._level
		};		
	}
}