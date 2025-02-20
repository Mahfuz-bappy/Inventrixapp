import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MainComponent } from "./main/main.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-client-layout',
  imports: [RouterModule, HeaderComponent, SidebarComponent, MainComponent, FooterComponent],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {

}
