import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
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
  private scrollTarget: string | null = null;

  constructor(private translate: TranslateService, private router: Router) {
    this.translate.addLangs(['de', 'en']);

    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      this.activeLanguage = savedLang;
      this.translate.use(savedLang);
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.scrollTarget) {
        setTimeout(() => {
          this.scrollToElement(this.scrollTarget!);
          this.scrollTarget = null;
        }, 300);
      }
    });
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
    localStorage.setItem('language', lang);
  }

  scrollTo(sectionId: string): void {
    if (this.router.url === '/') {
      this.scrollToElement(sectionId);
    } else {
      this.scrollTarget = sectionId;
      this.router.navigate(['/']);
    }
  }

  private scrollToElement(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}