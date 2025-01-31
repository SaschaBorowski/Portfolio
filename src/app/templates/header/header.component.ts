import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.component.responsive.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  activeLanguage: string = 'en';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);

    // Gespeicherte Sprache aus dem localStorage laden
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      this.activeLanguage = savedLang;
      this.translate.use(savedLang);
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
  }

  ngOnInit() {
    this.switchLanguage(this.activeLanguage); 
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.activeLanguage = lang;
    localStorage.setItem('language', lang); // Sprache im localStorage speichern
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
