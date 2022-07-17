const Effect = require("../models/Effect");
let DRAIN = "DRAIN"
let VIGOR = "VIGOR"
let HEAL = "HEAL"
let PROTECT = "PROTECT"

//possible scopes: SELF, ALLENEMY:[species], ALL, SPECIES:[species], ALLALLY:[species], TEAM:[team],

// posteffects
let reimuPost = new Effect("Hakurei Reimu",2, 0, HEAL, "SELF", null)

let effects = [
    //Reimu active
    { cardOwners: "Hakurei Reimu", strength: 5, duration: 0, buff: DRAIN, scope: "ALLENEMY:YOUKAI", postEffect: reimuPost},
    { cardOwners: "Kirisame Marisa", strength: 3, duration: 0, buff: DRAIN, scope: "ALLENEMYCOLUMN:3", postEffect: null},
]

module.exports = effects