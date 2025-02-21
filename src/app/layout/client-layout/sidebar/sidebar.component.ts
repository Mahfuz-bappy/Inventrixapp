import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isSidebarCollapsed: boolean = false; // Add this Input property, type is boolean
  subMenuStates: { [key: string]: boolean } = {}; // To track submenu open/close state



  menuItems = [
    {
      id: 'menu-1',
      label: 'Menu 1',
      icon: 'bi bi-menu-down', // Example Bootstrap Icon class
      route: '/storeboard',       // <--- Add route for Menu 1 (Dashboard)
      submenu: [
        { label: 'Sub-item 1.1', route: '/storeboard' }, // Example route for submenu item
        { label: 'Sub-item 1.2', route: '/users' },    // Example route for submenu item
      ],
    },
    {
      id: 'menu-2',
      label: 'Users',
      icon: 'bi bi-people',   // Example icon
      route: '/users',         // <--- Add route for Users
    },
    {
      id: 'menu-3',
      label: 'Settings',
      icon: 'bi bi-gear',     // Example icon
      route: '/settings',       // <--- Add route for Settings
    },
    // ... more menu items ...
  ];


  isSubMenuOpen(menuId: string): boolean {
    return this.subMenuStates[menuId] || false; // Default to closed if state not set
     
  }

  toggleSubMenu(menuId: string): void {
    // this.subMenuStates[menuId] = !this.isSubMenuOpen(menuId);
    this.subMenuStates[menuId] = !this.subMenuStates[menuId];
  }


}
