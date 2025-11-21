import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule],
  template: `
    <div class="flex justify-content-center align-items-center" style="min-height: 400px;">
      <p-progressSpinner
        styleClass="w-4rem h-4rem"
        strokeWidth="4"
        animationDuration="1s">
      </p-progressSpinner>
    </div>
  `
})
export class LoadingSpinnerComponent {}
