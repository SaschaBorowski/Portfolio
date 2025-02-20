import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-join-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.scss', './join-modal.component2.scss', './join-modal.component.responsive.scss', './join-modal.component.responsive2.scss']
})

export class JoinModalComponent {
  @Input() projectData: {
    number: string;
    title: string;
    image: string;
    description: string;
    githubLink: string;
    letsTestLink: string;
    languages: { name: string; icon: string }[];
  } | null = null;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}