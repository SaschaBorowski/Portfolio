import { Component } from '@angular/core';
import { FooterComponent } from '../templates/footer/footer.component';
import { HeaderComponent } from '../templates/header/header.component';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule, RouterLink, TranslateModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

}
