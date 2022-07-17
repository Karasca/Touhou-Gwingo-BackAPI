var express = require('express');
var router = express.Router();

const GameState = require('../models/GameState')

let gs1 = new GameState("karasca");
gs1.addBoard("kara")
gs1.addBoard("kara2")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/endTurn', function(req, res, next) {

  gs1.boards.forEach(board => {
    board.runEffects()
  })

  res.render('index', { title: 'Express' });
});

function findCharacters(input) {
  let charactersFound = []
  gs1.boards.forEach(b => {
    let result = b.board.cards.find(c => c.name === input)
    if(result){
      charactersFound.push(result)
    }
  })
  return charactersFound;
}

router.get('/applyEffects', function(req, res, next) {

  let input = "Hakurei Reimu"
  let foundCharacters = findCharacters(input)

  foundCharacters.forEach(fc => {
    gs1.boards.forEach(b => {
      b.board.addEffects(fc.active)
    })
  })

  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/t1', function(req, res, next) {
  console.log(gs1.boards[0].board.cards)
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/t2', function(req, res, next) {
  console.log(gs1.boards[1].board.cards)
  res.render('index', { title: 'Express' });
});


module.exports = router;
