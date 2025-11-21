export type WatchItemType = 'MOVIE' | 'TV_SHOW' | 'DOCUMENTARY';

export interface WatchItem {
  id: number;
  name: string;
  type: WatchItemType;
  genre: string;
  rating: number;
  watched: boolean;
  notes: string;
}

export interface WatchItemCreate {
  name: string;
  type: WatchItemType;
  genre: string;
  releaseDate: string;
  rating: number;
  watched: boolean;
  notes: string;
}
