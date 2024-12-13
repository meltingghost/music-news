"use client";

import { SearchHeader } from "@/app/[locale]/components/headers";
import PostsSearchDisplay from "@/app/[locale]/components/posts-search-display";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/[locale]/components/navbar";
import { usePathname } from "next/navigation";

export default function SearchElements() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] as "en" | "es";
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <main>
      <Navbar locale={locale} />
      <SearchHeader query={query} />
      <PostsSearchDisplay locale={locale} query={query} />
    </main>
  );
}
