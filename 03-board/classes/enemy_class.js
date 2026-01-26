import { Character } from './character_class.js';

export class Enemy extends Character
{	
	constructor(strCharacterClass, name, hp, maxHp, strength, agility, level)
	{
		super(strCharacterClass, name, hp, maxHp, strength, agility, level);
		
		// Spécifie un type particulier
		this._type = 'enemy';
		
		// Un ennemi est attaquable
		this._isFightable = true;
	}
	
	renderInfos()
	{
		return `
			<ul>
				<li>Nom : ${this.getName()}</li>
				<li>Classe : ${this.getCharacterClass()}</li>
				<li>Niveau : ${this.getLevel()}</li>
				<li>HP : ${this.getHp()} / ${this.getMaxHp()}</li>
			</ul>
		`;
	}
}