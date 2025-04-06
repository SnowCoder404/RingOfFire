import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, DoCheck, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game'; // Adjust the path as necessary
import { PlayerComponent } from '../player/player.component'; 
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component'; 
import { DialogOverviewExampleDialog } from '../add-player-dialog/add-player-dialog.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { Firestore, collection, updateDoc, doc } from '@angular/fire/firestore';
import { onSnapshot } from 'firebase/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { G, S } from '@angular/cdk/keycodes';
import { DocumentData } from '@angular/fire/compat/firestore';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, PlayerMobileComponent ,MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  public game: Game;
  gameover = false;
  gameId = ""
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute, private firestore: Firestore) { 
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.getGameData(params['id']);
    });
  }

  getGameData(gameId: string) {
    onSnapshot(collection(this.firestore, 'games'), (snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.id === gameId) {
          this.gameDataUpdate(doc);
        }
      });
    });
  }

  gameDataUpdate(doc:any) {
    const gameData:any = doc.data();
    if (this.game) {
      this.game.stack = gameData.stack;
      this.game.players = gameData.players;
      this.game.playersPictures = gameData.playersPictures;
      this.game.playedCards = gameData.playedCards;
      this.game.currentPlayer = gameData.currentPlayer;
      this.game.pickCardAnimation = gameData.pickCardAnimation,
      this.game.current_card = gameData.current_card
    }
  }

  cardAnimation() {
    if (this.game) {
      if (this.game.stack.length === 0) {
        this.gameover = true;
      } else if (!this.game.pickCardAnimation) {
          this.game.pickCardAnimation = true;
          this.game.current_card = this.game.stack.pop() || '';
          this.saveGame();
          setTimeout(() => {
            if (this.game) {
              this.game.playedCards.push(this.game.current_card)
              this.game.pickCardAnimation = false;
              this.whichPlayerIsActive();
            }
          },1000);
        }
      } 
  }

  whichPlayerIsActive() {
    if (this.game) {
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; 
      this.saveGame();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);
    dialogRef.afterClosed().subscribe((name:string) => {
      if (name && name.length > 0) {
        this.game?.players.push(name);
        this.game?.playersPictures.push("./assets/img/profile-picture/profile.png");
        this.saveGame();
      }  
    });
  }

  saveGame() {
    if (this.game) {
      const gameDocRef = doc(this.firestore, "games", this.gameId);
      updateDoc(gameDocRef, this.game.toJson());
    }
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change:string) => {
      if (change) {
        if (change === "DELETE") {
          this.game.players.splice(playerId, 1);        
          this.game.playersPictures.splice(playerId, 1);        
        } else {
          this.game.playersPictures[playerId] = change;        

        }
        this.saveGame();
      }
    });
  }
}