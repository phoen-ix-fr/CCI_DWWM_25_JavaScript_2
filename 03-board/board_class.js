import { Wall } from './wall_class.js';
import { Enemy } from './enemy_class.js';

function getRandomIntBetween(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

export class Board
{
	#gridSizeWidth;
	#gridSizeHeight;
	
	#elGridGame;
	
	#arrTokensPosition;	//< Stocke de manière logique la position des jetons sur le plateau
	
	constructor(sizeWidth, sizeHeight, strGridGameId)
	{
		this.#gridSizeWidth  = sizeWidth;
		this.#gridSizeHeight = sizeHeight;
		
		// On récupère l'élément DIV grid-game dans le constructeur 
		// pour le réutiliser dans plusieurs méthodes
		this.#elGridGame 	 = document.getElementById(strGridGameId);
		
		// On créée un tableau à deux dimensions (X = largeur, Y = hauteur)
		// On créée les lignes (X) :
		this.#arrTokensPosition = Array(sizeWidth);
		
		// Pour chaque colonne (X), on créer les colonnes (Y) :
		for (let i = 0; i < this.#arrTokensPosition.length; i++) {
			this.#arrTokensPosition[i] = Array(sizeHeight);
			
			// On rempli chacune des cases de la ligne avec des NULL
			this.#arrTokensPosition[i].fill(null); 
		}
		
		this.#generateWalls();
	}
	
	/**
	/*	Génère les murs sur le plateau
	/*
	/*  @todo Soit générer aléatoirement soit récupérer des positions depuis une API
	 */
	#generateWalls()
	{
		// Position X = 0, Y = 0, on place un élément de mur
		this.#arrTokensPosition[4][0] = new Wall();
		
		// On place deux autres murs en {3,1} et en {3,2}
		this.#arrTokensPosition[3][0] = new Wall();
		this.#arrTokensPosition[3][1] = new Wall();
		this.#arrTokensPosition[3][2] = new Wall();
		this.#arrTokensPosition[3][3] = new Wall();
		this.#arrTokensPosition[3][4] = new Wall();
		this.#arrTokensPosition[3][5] = new Wall();
		this.#arrTokensPosition[3][6] = new Wall();
		this.#arrTokensPosition[3][7] = new Wall();
		this.#arrTokensPosition[5][2] = new Wall();
	}
	
	/**
	/*	Génère des ennemis sur le plateau
	/*
	/*	@param Integer intNumberOfEnemies Nombre d'ennemis à générer
	/*
	 */
	#generateEnemies(intNumberOfEnemies)
	{
		for(let i = 0; i < intNumberOfEnemies; i++) {
			
			const intRandEnemyPos = this.#getRandomAvailableCell();		
			this.#arrTokensPosition[intRandEnemyPos.x][intRandEnemyPos.y] = new Enemy();
		}
		
		// Création d'une DIV correspondante à un ennemi
		
		/*
		const elEnemyDiv = document.createElement('div');
		elEnemyDiv.classList.add('enemy');
		elEnemyDiv.style.backgroundImage = `url("assets/enemy_${ENEMIES_CLASS}.png")`;
		elTokenLayer.append(elEnemyDiv);
		*/
		
	}
	
	/**
	/*	Détermine si la position X,Y est disponible
	/*
	/*	@return Boolean
	 */
	#isCellAvailable(intX, intY)
	{
		
	}
	
	/**
	/* Retourne les coordonnées d'une cellule disponible
	/*
	/* @return {x,y} La position d'une cellule disponible sur le plateau
	 */
	#getRandomAvailableCell()
	{
		// On récupère uniquement les colonnes (X) qui ont au moins une case de dispo
		
		let arrAvailablePos = [];
		
		// On parcours tous les X
		for(let x = 0; x < this.#arrTokensPosition.length; x++) {
			
			// Pour chaque X, on parcours tous les Y
			for(let y = 0; y < this.#arrTokensPosition[x].length; y++) {
				
				if(this.#arrTokensPosition[x][y] === null) {
					
					// console.log(`${x} - ${y} est disponible`);
					
					arrAvailablePos.push({x: x, y: y});
				}
			}
		}
		
		const intRand = getRandomIntBetween(0, arrAvailablePos.length - 1)
		
		return arrAvailablePos[intRand];		
		
		/*
		
		const arrAvailableX = [];
		
		const intRandX = getRandomIntBetween(0, arrAvailableX.length - 1);
		
		const arrAvailableY = this.#arrTokensPosition[intRandX]
			.map((p, i) => { if(p === null) return i; })
			.filter(i => i !== undefined);
		
		const intRandY = getRandomIntBetween(0, arrAvailableY.length -1);
		
		return {
			x: 0,
			y: 0
		};
		
		*/
	}
	
	/**
	/* Créer un nouvel élément DIV dans la div id="grid-game"
	/* <div id="strId"></div>
	/*
	/* @param String strId ID HTML de la nouvelle DIV créée
	/*
	/* @return DOMElement La nouvelle DIV créée
	 */	
	#createDivInGridGame(strId)
	{
		const elDiv = document.createElement('div');
		
		// On défini l'ID de la DIV
		elDiv.id = strId;
		
		this.#elGridGame.prepend(elDiv);
		
		// Renvoi l'objet DOMElement créé qui correspond à la DIV créée
		return elDiv;
	}
	
	/**
	/* Construit une DIV et l'ajoute au plateau de jeu
	/* <div id="grid-layer"></div>	
	 */
	createGridLayer()
	{
		const elGridLayer = this.#createDivInGridGame("grid-layer");
		
		// Création des cases du plateau de jeu
		for (let y = 0; y < this.#gridSizeHeight; y++) {
			for (let x = 0; x < this.#gridSizeWidth; x++) {

				// console.log(`(${x},${y}) = ${this.#arrTokensPosition[x][y]}`);
				
				// L'objet correspondant à la cellule courante
				const objCurrentCellObject = this.#arrTokensPosition[x][y];
				 
				if(objCurrentCellObject !== null) {
					
					// On fait appel à la méthode render de l'objet courant
					// qui nous renvoi un élément de DOM que l'on ajoute à la grid
					elGridLayer.appendChild(objCurrentCellObject.render());
				} 
				else {
					
					// Si la case est NULL, on créée une cellule vide
					const elCellDiv = document.createElement("div");
					elCellDiv.className = "cell";
					elGridLayer.appendChild(elCellDiv);
				}
			}
		}
	}
	
	/**
	/* Construit une DIV et l'ajoute au plateau de jeu
	/* <div id="token-layer"></div>	
	 */
	createTokenLayer()
	{		
		// On fait appel à la méthode qui généralise la création d'une DIV
		// dans la div grid-game
		const elTokenLayer = this.#createDivInGridGame("token-layer");
				
		// Génère 5 ennemis sur le plateau
		this.#generateEnemies(5);
		
		console.log(this.#arrTokensPosition);
	}
}