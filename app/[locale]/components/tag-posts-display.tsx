import { PostPreview } from "@/app/[locale]/components/post-preview";
import { useTranslations } from "next-intl";

type Post = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
};

interface TagPostsDisplayProps {
  posts: Post[];
  loading: boolean;
}

export default function TagPostsDisplay({
  posts,
  loading,
}: TagPostsDisplayProps) {
  const t = useTranslations("HomePage");
  return (
    <div className="p-12">
      {loading ? (
        <p className="text-center text-lg">{t("loading")}</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="p-4">
              <PostPreview
                title={post.title}
                coverImage={post.coverImage}
                date={new Date(post.publishedAt)}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">{t("noResults")}</p>
      )}
    </div>
  );
}
