import Container from "@/app/[locale]/components/container";
import Navbar from "@/app/[locale]/components/navbar";
import ContactContent from "@/app/[locale]/components/contact-content";
import { Suspense } from "react";
import Skeleton from "@/app/[locale]/components/skeleton";
import { ContactHeaderWrapper } from "@/app/[locale]/components/headers-wrappers";

type Locale = "en" | "es";

interface Props {
  params: {
    locale: Locale;
  };
}

export default async function NewsPage({ params: { locale } }: Props) {
  return (
    <main>
      <Suspense fallback={<Skeleton className="h-24 w-full rounded-md" />}>
        <Navbar locale={locale} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-24 w-full rounded-md" />}>
        <ContactHeaderWrapper />
      </Suspense>
      <Container>
        <Suspense fallback={<Skeleton className="h-24 w-full rounded-md" />}>
          <ContactContent />
        </Suspense>
      </Container>
    </main>
  );
}
