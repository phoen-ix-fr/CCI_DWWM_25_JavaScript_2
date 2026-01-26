import { Wall } from './wall_class.js';
import { Enemy } from './enemy_class.js';
import { Player } from './player_class.js';

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
	
	#elPlayerInfos;
	
	#arrTokensPosition;	//< Stocke de manière logique la position des jetons sur le plateau
	
	#objPlayer;
	
	#gameMode = 'exploration';
	
	constructor(sizeWidth, sizeHeight, strGridGameId, strPlayerInfoId)
	{
		this.#gridSizeWidth  = sizeWidth;
		this.#gridSizeHeight = sizeHeight;
		
		// On récupère l'élément DIV grid-game dans le constructeur 
		// pour le réutiliser dans plusieurs méthodes
		this.#elGridGame 	 = document.getElementById(strGridGameId);
		
		// On récupère l'élément DIV qui affiche les infos du joueur
		this.#elPlayerInfos	 = document.getElementById(strPlayerInfoId);
		
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
		
		this.#initialisePlayer();
		
		this.#generateEnemies(2, 'Warrior', "Guerrier Orc");
		this.#generateEnemies(3, 'Firespirit', "Feu follet");
		
		this.#gameMode = 'exploration';
	}
	
	#initialisePlayer()
	{		
		// Vérifier si une position est stockée en localStorage
		const strLocalStPosition = localStorage.getItem('Player Position');
		
		// Valeur par défaut : position (0, 0)
		let objPosition = {x: 0, y: 0};
		
		// strLocalStPosition !== null
		if(strLocalStPosition) {
			
			// On écrase la valeur par défaut par la valeur en localStorage
			objPosition = JSON.parse(strLocalStPosition);
		}
	
		// On créer un joueur sur la position (0,0)
		this.#objPlayer = new Player('Archer', 'Legolas', 100, 100, 50, 300, 1, objPosition, 0, 100);
		
		this.#arrTokensPosition[objPosition.x][objPosition.y] = this.#objPlayer;
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
		this.#arrTokensPosition[3][7] = new Wall();
		
		this.#arrTokensPosition[5][2] = new Wall();
	}
	
	/**
	/*	Génère des ennemis sur le plateau
	/*
	/*	@param Integer intNumberOfEnemies Nombre d'ennemis à générer
	/*
	 */
	#generateEnemies(intNumberOfEnemies, strCharacterClass, strName)
	{
		for(let i = 0; i < intNumberOfEnemies; i++) {
			
			const intRandEnemyPos = this.#getRandomAvailableCell();		
			this.#arrTokensPosition[intRandEnemyPos.x][intRandEnemyPos.y] 
				= new Enemy(strCharacterClass, strName, 50, 50, 50, 50, 1);
		}		
	}
	
	/**
	/*	Détermine si la position X,Y est disponible
	/*
	/*	@return Boolean
	 */
	#isCellAvailable(intX, intY)
	{
		return (
			this.#isCellInGrid(intX, intY)
			&& this.#arrTokensPosition[intX][intY] === null
		);
	}
	
	/**
	/*	Détermine si la case se trouve dans le plateau de jeu
	/*
	/*	@return Boolean
	 */
	#isCellInGrid(intX, intY)
	{
		return intX >= 0 && intX < this.#arrTokensPosition.length
			&& intY >= 0 && intY < this.#arrTokensPosition[intX].length;
	}
	
	/**
	/* Retourne les coordonnées d'une cellule disponible
	/*
	/* @return {x,y} La position d'une cellule disponible sur le plateau
	 */
	#getRandomAvailableCell()
	{		
		let arrAvailablePos = [];
		
		// On parcours tous les X
		for(let x = 0; x < this.#arrTokensPosition.length; x++) {
			
			// Pour chaque X, on parcours tous les Y
			for(let y = 0; y < this.#arrTokensPosition[x].length; y++) {
				
				if(this.#isCellAvailable(x, y)) {
					
					// console.log(`${x} - ${y} est disponible`);					
					arrAvailablePos.push({x: x, y: y});
				}
			}
		}
		
		const intRand = getRandomIntBetween(0, arrAvailablePos.length - 1);		
		return arrAvailablePos[intRand];		
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
	render()
	{		
		// Si un grid-layer existe déjà, on le supprime du DOM
		// L'opérateur ?. appelle la méthode uniquement si l'objet n'est pas NULL
		document.getElementById("grid-layer")?.remove();
		
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
					const elCellDiv = objCurrentCellObject.render();
					
					elCellDiv.addEventListener('click', () => {
						
						this.updateInfosArea(objCurrentCellObject);
					});
					
					elGridLayer.appendChild(elCellDiv);
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
	
	movePlayer(dx, dy)
	{		
		// Récupérer la position actuelle du joueur
		const posCurrent = this.#objPlayer.getCurrentPosition();
		
		// Calcul de la nouvelle position
		const posNew = {
			x: posCurrent.x + dx,
			y: posCurrent.y + dy
		};
		
		if(this.#isCellAvailable(posNew.x, posNew.y)) {
			
			// On retire le joueur de sa position actuelle
			this.#arrTokensPosition[posCurrent.x][posCurrent.y] = null;
			
			// On place le joueur à sa nouvelle position
			this.#objPlayer.setCurrentPosition(posNew);
			this.#arrTokensPosition[posNew.x][posNew.y] = this.#objPlayer;
			
			// Sauvegarder la position du joueur en localStorage
			localStorage.setItem("Player Position", JSON.stringify(posNew));		
		}
		else if(this.#isCellInGrid(posNew.x, posNew.y)) {
			
			// On récupère l'objet qui bloque le joueur
			const objObstacle = this.#arrTokensPosition[posNew.x][posNew.y];
			
			if(objObstacle.isFightable()) {
				
				this.#gameMode = 'fight';
				
				// window.alert(`Combat! ${objObstacle.getCharacterClass()}`);
				this.updateInfosArea(objObstacle);
			}
		}
	}
	
	updatePlayerInfos()
	{
		document.getElementById('player-name').textContent 		= this.#objPlayer.getName();
		document.getElementById('player-class').textContent 	= this.#objPlayer.getCharacterClass();
		document.getElementById('player-strength').textContent 	= this.#objPlayer.getStrength();
		document.getElementById('player-agility').textContent 	= this.#objPlayer.getAgility();
		document.getElementById('player-level').textContent 	= this.#objPlayer.getLevel();
		
		this.#updateBarInfo('#player-hp', this.#objPlayer.getHp(), this.#objPlayer.getMaxHp());
		this.#updateBarInfo('#player-xp', this.#objPlayer.getXp(), this.#objPlayer.getMaxXp());	
	}
	
	updateInfosArea(objObstacle)
	{
		const elInfoArea = document.getElementById('infos-area');
		
		/*
		elInfoArea.innerHTML = `
			<ul>
				<li>Nom : ${objObstacle.getName()}</li>
				<li>Classe : ${objObstacle.getCharacterClass()}</li>
				<li>Niveau : ${objObstacle.getLevel()}</li>
				<li>HP : ${objObstacle.getHp()} / ${objObstacle.getMaxHp()}</li>
			</ul>
		`;
		*/
		
		elInfoArea.innerHTML = objObstacle.renderInfos();
	}
	
	#updateBarInfo(strContainerId, intValue, intMaxValue)
	{
		const elBar = document.querySelector(strContainerId + ' .info-bar div');
		elBar.style.width = (intValue / intMaxValue * 100) + '%';
		elBar.getElementsByClassName('info-bar-value')[0].textContent = intValue + '/' + intMaxValue; 	
	}
	
	saveToLocal()
	{
		// Sauvegarde l'état / position des jetons en localStorage
		localStorage.setItem("Board", JSON.stringify(this.#arrTokensPosition));
		
		// Sauvegarde la date de la dernière Sauvegarde
		const dteNowDate = Date.now();
		localStorage.setItem("Save_Timestamp", dteNowDate);
		
		// Provisoire le temps du developpement des méthodes toJSON
		localStorage.setItem("Player", JSON.stringify(this.#objPlayer));
		
		const options 		  = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
		const dteCurrentDate  = new Date(dteNowDate);
		
		document.querySelector('#save-game p span').textContent = dteCurrentDate.toLocaleDateString('fr-FR', options);
	}
}