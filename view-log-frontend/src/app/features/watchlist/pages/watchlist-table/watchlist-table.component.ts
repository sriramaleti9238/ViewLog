import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

import { WatchItem, WatchItemType } from '../../../../core/models/watch-item.model';
import { WatchItemService } from '../../../../core/services/watch-item.service';
import {WatchItemGenreOptions} from '../../../../core/models/genre-options.model';
import {DrawerModule} from 'primeng/drawer';
import {AboutComponent} from '../../../../shared/components/about/about.component';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-watchlist-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DrawerModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ToastModule,
    DialogModule,
    AboutComponent
  ],
  providers: [MessageService],
  templateUrl: './watchlist-table.component.html',
  styleUrl: './watchlist-table.component.scss'
})
export class WatchlistTableComponent implements OnInit {
  private readonly service = inject(WatchItemService);
  private readonly router = inject(Router);
  private readonly msg = inject(MessageService);

  items = signal<WatchItem[]>([]);
  filteredItems = signal<WatchItem[]>([]);
  loading = signal(true);

  searchText = '';
  selectedType: string = '';
  selectedGenre: string = '';
  selectedWatched: string = '';

  deleteDialog = false;
  itemToDelete: WatchItem | null = null;

  typeOptions = [
    { label: 'Movie', value: 'MOVIE' },
    { label: 'Series', value: 'TV_SHOW' },
    { label: 'Documentary', value: 'DOCUMENTARY' }
  ];

  visible = signal(false);

  open() {
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }

  refreshSub!: Subscription;

  genreOptions = WatchItemGenreOptions

  watchedOptions = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' }
  ];

  ngOnInit() {
    this.loadItems();

    this.refreshSub = interval(870000).subscribe(() => {
      this.loadItems();
    });
  }

  loadItems() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.applyFilters();
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.msg.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load items'
        });
      }
    });
  }

  clearFilters() {
    this.selectedType = '';
    this.selectedGenre = '';
    this.selectedWatched = '';
    this.searchText = '';

    this.applyFilters();
  }


  applyFilters() {
    let list = [...this.items()];

    this.items().forEach((x)=> {
      console.log(x)
    })
    if (this.searchText) {
      list = list.filter(i =>
        i.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.selectedType) {
      list = list.filter(i => i.type === this.selectedType);
    }

    if (this.selectedGenre) {
      list = list.filter(i => i.genre === this.selectedGenre);
    }

    if (this.selectedWatched) {
      const watched = this.selectedWatched === 'true';
      list = list.filter(i => i.watched === watched);
    }

    this.filteredItems.set(list);
  }

  getTypeBadgeClass(type: WatchItemType): string {
    const map: Record<WatchItemType, string> = {
      'MOVIE': 'badge-movie',
      'TV_SHOW': 'badge-series',
      'DOCUMENTARY': 'badge-documentary'
    };
    return map[type] || 'badge-movie';
  }

  getTypeLabel(type: WatchItemType): string {
    const map: Record<WatchItemType, string> = {
      'MOVIE': 'Movie',
      'TV_SHOW': 'Series',
      'DOCUMENTARY': 'Documentary'
    };
    return map[type] || type;
  }

  toggleWatched(item: WatchItem) {
    this.service.toggleWatched(item.id).subscribe({
      next: (updated) => {
        const arr = [...this.items()];
        const idx = arr.findIndex(i => i.id === item.id);
        if (idx !== -1) arr[idx] = updated;
        this.items.set(arr);
        this.applyFilters();
        this.msg.add({
          severity: 'success',
          summary: 'Success',
          detail: `Marked as ${updated.watched ? 'watched' : 'unwatched'}`
        });
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to update' });
      }
    });
  }

  confirmDelete(item: WatchItem) {
    this.itemToDelete = item;
    this.deleteDialog = true;
  }

  deleteItem() {
    if (!this.itemToDelete) return;

    this.service.delete(this.itemToDelete.id).subscribe({
      next: () => {
        this.items.set(this.items().filter(i => i.id !== this.itemToDelete!.id));
        this.applyFilters();
        this.msg.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Item deleted successfully'
        });
        this.deleteDialog = false;
        this.itemToDelete = null;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: 'Delete failed' });
      }
    });
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }

  editItem(id: number) {
    this.router.navigate(['/edit', id]);
  }

  ngOnDestroy() {
    this.refreshSub?.unsubscribe();
  }
}
