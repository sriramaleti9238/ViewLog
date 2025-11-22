import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';

import { WatchItemCreate, WatchItem } from '../../../../core/models/watch-item.model';
import { WatchItemService } from '../../../../core/services/watch-item.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import {WatchItemGenreOptions} from '../../../../core/models/genre-options.model';
import {SelectModule} from 'primeng/select';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CardModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    LoadingSpinnerComponent
  ],
  providers: [MessageService],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(WatchItemService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly msg = inject(MessageService);

  loading = signal(true);
  saving = signal(false);
  itemId!: number;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    genre: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
    watched: [false],
    notes: ['']
  });

  typeOptions = [
    { label: 'Movie', value: 'MOVIE' },
    { label: 'TV Show', value: 'TV_SHOW' },
    { label: 'Documentary', value: 'DOCUMENTARY' }
  ];
  filteredTypes: any[] = [];

  genreOptions = WatchItemGenreOptions
  filteredGenres: any[] = [];

  filterTypes(event: any) {
    const q = event.query.toLowerCase();
    this.filteredTypes = this.typeOptions.filter(o => o.label.toLowerCase().includes(q));
  }

  filterGenres(event: any) {
    const q = event.query.toLowerCase();
    this.filteredGenres = this.genreOptions.filter(o => o.label.toLowerCase().includes(q));
  }

  ngOnInit() {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Editing item:", this.itemId);
    this.loadItem();
  }


  loadItem() {
    this.service.getById(this.itemId).subscribe({
      next: (item: WatchItem) => {
        this.form.patchValue({
          name: item.name,
          type: item.type,
          genre: item.genre,
          rating: item.rating,
          watched: item.watched,
          notes: item.notes
        });
        this.loading.set(false);
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to load item' });
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.saving.set(true);

    const raw = this.form.value;

    const payload: WatchItemCreate = {
      ...raw
    };

    this.service.update(this.itemId, payload).subscribe({
      next: () => {
        this.msg.add({ severity: 'success', summary: 'Success', detail: 'Item updated' });
        setTimeout(() => this.router.navigate(['/']), 700);
      },
      error: () => {
        this.saving.set(false);
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to update item' });
      }
    });
  }


  goBack() {
    this.router.navigate(['/']);
  }
}
