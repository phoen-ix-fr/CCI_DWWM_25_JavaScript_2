export class Wall
{
	/**
	/*	Générer la DIV correspondante au mur
	/*
	/*	@return DOMElement Element DIV correspondant au mur
	*/
	render()
	{
		const elDiv = document.createElement("div");
		elDiv.className = "wall";
		
		return elDiv;
	}
}