import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  allProfilePictures = [
    './assets/img/profile-picture/profile.png',
    './assets/img/profile-picture/female-profile.png',
    './assets/img/profile-picture/linux.jpg',
    './assets/img/profile-picture/cat.webp'
  ];
}
