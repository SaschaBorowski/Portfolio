import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from '../templates/footer/footer.component';
import { HeaderComponent } from '../templates/header/header.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterModule, FooterComponent, HeaderComponent, RouterLink, TranslateModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
