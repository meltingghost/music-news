import Container from "@/app/[locale]/components/container";
import { NavbarWrapper } from "@/app/[locale]/components/wrappers";
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
      <NavbarWrapper locale={locale} />
      <ContactHeader />
      <Container>
        <ContactContent />
      </Container>
    </main>
  );
}
