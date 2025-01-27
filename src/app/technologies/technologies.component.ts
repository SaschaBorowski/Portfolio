import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss', './technologies.component2.scss', './technologies.component.responsive.scss', './technologies.component.responsive2.scss']
})
export class TechnologiesComponent {
  isPopupVisible = false;
  popupX = 0;
  popupY = 0;

  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  onMouseEnter(event: MouseEvent) {
    if (window.innerWidth >= 1250) { 
      this.isPopupVisible = true;
      this.updatePopupPosition(event); 
    }
  }

  onMouseMove(event: MouseEvent) {
    if (window.innerWidth >= 1250) {
      this.updatePopupPosition(event);
    }
  }

  onMouseLeave() {
    if (window.innerWidth >= 1250) {
      this.isPopupVisible = false;
    }
  }

  onContainerClick(event: MouseEvent) {
    if (window.innerWidth < 1250) {
      this.isPopupVisible = !this.isPopupVisible;
      this.updatePopupPosition(event);
    }
  }

  private updatePopupPosition(event: MouseEvent) {
    const containerRect = this.containerRef.nativeElement.getBoundingClientRect();
    this.popupX = event.clientX - containerRect.left - 52;
    this.popupY = event.clientY - containerRect.top - 130;
    if (window.innerWidth < 450) {
      this.popupX = event.clientX - containerRect.left - -13;
    this.popupY = event.clientY - containerRect.top - 73;
    }
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
