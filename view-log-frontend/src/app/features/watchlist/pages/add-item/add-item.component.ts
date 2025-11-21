import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { WatchItemCreate } from '../../../../core/models/watch-item.model';
import { WatchItemService } from '../../../../core/services/watch-item.service';
import {WatchItemGenreOptions} from '../../../../core/models/genre-options.model';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    CheckboxModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(WatchItemService);
  private readonly router = inject(Router);
  private readonly msg = inject(MessageService);

  saving = signal(false);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    genre: ['', Validators.required],
    rating: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
    watched: [false],
    notes: ['']
  });

  typeOptions = [
    { label: 'Movie', value: 'MOVIE' },
    { label: 'TV Show', value: 'TV_SHOW' },
    { label: 'Documentary', value: 'DOCUMENTARY' }
  ];

  genreOptions = WatchItemGenreOptions

  onSubmit() {
    if (this.form.invalid) {
      console.log(this.form)
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const raw = this.form.value;

    const payload: WatchItemCreate = {
      ...raw
    };

    this.service.create(payload).subscribe({
      next: () => {
        this.msg.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Item added successfully'
        });
        setTimeout(() => this.router.navigate(['/']), 700);
      },
      error: () => {
        this.saving.set(false);
        this.msg.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add item'
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
