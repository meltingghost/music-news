"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Locale } from "./posts-logic";

type Tag = {
  name: string;
  translations: { en: string; es: string };
};

type NavbarButtonsProps = {
  locale: Locale;
  tags: Tag[];
};

export default function NavbarButtons({ locale, tags }: NavbarButtonsProps) {
  const t = useTranslations("HomePage");
  const pathname = usePathname();
  const isActiveLink = (href: string) => {
    const localizedHref = `/${locale}${href}`;
    return pathname === href || pathname === localizedHref;
  };
  return (
    <div className="hidden sm:flex space-x-8 my-4">
      {tags.map((tag, idx) => (
        <Link
          key={idx}
          className={`text-sm lg:text-lg capitalize ${
            isActiveLink(`/tag/${tag.name}`)
              ? "text-white underline underline-offset-8 decoration-white"
              : "text-gray-300 hover:text-white"
          }`}
          href={`/tag/${tag.name}`}
        >
          {tag.name}
        </Link>
      ))}
      <Link
        key={6}
        className={`text-sm lg:text-lg ${
          isActiveLink("/about")
            ? "text-white underline underline-offset-8 decoration-white"
            : "text-gray-300 hover:text-white"
        }`}
        href="/about"
      >
        {t("navbar8")}
      </Link>
      <Link
        key={7}
        className={`text-sm lg:text-lg ${
          isActiveLink("/contact")
            ? "text-white underline underline-offset-8 decoration-white"
            : "text-gray-300 hover:text-white"
        }`}
        href="/contact"
      >
        {t("navbar9")}
      </Link>
    </div>
  );
}
