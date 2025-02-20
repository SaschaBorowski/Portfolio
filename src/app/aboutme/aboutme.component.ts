import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss', './aboutme.component.responsive.scss', './aboutme.component.responsive2.scss']
})

export class AboutmeComponent {
}