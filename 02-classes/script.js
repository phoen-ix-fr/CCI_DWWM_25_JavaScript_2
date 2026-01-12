class Character
{
	// Attributs
	#name; //< Nom du personnage, visibilité en privée (#)
	#hp;
	#maxHp;
	#characterClass; //< Classe de personnage (archer, magicien, guerrier...)
	#strength; //< Force du personnage (liée aux dégats infligés)
	#agility; //< Agilité du personnage (liée aux dégâts reçus)
	
	// Constructeur
	constructor(name, characterClass, hp, strength, agility)
	{
		this.#name = name;
		this.#characterClass = characterClass;
		
		// Les points de vie initiaux et le maximum de points de vie sont initialisés à la même valeur (au moment de l'instanciation d'un nouvel objet)
		this.#hp = hp;
		this.#maxHp = hp;
		this.#strength = strength;
		this.#agility = agility;
	}
}

// Instanciation d'un nouvel objet Character
// On transmet les valeurs au constructeur dans l'ordre défini
const objPlayer = new Character('Sköl', 'warrior', 100, 500, 20);
console.log(objPlayer);