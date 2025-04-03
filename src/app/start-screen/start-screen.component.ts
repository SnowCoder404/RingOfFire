import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from "@angular/router"
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Game } from '../models/game';

@Component({
  selector: 'app-start-screen',
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  constructor(private firestore: Firestore, private router: Router) {

  }

  async startGame() {
    let game = new Game;
    let docRef = await addDoc(collection(this.firestore, "games"), game.toJson())
    this.router.navigateByUrl("/game/" + docRef.id);
  }
}
