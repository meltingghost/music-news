import SearchElementsWrapper from "@/app/[locale]/components/search-elements-wrapper";
import { Suspense } from "react";
import Skeleton from "@/app/[locale]/components/skeleton";

export default function SearchPage() {
  return (
    <main>
      <Suspense fallback={<Skeleton className="h-24 w-full rounded-md" />}>
        <SearchElementsWrapper />
      </Suspense>
    </main>
  );
}
