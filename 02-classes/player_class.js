import { Character } from './character_class.js';

export class Player extends Character
{
	#xp;
	#maxXp;
	
	constructor(name, characterClass, hp, strength, agility, position, level, xp, maxXp)
	{
		// Appel du constructeur de la classe parente (Character)
		// On fourni les paramètres dans l'ordre du constructeur
		super(name, characterClass, hp, strength, agility, position, level);
		
		this.#xp = xp;
		this.#maxXp = maxXp;
	}
	
	/**
	/* Déplace le personnage suivant les différenciels en X et Y fournis en paramètres
	/*
	/* @param Number dx Déplacement sur les X (positif, déplacement vers la droite, négatif, déplacement vers la gauche)
	/* @param Number dy Déplacement sur les Y (positif, déplacement vers le bas, négatif, déplacement vers le haut)
	 */
	move(dx, dy)
	{
		// On prend la position actuel du personnage 
		// et on ajoute le différenciel en X et en Y
		this._position.x += dx;
		this._position.y += dy;		
	}
	
	/**
	/* Ajoute des points d'expérience à notre joueur
	/* 
	/* @todo Gérer le gain de plusieurs niveaux en 1 seul gain d'expérience
	/*
	/* @param Number xp Nombre de points d'expérience
	 */
	addXp(xp)
	{
		// ResteXP = XP_Actuel + Gain_XP - Max_XP_du_Niveau
		const intRestXp = this.#xp + xp - this.#maxXp;
		
		if(intRestXp >= 0)
		{
			// Gain d'un niveau
			this.#levelUp();
			
			// XP actuelle vaut le reste du Gain
			this.#xp = intRestXp;
		}
		else 
		{	
			this.#xp += xp;
		}
	}
	
	/**
	/* Gère l'augmentation du niveau du personnage
	*/
	#levelUp()
	{
		// Incrément du niveau du joueur
		this._level++;
		
		// Nombre de point d'exp nécessaire au prochain niveau
		// On augmente le maxXP de 10% à chaque level UP
		// this.#maxXp = this.#maxXp + 0.1 * this.#maxXp;
		this.#maxXp *= 1.1;
	}
}