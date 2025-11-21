
export interface SelectOption<T = any> {
  label: string;
  value: T;
}

const GENRES = [
  'ACTION', 'ADVENTURE', 'COMEDY', 'DRAMA', 'FANTASY', 'HORROR',
  'MYSTERY', 'ROMANCE', 'SCI_FI', 'THRILLER', 'CRIME', 'FAMILY',
  'ANIMATION', 'DOCUMENTARY', 'HISTORY', 'BIOGRAPHY', 'NATURE',
  'SCIENCE', 'TRAVEL', 'MUSIC', 'SPORTS'
];

export const WatchItemGenreOptions: SelectOption[] = GENRES.map(
  g => ({
    label: toTitleCase(g),
    value: g
  })
);

function toTitleCase(str: string) {
  return str
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}
