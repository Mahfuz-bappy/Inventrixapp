import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-footer', // Updated selector
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-footer.component.html', // Updated template URL
  styleUrls: ['./admin-footer.component.css'] // Updated style URL
})
export class AdminFooterComponent {
  // Component logic here
}