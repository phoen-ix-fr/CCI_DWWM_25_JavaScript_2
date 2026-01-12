export class Board
{
	#gridSizeWidth;
	#gridSizeHeight;
	
	constructor(sizeWidth, sizeHeight)
	{
		this.#gridSizeWidth = sizeWidth;
		this.#gridSizeHeight = sizeHeight;
	}
	
	/**
	/* Construit une DIV et l'ajoute au plateau de jeu
	/* <div id="grid-layer"></div>	
	 */
	createGridLayer()
	{
		const elGridGame 	= document.getElementById('grid-game');
		
		const elGridLayer 	= document.createElement('div');
		
		elGridLayer.id = "grid-layer";
		
		elGridGame.prepend(elGridLayer);
		
		// Création des cases du plateau de jeu
		for (let y = 0; y < this.#gridSizeHeight; y++) {
			for (let x = 0; x < this.#gridSizeWidth; x++) {

				const elCellDiv = document.createElement("div");  
				
				elCellDiv.className = "cell";		
				elGridLayer.appendChild(elCellDiv);
			}
		}
	}
	
	createTokenLayer()
	{
		// <div id="token-layer"></div>
	}
}