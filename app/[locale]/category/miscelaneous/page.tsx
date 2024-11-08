import { getPostsByCategory } from "@/app/actions";
import Carrousel from "@/app/[locale]/components/carrousel";
import Container from "@/app/[locale]/components/container";
import { Navbar } from "@/app/[locale]/components/navbar";
import { MorePosts } from "@/app/[locale]/components/more-posts";
import { MiscHeader } from "@/app/[locale]/components/headers";

type Locale = "en" | "es";

interface Props {
  params: {
    locale: Locale;
  };
}

export default async function NewsPage({ params: { locale } }: Props) {
  const categoryId = 4;
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

  return (
    <main>
      <Navbar />
      <MiscHeader />
      <Carrousel posts={categoryCarrouselPosts} />
      <Container>
        {categoryInitialMorePosts.length > 0 && (
          <MorePosts initialPosts={categoryInitialMorePosts} locale={locale} />
        )}
      </Container>
    </main>
  );
}
