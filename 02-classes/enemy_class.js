import { Character } from './character_class.js';

export class Enemy extends Character
{
	/**
	/*	Calcul le nombre de points d'expérience reçu par le joueur
	/*	lors du kill de l'ennemi
	/*
	/* @return Number Nombre de points d'expérience
	 */
	getXpGain()
	{
		return 10 + ( 5 * (this._level - 1));
	}
}