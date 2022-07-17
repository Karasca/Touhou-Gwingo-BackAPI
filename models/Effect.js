class Effect {
    // card owners of this effect
    cardOwners;
    // power strength
    strength;
    // duration, -1 is instant
    duration;
    // type of (de)buff: Protect, heal, drain
    buff;
    // who gets affected by effect
    scope;
    // post effect
    postEffect;
    // yield
    yield;
    // activated
    activated;
    // user owner
    owner;

    constructor(cardOwners, strength, duration, buff, scope, postEffect, owner){
        this.cardOwners = cardOwners;
        this.strength = strength;
        this.duration = duration;
        this.buff = buff;
        this.scope = scope;
        this.postEffect = postEffect;
        this.yield = 0;
        this.activated = true;
        this.owner = owner;
    }
}

module.exports = Effect