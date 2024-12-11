import { fetchTags } from "@/app/lib/fetches";
import { Locale } from "@/app/[locale]/components/posts-logic";
import RandomGradientLogo from "./random-gradient-logo";
import LocalizationDropdown from "./localization-dropdown";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import NavbarInteractions from "@/app/[locale]/components/navbar-logic";

type NavbarProps = {
  locale: Locale;
  pathname: string;
};

type Tag = {
  name: string;
  translations: { en: string; es: string };
};

export default async function Navbar({ locale, pathname }: NavbarProps) {
  const tags = await fetchTags(locale);
  const t = useTranslations("HomePage");

  const isActiveLink = (href: string) => {
    const localizedHref = `/${locale}${href}`;
    return pathname === href || pathname === localizedHref;
  };

  return (
    <div className="flex flex-col">
      <div className="bg-black lg:flex lg:flex-row lg:justify-between shadow-md sticky top-0 z-50">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center md:mx-20 lg:mx-12 justify-between w-full sm:w-auto">
            <RandomGradientLogo />
            <NavbarInteractions tags={tags} locale={locale} />
          </div>

          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <LocalizationDropdown />
            <button className="bg-slate-400 text-black font-bold py-3 px-8 md:mx-20 lg:mx-12 rounded-full hover:bg-white dark:hover:bg-white dark:hover:text-black duration-200 transition-colors mt-2 sm:mt-0">
              {t("subscribeButton")}
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-black shadow-md sticky top-0 z-40 border-t border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:flex space-x-8 my-4">
            {tags.map((tag: Tag, idx: number) => (
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
        </div>
      </nav>
    </div>
  );
}
