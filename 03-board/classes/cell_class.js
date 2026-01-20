export class Cell
{
	_type = 'cell';	//< Définit la classe CSS de la DIV (par défaut, cell)
	
	/**
	/*	Générer la DIV correspondante au mur
	/*
	/*	@return DOMElement Element DIV correspondant au mur
	*/
	render()
	{
		const elDiv = document.createElement("div");
		elDiv.className = this._type;
		
		return elDiv;
	}
}