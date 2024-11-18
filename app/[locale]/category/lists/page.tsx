import { getPostsByCategory } from "@/app/actions";
import Carrousel from "@/app/[locale]/components/carrousel";
import Container from "@/app/[locale]/components/container";
import { Navbar } from "@/app/[locale]/components/navbar";
import { MorePostsByCategory } from "@/app/[locale]/components/more-posts-by-category";
import { ListsHeader } from "@/app/[locale]/components/headers";

type Locale = "en" | "es";

interface Props {
  params: {
    locale: Locale;
  };
}

export default async function NewsPage({ params: { locale } }: Props) {
  const categoryId = 6;
  const carrouselPostsCount = 6;
  const morePostsCount = 9;

  const categoryCarrouselPosts = await getPostsByCategory(
    categoryId,
    0,
    carrouselPostsCount,
    locale
  );
  const categoryInitialMorePosts = await getPostsByCategory(
    categoryId,
    carrouselPostsCount,
    morePostsCount,
    locale
  );

  const carrouselPostIds = categoryCarrouselPosts.map((post) => post.id);

  return (
    <main>
      <Navbar />
      <ListsHeader />
      <Carrousel posts={categoryCarrouselPosts} />
      <Container>
        {categoryInitialMorePosts.length > 0 && (
          <MorePostsByCategory
            initialPosts={categoryInitialMorePosts}
            locale={locale}
            excludedPostIds={carrouselPostIds}
            categoryId={categoryId}
          />
        )}
      </Container>
    </main>
  );
}
