import Container from "@/app/[locale]/components/container";
import Navbar from "@/app/[locale]/components/navbar";
import { AboutHeaderWrapper } from "@/app/[locale]/components/headers-wrappers";
import AboutContent from "@/app/[locale]/components/about-content";
import { Suspense } from "react";
import Skeleton from "@/app/[locale]/components/skeleton";

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
        <AboutHeaderWrapper />
      </Suspense>
      <Container>
        <Suspense fallback={<Skeleton className="h-24 w-full rounded-md" />}>
          <AboutContent />
        </Suspense>
      </Container>
    </main>
  );
}
