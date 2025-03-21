import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game'; // Adjust the path as necessary
import { PlayerComponent } from '../player/player.component'; 
import { DialogOverviewExampleDialog } from '../add-player-dialog/add-player-dialog.component';
import { GameInfoComponent } from "../game-info/game-info.component";


@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  public game: Game | undefined;
  current_card = "";
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

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
        this.whichPlayerIsActive();
      },1000);
    }
  }

  whichPlayerIsActive() {
    if (this.game) {
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;  
    }
  }

  newGame() {
    this.game = new Game();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

    dialogRef.afterClosed().subscribe((name:string) => {
      if (name && name.length > 0) {
        this.game?.players.push(name);
      }  
    });
  }
}