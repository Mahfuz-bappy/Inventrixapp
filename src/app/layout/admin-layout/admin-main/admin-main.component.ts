import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-main', // Updated selector
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-main.component.html', // Updated template URL
  styleUrls: ['./admin-main.component.css'] // Updated style URL
})
export class AdminMainComponent {
  // Component logic here
}