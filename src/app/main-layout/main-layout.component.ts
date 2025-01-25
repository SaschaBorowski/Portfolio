import { Component } from '@angular/core';
import { HeaderComponent } from '../templates/header/header.component';
import { StartpageComponent } from '../startpage/startpage.component';
import { AboutmeComponent } from '../aboutme/aboutme.component';
import { TechnologiesComponent } from '../technologies/technologies.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ColleaguesComponent } from '../colleagues/colleagues.component';
import { ContactmeComponent } from '../contactme/contactme.component';
import { FooterComponent } from '../templates/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ HeaderComponent, StartpageComponent, AboutmeComponent, TechnologiesComponent, PortfolioComponent, ColleaguesComponent, ContactmeComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
}
