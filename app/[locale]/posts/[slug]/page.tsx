import { getPostBySlug } from "@/app/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/[locale]/components/navbar";
import { Suspense } from "react";
import Skeleton from "@/app/[locale]/components/skeleton";
import { Locale } from "@/app/[locale]/components/posts-logic";

type Props = {
  params: {
    locale: Locale;
    slug: string;
  };
};

export default async function PostPage({ params: { locale, slug } }: Props) {
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return notFound();
  }

  return (
    <main>
      <Suspense fallback={<Skeleton className="h-24 w-full rounded-md" />}>
        <Navbar locale={locale} />
      </Suspense>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1
          className="text-4xl font-bold text-gray-800 mb-6"
          dangerouslySetInnerHTML={{
            __html: post.title.replace(/\*(.*?)\*/g, "<strong>$1</strong>"),
          }}
        />
        <div className="w-20 h-1 bg-black mb-4"></div>
        <p className="text-gray-500 mb-4">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>

        <div className="mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>

        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-xl">
          {post.content.split(/\n{2,}/).map((paragraph, index) => (
            <p
              key={index}
              className="mb-6"
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*(.*?)\*/g, "<strong>$1</strong>"),
              }}
            />
          ))}
        </article>
      </div>
    </main>
  );
}
