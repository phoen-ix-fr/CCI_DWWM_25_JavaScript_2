export class BattleArea
{
	#elBattleArea;
	#elDices;
	
	#intDicesNumber;
	
	constructor(strBattleAreaDivId, intDicesNumber)
	{
		this.#elBattleArea = document.getElementById(strBattleAreaDivId);
		
		this.#elDices = document.getElementById('dices');
				
		this.initDices(intDicesNumber);
	}
	
	addDice()
	{		
		this.#intDicesNumber++; // Incrément du nombre de dés

		// On rajoute une nouvelle div dans le DOM
		const elNewDice = document.createElement('div');
		elNewDice.classList.add('dice');
		elNewDice.innerHTML = `<img src="assets/dice1.png" alt="Résultat du dé"/>`

		this.#elDices.appendChild(elNewDice);
	}
	
	removeDice()
	{		
		if (this.#intDicesNumber > 0) { // Pas de nombre négatif
			this.#intDicesNumber--; // Décrément du nombre de dés

			// On supprime la dernière div de nos dés
			this.#elDices.removeChild(this.#elDices.lastElementChild);
		}
	}
	
	initDices(intDicesNumber)
	{
		while(this.#elDices.hasChildNodes())
		{
			this.removeDice();
		}

		for(let i = 0; i < intDicesNumber; i++)
		{
			this.addDice();
		}
	}
	
	render()
	{
		
	}
}