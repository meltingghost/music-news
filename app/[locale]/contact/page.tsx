import Container from "@/app/[locale]/components/container";
import { Navbar } from "@/app/[locale]/components/navbar";
import { ContactHeader } from "@/app/[locale]/components/headers";
import ContactContent from "@/app/[locale]/components/contact-content";

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
      <ContactHeader />
      <Container>
        <ContactContent />
      </Container>
    </main>
  );
}
