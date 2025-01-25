import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-join-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-modal.component.html',
  styleUrl: './join-modal.component.scss'
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