import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./templates/header/header.component";
import { StartpageComponent } from "./startpage/startpage.component";
import { AboutmeComponent } from './aboutme/aboutme.component';
import { TechnologiesComponent } from './technologies/technologies.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, StartpageComponent,AboutmeComponent,TechnologiesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}