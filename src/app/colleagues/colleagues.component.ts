import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-colleagues',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './colleagues.component.html',
  styleUrls: ['./colleagues.component.scss', './colleagues.component2.scss', './colleagues.component.responsive.scss', './colleagues.component.responsive2.scss']
})
export class ColleaguesComponent {
  boxes = [
    { description: '', author: '~ Vanessa Krämer' },
    { description: '', author: '~ Marcel Menke' },
    { description: '', author: '~ Mario Milaj' },
  ];

  currentIndex = 0;

  constructor(private translate: TranslateService) {
    this.updateTranslations();
    this.translate.onLangChange.subscribe(() => {
      this.updateTranslations();
    });
  }

  updateTranslations(): void {
    this.translate.get('colleagues.vanessa').subscribe((res: string) => {
      this.boxes[0].description = res;
    });
    this.translate.get('colleagues.marcel').subscribe((res: string) => {
      this.boxes[1].description = res;
    });
    this.translate.get('colleagues.mario').subscribe((res: string) => {
      this.boxes[2].description = res;
    });
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.boxes.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.boxes.length) % this.boxes.length;
  }

  goToIndex(index: number): void {
    this.currentIndex = index;
  }
}