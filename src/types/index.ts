export interface Article {
  id: number;
  title: string;
  abstract: string | null;
  authors: string | null;
  published_date: Date | null;
}