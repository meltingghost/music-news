import {
  fetchCarrouselPosts,
  Locale,
} from "@/app/[locale]/components/posts-logic";
import CarrouselLogicWrapper from "@/app/[locale]/components/carrousel-logic-wrapper";

type CarrouselProps = {
  locale: Locale;
};

export default async function Carrousel({ locale }: CarrouselProps) {
  const { carrouselPosts } = await fetchCarrouselPosts(locale);

  return <CarrouselLogicWrapper carrouselPosts={carrouselPosts} />;
}
