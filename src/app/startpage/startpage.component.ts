import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss', './startpage.component2.scss', './startpage.component.responsive.scss', './startpage.component.responsive2.scss']
})

export class StartpageComponent {
  constructor(private translate: TranslateService){
    if (!this.translate.currentLang) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
  }




  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
