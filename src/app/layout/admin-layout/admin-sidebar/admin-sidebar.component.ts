import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar', // Updated selector
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-sidebar.component.html', // Updated template URL
  styleUrls: ['./admin-sidebar.component.css'] // Updated style URL
})
export class AdminSidebarComponent {
  @Input() isSidebarCollapsed: boolean = false; // Add this property
  isSubmenuOpen = {
    settings: false,
    transactions: false
  };

   

  toggleSubmenu(menu: 'settings' | 'transactions'): void {
    for (const key in this.isSubmenuOpen) {
      if (key !== menu) {
        this.isSubmenuOpen[key as 'settings' | 'transactions'] = false;
      }
    }
    this.isSubmenuOpen[menu] = !this.isSubmenuOpen[menu];
  }
}