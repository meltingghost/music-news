import Post from "@/interfaces/post";
import { PostPreview } from "@/components/post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-1">
          <PostPreview
            key={posts[0].slug}
            title={posts[0].title}
            coverImage={posts[0].coverImage}
            date={posts[0].publishedAt}
            slug={posts[0].slug}
            excerpt={posts[0].excerpt}
          />
        </div>
        <div className="flex flex-col space-y-8">
          {posts.slice(1, 4).map((post) => (
            <div key={post.slug}>
              <PostPreview
                title={post.title}
                coverImage={post.coverImage}
                date={post.publishedAt}
                slug={post.slug}
                excerpt={""}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
