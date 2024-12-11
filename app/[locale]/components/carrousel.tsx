import {
  CarrouselPosts,
  SlideIndicator,
  ButtonLeft,
  ButtonRight,
} from "@/app/[locale]/components/carrousel-logic";
import {
  fetchCarrouselPosts,
  Locale,
} from "@/app/[locale]/components/posts-logic";

type CarrouselProps = {
  locale: Locale;
};

export default async function Carrousel({ locale }: CarrouselProps) {
  const { carrouselPosts } = await fetchCarrouselPosts(locale);

  return (
    <section className="relative w-screen h-[80vh] overflow-hidden">
      {carrouselPosts.posts.map((post, index) => (
        <CarrouselPosts post={post} index={index} key={post.id} />
      ))}
      <ButtonLeft totalSlides={carrouselPosts.totalPosts} />
      <ButtonRight totalSlides={carrouselPosts.totalPosts} />
      <SlideIndicator
        posts={carrouselPosts.posts}
        totalPosts={carrouselPosts.totalPosts}
      />
    </section>
  );
}
