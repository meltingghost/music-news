"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/[locale]/components/navbar";
import { Locale } from "@/app/[locale]/components/posts-logic";

type CarrouselProps = {
  locale: Locale;
};

export function NavbarWrapper({ locale }: CarrouselProps) {
  const pathname = usePathname();
  return <Navbar locale={locale} pathname={pathname} />;
}
