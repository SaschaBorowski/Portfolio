import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MainLayoutComponent } from './main-layout/main-layout.component'; 
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'legal-notice',
        component: LegalNoticeComponent
      }
];
