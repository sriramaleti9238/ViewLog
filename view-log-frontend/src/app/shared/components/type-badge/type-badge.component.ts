import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { WatchItemType } from '../../../core/models/watch-item.model';

@Component({
  selector: 'app-type-badge',
  standalone: true,
  imports: [CommonModule, TagModule],
  template: `
    <p-tag
      [value]="displayText"
      [severity]="severity"
      [rounded]="true">
    </p-tag>
  `
})
export class TypeBadgeComponent {
  @Input() type!: WatchItemType;

  get displayText(): string {
    const map: Record<WatchItemType, string> = {
      'MOVIE': 'Movie',
      'TV_SHOW': 'TV Show',
      'DOCUMENTARY': 'Documentary'
    };
    return map[this.type];
  }

  get severity(): 'success' | 'info' | 'danger' {
    const severityMap: Record<WatchItemType, 'success' | 'info' | 'danger'> = {
      'MOVIE': 'info',
      'TV_SHOW': 'danger',
      'DOCUMENTARY': 'success'
    };
    return severityMap[this.type];
  }
}
