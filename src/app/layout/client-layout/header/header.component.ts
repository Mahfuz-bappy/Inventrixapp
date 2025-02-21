import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() toggleSidebar!: () => void; // Add this Input property, type is function

  // toggleSidebar() {
  //   // Will be implemented later to toggle sidebar visibility
  //   console.log('Toggle Sidebar Icon Clicked');
  // }

  toggleNotifications() {
    // Will be implemented later to show/hide notifications
    console.log('Toggle Notifications Icon Clicked');
  }

  toggleMessages() {
    // Will be implemented later to show/hide messages
    console.log('Toggle Messages Icon Clicked');
  }

}
