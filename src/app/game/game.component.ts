import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game'; // Adjust the path as necessary
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  public game: Game | undefined;
  current_card = "";
  
  ngOnInit(): void {
    this.newGame();
  }

  cardAnimation() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      this.current_card = this.game?.stack.pop() || '';
      setTimeout(() => {
        this.game?.playedCards.push(this.current_card)
        this.pickCardAnimation = false;      
      },1000);
    }
  }

  newGame() {
    this.game = new Game();
  }
}
