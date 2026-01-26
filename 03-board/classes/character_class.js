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
		elDiv.style.backgroundImage = `url("assets/${this._type}_${this._characterClass}.png")`;
		
		return elDiv;
	}
	
	getCharacterClass()
	{
		return this._characterClass;
	}
}