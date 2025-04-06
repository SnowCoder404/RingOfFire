export class Game {
    public players:string[] = [];
    public playersPictures:string[] = [];
    public stack:string[] = [];
    public playedCards:string[] = [];
    public currentPlayer:number = 0;
    public pickCardAnimation = false;
    public current_card = "";
    
    constructor() {
        this.createStack();
    }

    createStack() {
        for (let index = 1; index < 14; index++) {
            this.stack.push("ace_" + index);
            this.stack.push("clubs_" + index);
            this.stack.push("diamonds_" + index);
            this.stack.push("hearts_" + index);
        }
        shuffle(this.stack)
    }

    toJson() {
        return {
            players: this.players,
            playersPictures: this.playersPictures,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            current_card: this.current_card
        }
    }
}

function shuffle(array: string[]) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  