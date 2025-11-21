import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-watched-toggle',
  standalone: true,
  imports: [CommonModule, ButtonModule, Tooltip],
  template: `
    <p-button
      [icon]="watched ? 'pi pi-check-circle' : 'pi pi-times-circle'"
      [severity]="watched ? 'success' : 'secondary'"
      [rounded]="true"
      [text]="true"
      (onClick)="toggle.emit()"
      [pTooltip]="watched ? 'Mark as unwatched' : 'Mark as watched'"
      tooltipPosition="top">
    </p-button>
  `
})
export class WatchedToggleComponent {
  @Input() watched = false;
  @Output() toggle = new EventEmitter<void>();
}
