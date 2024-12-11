import React, { Suspense } from "react";
import Container from "@/app/[locale]/components/container";
import { NavbarWrapper } from "@/app/[locale]/components/wrappers";
import Carrousel from "@/app/[locale]/components/carrousel";
import { MorePosts } from "@/app/[locale]/components/more-posts";
import Skeleton from "@/app/[locale]/components/skeleton";
import { Locale } from "@/app/[locale]/components/posts-logic";

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function Index({ params: { locale } }: Props) {
  return (
    <main>
      <Suspense>
        <NavbarWrapper locale={locale} />
      </Suspense>
      <Suspense>
        <Carrousel locale={locale} />
      </Suspense>
      <Container>
        <Suspense fallback={<Skeleton className="h-24 w-full rounded-md" />}>
          <MorePosts locale={locale} />
        </Suspense>
      </Container>
    </main>
  );
}
