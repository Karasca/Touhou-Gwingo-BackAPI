let cardsDb = require('../data/cards.js')
var _ = require('lodash');
const Card = require("./Card");
const effects = require("../data/effects.js")
const peffects = require("../data/peffects.js")
const Effect = require("./Effect");



class Board {
    // user of the board
    username;
    // array of 25 cards
    cards;

    constructor(username) {
        this.username = username;
        this.generateCards();
    }

    // each card on the board runs all their effects
    runEffects(){
        this.cards.forEach(card => {
            card.runEffects()
        })
    }

    // fills cards array with random cards
    generateCards(){
        //TODO: get random cards by points
        this.cards = this.getRandomCards()
    }

    //TODO: give spells
    getRandomCards(){
        let cardsData = _.shuffle(cardsDb).slice(0,24);
        let cards = []

        //this takes cards from the data object and makes new objects out of them
        cardsData.forEach(card => {
            let active = this.getActive(card.name)
            let passive = this.getPassive(card.name)

            let newCard = new Card(card.name, card.team, card.power, card.armor, card.species,
                active, passive, [], card.cost)

            newCard.boardParent = this

            cards.push(newCard)
        })

        return cards;
    }

    // add effects to all cards in the array if applicable
    addEffects(effect){

        this.cards.forEach(card => {
            if(effect){
                if(this.validateEffect(card, effect)){
                    // add effect to card
                    card.addEffect(effect)
                }
            }
        })
    }

    validateEffect(card, effect) {
        // make use of scope to determine if things fit
        let scopeArr = effect.scope.split(':')
        let boardTarget = scopeArr[0] ? scopeArr[0] : undefined
        let species = scopeArr[1] ? scopeArr[1] : 'ALL'


        // scopes
        // SELF, ALLENEMY:[species], ALL:[species], ALLALLY :[species], .... TEAM:[teamname],
        switch(boardTarget){
            case 'SELF':
                // check if self
                return card === effect.sender
            case 'ALLENEMY':
                // check if belongs to any enemy board
                if(this !== effect.owner){
                    // if any species on enemy board
                    if(species === 'ALL') return true
                    // if specific species on enemy board
                    return species === card.species;
                }else{
                    // return false if not enemy or not fitting species
                    return false
                }
            case 'ALLALLY':
                // check if belongs to any enemy board
                if(this === effect.owner){
                    // if any species on ally board
                    if(species === 'ALL') return true
                    // return result of species check
                    return species === card.species;
                }else{
                    // return false if not ally
                    return false
                }
            case 'ALL':
                // check if belongs to any board
                // if any species
                if(species === 'ALL') return true
                // if specific species on any board
                return species === card.species;
            default:
                return false;

        }
    }

    getActive(name) {
        let active = effects.find(e => e.cardOwners === name)
        if(active){
            return new Effect(active.cardOwners, active.strength, active.duration, active.buff, active.scope, active.postEffect, this)
        }else{
            return undefined;
        }
    }

    getPassive(name) {
        let passive = peffects.find(e => e.cardOwners === name)
        if(passive){
            return new Effect(passive.cardOwners, passive.strength, passive.duration, passive.buff, passive.scope, passive.postEffect, this)
        }else{
            return undefined;
        }
    }
}



module.exports = Board