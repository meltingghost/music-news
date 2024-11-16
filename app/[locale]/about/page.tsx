import Container from "@/app/[locale]/components/container";
import { Navbar } from "@/app/[locale]/components/navbar";
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
      <Navbar />
      <AboutHeader />
      <Container>
        <AboutContent />
      </Container>
    </main>
  );
}
