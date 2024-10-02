import Post from "@/interfaces/post";
import Sources from "@/interfaces/sources";

export default interface NewsArticle {
  id: number;
  type: string;
  title: string;
  url: string;
  description: string | null;
  age: string | null;
  pageAge: string | null;
  scheme: string | null;
  netloc: string | null;
  hostname: string | null;
  favicon: string | null;
  path: string | null;
  thumbnail: string | null;
  sourceId: number;
  source: Sources;
  parsed: string;
  parsedTitle: string | null;
  parsedContent: string | null;
  parsedExcerpt: string | null;
  deleted: string;
  deletedReason: string | null;
  vectorized: string;
  embedding: string | null;
  storedImage: string;
  cloudinaryUrl: string | null;
  filtered: string;
  posted: string;
  createdAt: string;
  post: Post | null;
}
