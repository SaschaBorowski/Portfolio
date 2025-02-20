import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, RouterModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer.component.responsive.scss']
})

export class FooterComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}