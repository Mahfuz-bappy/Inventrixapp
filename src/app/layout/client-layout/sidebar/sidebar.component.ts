import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isSidebarCollapsed: boolean = false; // Add this Input property, type is boolean
  subMenuStates: { [key: string]: boolean } = {}; // To track submenu open/close state

  isSubMenuOpen(menuId: string): boolean {
    return this.subMenuStates[menuId] || false; // Default to closed if state not set
  }

  toggleSubMenu(menuId: string): void {
    this.subMenuStates[menuId] = !this.isSubMenuOpen(menuId);
  }


}
