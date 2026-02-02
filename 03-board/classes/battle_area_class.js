function getRandomIntBetween(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

export class BattleArea
{
	#DICE_ROLL_INTERVAL;
	#BATTLE_ROLL_TIME;
	
	#elBattleArea;
	#elDices;
	
	#intDicesNumber;
	
	constructor(strBattleAreaDivId, intDicesNumber)
	{
		this.#elBattleArea 	= document.getElementById(strBattleAreaDivId);
		this.#elDices 		= document.getElementById('dices');
				
		this.initDices(intDicesNumber);
		
		this.#DICE_ROLL_INTERVAL = 100;
		
		this.#BATTLE_ROLL_TIME = 1500;
		
		// Gestion du lancement du lancé de dés
		const elRollButton  = document.getElementById('roll-dices');
		elRollButton.addEventListener('click', (e) => {
			
			// On désactive les boutons
			elRollButton.disabled = true;

			// On affiche le lancer de dés avec les effets
			let intervalId = setInterval(() => {

				this.#elDices.querySelectorAll('.dice').forEach((elDice) => {
					
					this.rollDice(elDice);
				});

			}, this.#DICE_ROLL_INTERVAL);

			setTimeout(() => {

				clearInterval(intervalId);

				const dicesValues = [];

				this.#elDices.querySelectorAll('.dice').forEach((elDice) => {
					
					const intValue = this.rollDice(elDice);
					dicesValues.push(intValue);
				});

				const intValue = dicesValues.reduce((acc, val) => acc + val, 0);

				console.log(`Valeur totale des dés : ${intValue}`);

				// On réactive les boutons
				elRollButton.disabled = false;

			}, this.#BATTLE_ROLL_TIME);
		});
	}
	
	show()
	{
		this.#elBattleArea.style.display = 'block';
	}
	
	hide()
	{
		this.#elBattleArea.style.display = 'none';
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
	
	rollDice(elDice, value = null)
	{
	  const intValue = value || getRandomIntBetween(1, 6);
	  
	  elDice.querySelector('img').src = `assets/dice${intValue}.png`;
	  elDice.querySelector('img').alt = `Résultat du dé : ${intValue}`;
	  
	  return intValue;
	}
}