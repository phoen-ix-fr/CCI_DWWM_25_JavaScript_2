export class Cell
{
	_type = 'cell';	//< Définit la classe CSS de la DIV (par défaut, cell)
	_isFightable = false; //< Définit si la case est attaquable
	
	_isLootable = false; //< Définit si la case contient un coffre/un butin
	_isCrossable = false; //< Définit si la case permet de changer de niveau
	
	/**
	/*	Générer la DIV correspondante au mur
	/*
	/*	@return DOMElement Element DIV correspondant au mur
	*/
	render()
	{
		const elDiv = document.createElement("div");
		elDiv.classList.add(this._type);
		
		if(this._isSelected) {
			elDiv.classList.add('selected');
		}
		
		return elDiv;
	}
	
	renderInfos()
	{
		return "";
	}
	
	/**
	/*	Détermine si la case est attaquable (enemis)
	/*
	/*	@return boolean
	 */
	isFightable()
	{
		return this._isFightable;
	}
	
	isLootable()
	{
		return this._isLootable;		
	}
	
	isCrossable()
	{
		return this._isCrossable;		
	}
}