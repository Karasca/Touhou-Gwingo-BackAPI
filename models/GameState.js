let Board = require('./Board.js')

class GameState {
    // the streamer
    stream;
    // all boards of the streamer
    boards;
    // active affects on the whole game
    activeEffects;
    // effect queue
    effectQueue;

    constructor(stream){
        this.stream = stream;
        this.boards = [];
        this.activeEffects = [];
        this.effectQueue = [];
    }

    addBoard(username){
        this.boards.push({username: username, board: new Board(username)});
    }

    // turnBoards(){
    //     this.boards.forEach(board => {
    //         board.addEffects(this.effectQueue)
    //     })
    // }

    addBoardEffect(effect){
        this.activeEffects.push(effect)
    }

    addCardEffect(caster,board,effect){
        this.effectQueue.push({caster: caster, board: board, effect: effect});
    }
}

module.exports = GameState