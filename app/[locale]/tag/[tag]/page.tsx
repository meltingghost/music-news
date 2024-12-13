import { Suspense } from "react";
import Skeleton from "@/app/[locale]/components/skeleton";
import TagPageContentWrapper from "@/app/[locale]/components/tag-page-content-wrapper";

export default function TagPage() {
  return (
    <main>
      <Suspense fallback={<Skeleton className="h-24 w-full rounded-md" />}>
        <TagPageContentWrapper />
      </Suspense>
    </main>
  );
}
