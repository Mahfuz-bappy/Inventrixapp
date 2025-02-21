import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar', // Updated selector
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sidebar.component.html', // Updated template URL
  styleUrls: ['./admin-sidebar.component.css'] // Updated style URL
})
export class AdminSidebarComponent {
  @Input() isSidebarCollapsed: boolean = false; // Add this property
}