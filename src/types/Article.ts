export interface Article {
  stopPropagation(): unknown;
  source: { name: string };
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  author: string;
}
