import { CommonModule} from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() name: string | undefined;
  @Input() image: string | undefined;
  @Input() playerActive: boolean = false;

}
