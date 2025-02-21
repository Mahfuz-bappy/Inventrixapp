import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public router: Router; 
  @Input() isSidebarCollapsed: boolean = false; // Add this Input property, type is boolean
  subMenuStates: { [key: string]: boolean } = {}; // To track submenu open/close state

  menuItems = [
    {
      id: 'menu-1',
      label: 'My Store',
      icon: 'bi bi-menu-down', // Example Bootstrap Icon class
      route: '/storeboard',       // <--- Add route for Menu 1 (Dashboard)
      submenu: [
        { label: 'Dashboard', route: '/storeboard/dashboard' }, // Example route for submenu item
        { label: 'settings', route: '/storeboard/settings' }, // Example route for submenu item
        { label: 'Users', route: '/storeboard/Users' }, // Example route for submenu item
         
      ],
    },
    // {
    //   id: 'menu-2',
    //   label: 'Users',
    //   icon: 'bi bi-people',   // Example icon
    //   route: '/users',         // <--- Add route for Users
    // },
    {
      id: 'menu-3',
      label: 'Settings',
      icon: 'bi bi-gear',     // Example icon
      route: '/storeboard/storeboard1',       // <--- Add route for Settings
    },
   
    // ... more menu items ...
  ];
  constructor(router: Router) {
    this.router = router;
   }

  isSubMenuOpen(menuId: string): boolean { 
    const menuItem = this.menuItems.find(item => item.id === menuId); // Find the menu item
    if (menuItem && menuItem.route) {
      // Check if the current URL starts with the menu item's route
      return this.router.url.startsWith(menuItem.route);
    }
    return this.subMenuStates[menuId] || false; // Default to closed if state not set 
     
  }

  toggleSubMenu(menuId: string): void {
    // this.subMenuStates[menuId] = !this.isSubMenuOpen(menuId);
    this.subMenuStates[menuId] = !this.subMenuStates[menuId];
  }
  isSubmenuToggledOpen(menuId: string): boolean { // Renamed to isSubmenuToggledOpen
    const isOpen = this.subMenuStates[menuId] || false;
    console.log(`isSubmenuToggledOpen('${menuId}'):`, isOpen); // ADD LOG
    return isOpen; // Still returns the toggle state from subMenuStates
  }

  isMenuItemActiveByRoute(menuItem: any): boolean { // New method for route-based active state
    if (menuItem && menuItem.route) {
      return this.router.url.startsWith(menuItem.route);
    }
    return false; // Not active by route if no route or route doesn't match URL
  }

  toggleSubMenu_extra(menuId: string): void {
    // Collapse all other submenus first
    console.log('toggleSubMenu called for:', menuId, 'Current State:', this.subMenuStates[menuId]); // ADD LOG BEFORE TOGGLE
    // Collapse all other submenus first


    Object.keys(this.subMenuStates).forEach(key => {
      if (key !== menuId) {
        this.subMenuStates[key] = false; // Collapse other submenus
        console.log(`  Collapsing submenu: ${key}`); // AD
      }
    });
    // Toggle the current submenu
    this.subMenuStates[menuId] = !this.subMenuStates[menuId];
    console.log('  New State for', menuId, ':', this.subMenuStates[menuId]); // ADD LOG AFTER TOGGLE
  }

  collapseAllSubmenus(): void { // New method to collapse all submenus
    Object.keys(this.subMenuStates).forEach(key => {
      this.subMenuStates[key] = false; // Collapse all submenus
    });
  }

}
