import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, AdminHeaderComponent, AdminSidebarComponent, AdminMainComponent, AdminFooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  isSidebarCollapsed: boolean = false; // Add this line - initially sidebar is not collapsed
  constructor() { }
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; // Toggle the boolean value
    console.log('Sidebar Collapsed:', this.isSidebarCollapsed); 
  }
}