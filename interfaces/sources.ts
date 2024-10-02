import NewsArticle from "@/interfaces/newsArticle";

export default interface Sources {
  id: number;
  title: string;
  url: string;
  articles: NewsArticle[];
  updatedAt: String | null;
}
