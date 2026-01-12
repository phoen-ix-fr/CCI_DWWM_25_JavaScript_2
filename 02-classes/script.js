class Character
{
	// Attributs
	#name; 				//< Nom du personnage, visibilité en privée (#)
	#hp;
	#maxHp;
	#characterClass; 	//< Classe de personnage (archer, magicien, guerrier...)
	#strength; 			//< Force du personnage (liée aux dégats infligés)
	#agility; 			//< Agilité du personnage (liée aux dégâts reçus)
	
	#position;			//< Position du personnage (X,Y)
	
	// Constructeur
	constructor(name, characterClass, hp, strength, agility, position)
	{
		this.#name = name;
		this.#characterClass = characterClass;
		
		// Les points de vie initiaux et le maximum de points de vie 
		// sont initialisés à la même valeur (au moment de l'instanciation d'un nouvel objet)
		this.#hp = hp;
		this.#maxHp = hp;
		this.#strength = strength;
		this.#agility = agility;
		
		this.#position = position;
	}
	
	// Getters
	
	/**
	/* Retourne le nom du personnage
	/*
	/* @return String Nom du personnage
	*/
	getName()
	{
		return this.#name;
	}
	
	/**
	/* Retourne la position en Y du personnage
	/*
	/* @return Number Position en Y
	*/
	getPositionY()
	{
		return this.#position.y;
	}
	
	/**
	/* Retourne la position en X du personnage
	/*
	/* @return Number Position en X
	*/	
	getPositionX()
	{
		return this.#position.x;
	}
	
	// Setters
	
	/**
	/* Modifie le nom du personnage
	/*
	/* @param String newName Nouveau nom du personnage
	*/
	setName(newName)
	{
		this.#name = newName;
	}
	
	// Méthodes
	
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
		this.#position.x += dx;
		this.#position.y += dy;		
	}
	
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
		const intDamage = this.#strength - (0.2 * character.#agility);
		
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
		if(damages > this.#hp) 
		{
			this.#hp = 0;
		}
		else
		{
			this.#hp -= damages;
		}
	}
	
	/**
	/* Afficher dans les logs les points vies actuels du personnage (HP / MAX_HP)
	*/
	showCurrentHp()
	{
		console.log(`${this.#name} : ${this.#hp} / ${this.#maxHp}`);
	}
}

let posPlayerInitial = {x: 0, y: 2}; //< Objet littéral qui stocke une position (x, y

// Instanciation d'un nouvel objet Character
// On transmet les valeurs au constructeur dans l'ordre défini
let objPlayer = new Character('Sköl', 'warrior', 100, 500, 20, posPlayerInitial);

console.log(objPlayer.getName());

objPlayer.move(0, 5); //< La nouvelle position doit être X: 0 et Y: 2+5 = 7
console.log(objPlayer);

// Instanciation d'un ennemi (gobelin)
// cf. Kévin pour le nom chelou
let objGobelin = new Character('Wabbajack', 'gobelin', 25, 200, 400, {x: 0, y: 0});

console.log(objGobelin.getName());


objGobelin.showCurrentHp();

// Lance une attaque du joueur sur le gobelin
objPlayer.attack(objGobelin);

objGobelin.showCurrentHp();