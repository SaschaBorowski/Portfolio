import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { JoinModalComponent } from '../join-modal/join-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, JoinModalComponent, TranslateModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})

export class PortfolioComponent {

  joinIsHovered = false;
  elPolloLocoIsHovered = false;
  isModalOpen = false;

  currentProject: {
    number: string;
    title: string;
    image: string;
    description: string;

    githubLink: string;
    letsTestLink: string;

    languages: { name: string; icon: string }[];
  } | null = null;

  joinProject = {
    number: '01',
    title: 'Join',

    image: '../../assets/picture/join_overlay.png',
    description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',

    githubLink:'https://github.com/SaschaBorowski/Join',
    letsTestLink:'https://join.borowski-sascha.de/',

    languages: [
      { name: 'JavaScript', icon: '../../assets/icons/javascript_icon_lightblue_small.png' },
      { name: 'HTML', icon: '../../assets/icons/html_icon_lightblue_small.png' },
      { name: 'CSS', icon: '../../assets/icons/css_icon_lightblue_small.png' },
      { name: 'Firebase', icon: '../../assets/icons/firebase_icon_lightblue_small.png' }
    ]
  };

  elPolloLocoProject = {
    number: '02',
    title: 'El Pollo Loco',
    image: '../../assets/picture/elpolloloco_overlay.png',
    description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',

    githubLink:'https://github.com/SaschaBorowski/El-pollo-Loco',
    letsTestLink:'https://elpolloloco.borowski-sascha.de/',

    languages: [
      { name: 'HTML', icon: '../../assets/icons/html_icon_lightblue_small.png' },
      { name: 'CSS', icon: '../../assets/icons/css_icon_lightblue_small.png' },
      { name: 'JavaScript', icon: '../../assets/icons/javascript_icon_lightblue_small.png' }
    ]
  };

  onHoverEnterJoin() {
    this.joinIsHovered = true;
  }

  onHoverLeaveJoin() {
    this.joinIsHovered = false;
  }

  onHoverEnterElPolloLoco() {
    this.elPolloLocoIsHovered = true;
  }

  onHoverLeaveElPolloLoco() {
    this.elPolloLocoIsHovered = false;
  }

  openModal(project: 'join' | 'elPolloLoco') {
    this.isModalOpen = true;
    this.currentProject = project === 'join' ? this.joinProject : this.elPolloLocoProject;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }

  onOverlayClick(event: MouseEvent) {
    this.closeModal();
  }

  switchProject() {
    if (this.currentProject === this.joinProject) {
      this.currentProject = this.elPolloLocoProject;
    } else {
      this.currentProject = this.joinProject;
    }
  }

}
