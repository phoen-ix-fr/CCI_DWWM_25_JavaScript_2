export class Character
{
	// Attributs
	_name; 				//< Nom du personnage, visibilité en privée (#)
	
	_hp;
	_maxHp;
	
	_characterClass; 	//< Classe de personnage (archer, magicien, guerrier, gobelin...)
	
	_strength; 			//< Force du personnage (liée aux dégats infligés)
	_agility; 			//< Agilité du personnage (liée aux dégâts reçus)
	
	_position;			//< Position du personnage (X,Y)
	
	_level;				//< Niveau du personnage
	
	// Constructeur
	constructor(name, characterClass, hp, strength, agility, position, level)
	{
		this._name = name;
		this._characterClass = characterClass;
		
		// Les points de vie initiaux et le maximum de points de vie 
		// sont initialisés à la même valeur (au moment de l'instanciation d'un nouvel objet)
		this._hp = hp;
		this._maxHp = hp;
		this._strength = strength;
		this._agility = agility;
		
		this._position = position;
		
		this._level = level;
	}
	
	// Getters
	
	/**
	/* Retourne le nom du personnage
	/*
	/* @return String Nom du personnage
	*/
	getName()
	{
		return this._name;
	}
	
	/**
	/* Retourne la position en Y du personnage
	/*
	/* @return Number Position en Y
	*/
	getPositionY()
	{
		return this._position.y;
	}
	
	/**
	/* Retourne la position en X du personnage
	/*
	/* @return Number Position en X
	*/	
	getPositionX()
	{
		return this._position.x;
	}
	
	// Setters
	
	/**
	/* Modifie le nom du personnage
	/*
	/* @param String newName Nouveau nom du personnage
	*/
	setName(newName)
	{
		this._name = newName;
	}
	
	// Méthodes
	
	/**
	/* Lance une attaque sur un autre personnage
	/*
	/* @param Character character Le personnage attaqué
	*/
	attack(character)
	{
		// this = personnage actuel (attaquant)
		// character = personnage qui est attaqué
		
		// Les dégats = force de l'attaquant - 20% de l'agilité de l'attaqué
		const intDamage = this._strength - (0.2 * character._agility);
		
		// On retranche les dégats au personnage attaqué
		character.injured(intDamage);
	}
	
	/**
	/* Inflige des dégâts au personnage (retire des points de vie)
	/* Vérifie si le nombre de points de vies reste bien positif ou nul
	/*
	/* @param Number damages Dégâts infligés (nombre de points de vie retirés)
	*/
	injured(damages)
	{
		// Si les dégats sont supérieur au points de vie restants
		// On met les points de vie à 0, sinon on les retranche
		if(damages > this._hp) 
		{
			this._hp = 0;
		}
		else
		{
			this._hp -= damages;
		}
	}
	
	/**
	/* Afficher dans les logs les points vies actuels du personnage (HP / MAX_HP)
	*/
	showCurrentHp()
	{
		console.log(`${this._name} : ${this._hp} / ${this._maxHp}`);
	}
}