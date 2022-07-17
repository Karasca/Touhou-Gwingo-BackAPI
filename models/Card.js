const consts = require('../data/constants.js')

class Card {
    name;
    team;
    power;
    armor;
    species;
    active;
    passive;
    effects;
    cost;
    boardParent;

    constructor(name, team, power, armor, species, active, passive, effects, cost){
        this.name = name;
        this.team = team;
        this.power = power;
        this.armor = armor;
        this.species = species;
        this.active = active;
        this.passive = passive;
        this.effects = effects;
        this.cost = cost;
        this.boardParent = null;
    }


    addEffect(effect){
        switch(effect.buff){
            case 'DRAIN':
            break;
        }
        this.effects.push(effect)
    }

    //run effects at end of turn
    runEffects(){
        this.effects.forEach(effect => {
            if(effect.activated){
                switch (effect.buff) {
                    // DRAIN reduces health by strength amount for duration
                    case consts.DRAIN:
                        if(effect.duration > 0 && effect.activated){
                            // damage power
                            this.power -= effect.strength
                            // reduce effect duration
                            effect.duration -= 1;
                        }else {
                            this.power -= effect.strength
                            effect.activated = false
                        }
                        break;
                    // VIGOR increases health by strength amount for duration
                    case consts.VIGOR:
                        if(effect.duration > 0){
                            // heal power
                            this.power += effect.strength
                            // reduce effect duration
                            effect.duration -= 1;
                        }
                        break;
                    // PROTECT stops negative effects for a charge of strength
                    case consts.PROTECT:
                        break;
                    default:
                        break;
                }
            }
        })
    }

    activate(){
        // TODO: run the active
        return this.active
    }

    runPassive(){
        // TODO: run passive effect
        return this.passive
    }

    damage(power){
        this.power -= power
    }

    heal(power){
        this.power += power
    }



}

module.exports = Card