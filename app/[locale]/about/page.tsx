import Container from "@/app/[locale]/components/container";
import { NavbarWrapper } from "@/app/[locale]/components/wrappers";
import { AboutHeader } from "@/app/[locale]/components/headers";
import AboutContent from "@/app/[locale]/components/about-content";

type Locale = "en" | "es";

interface Props {
  params: {
    locale: Locale;
  };
}

export default async function NewsPage({ params: { locale } }: Props) {
  return (
    <main>
      <NavbarWrapper locale={locale} />
      <AboutHeader />
      <Container>
        <AboutContent />
      </Container>
    </main>
  );
}
