export class Board
{
	#gridSizeWidth;
	#gridSizeHeight;
	
	#elGridGame;
	
	constructor(sizeWidth, sizeHeight, strGridGameId)
	{
		this.#gridSizeWidth  = sizeWidth;
		this.#gridSizeHeight = sizeHeight;
		
		// On récupère l'élément DIV grid-game dans le constructeur 
		// pour le réutiliser dans plusieurs méthodes
		this.#elGridGame 	 = document.getElementById(strGridGameId);
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

				const elCellDiv = document.createElement("div");  
				
				elCellDiv.className = "cell";		
				elGridLayer.appendChild(elCellDiv);
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
		
		
	}
}