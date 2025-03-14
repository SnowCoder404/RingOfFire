import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  players:string[] = [];

  setPlayer(player: string) {
    this.players.push(player)
  }
}
