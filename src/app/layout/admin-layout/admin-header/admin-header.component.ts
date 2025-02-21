import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  // @Input() isSidebarCollapsed: boolean = false;
  isDropdownOpen: boolean = false;
  isNotificationPanelOpen: boolean = false;

  constructor(private authService: AuthService) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleNotificationPanel(): void {
    this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}