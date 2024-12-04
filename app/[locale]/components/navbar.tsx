"use client";

import { Link, routing } from "@/i18n/routing";
import { useEffect, useState } from "react";
import RandomGradientLogo from "./random-gradient-logo";
import LocalizationDropdown from "./localization-dropdown";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [tags, setTags] = useState<{ name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] || "en";

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch(`/api/tags/tags?locale=${currentLocale}`);
        const data = await res.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, [currentLocale]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchUrl = `/${currentLocale}/search?query=${encodeURIComponent(
      search
    )}`;
    window.location.href = searchUrl;
  };

  const isActiveLink = (href: string) => {
    const localizedHref = `/${routing.defaultLocale}${href}`;
    return pathname === href || pathname === localizedHref;
  };

  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col">
      <div className="bg-black lg:flex lg:flex-row lg:justify-between shadow-md sticky top-0 z-50">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center md:mx-20 lg:mx-12 justify-between w-full sm:w-auto">
            <RandomGradientLogo />
            <button
              className="sm:hidden text-gray-300 text-xl hover:text-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              ☰
            </button>
          </div>

          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            {!isSearchVisible && (
              <button
                onClick={() => setIsSearchVisible(true)}
                className="text-gray-300 hover:text-white"
              >
                &#x1F50D;
              </button>
            )}

            {isSearchVisible && (
              <div className="relative transition-all duration-300 ease-in-out transform">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("searchbar")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    &#x1F50D;
                  </button>
                </form>
                <button
                  onClick={() => setIsSearchVisible(false)}
                  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-black rounded-full w-4 h-4 flex items-center justify-center"
                >
                  &#x2716;
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 sm:px-6 lg:px-8">
          <LocalizationDropdown />
          <button className="bg-slate-400 text-black font-bold py-3 px-8 md:mx-20 lg:mx-12 rounded-full hover:bg-white dark:hover:bg-white dark:hover:text-black duration-200 transition-colors mt-2 sm:mt-0">
            {t("subscribeButton")}
          </button>
        </div>
      </div>

      <nav className="bg-black shadow-md sticky top-0 z-40 border-t border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isDropdownOpen && (
            <div className="block sm:hidden space-y-2 py-4">
              {tags.map((tag, idx) => (
                <Link
                  key={idx}
                  className={`text-sm lg:text-lg capitalize ${
                    isActiveLink(`/${currentLocale}/tag/${tag.name}`)
                      ? "text-white underline underline-offset-8 decoration-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                  href={`/${currentLocale}/tag/${tag.name}`}
                >
                  {tag.name}
                </Link>
              ))}
              <Link
                key={6}
                className={`block text-lg ${
                  isActiveLink(`/${currentLocale}/about`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href={`/about`}
              >
                {t(`navbar8`)}
              </Link>
              <Link
                key={7}
                className={`block text-lg ${
                  isActiveLink(`/${currentLocale}/contact`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href={`/contact`}
              >
                {t(`navbar9`)}
              </Link>
            </div>
          )}

          <div className="hidden sm:flex space-x-8 my-4">
            {tags.map((tag, idx) => (
              <Link
                key={idx}
                className={`text-sm lg:text-lg capitalize ${
                  isActiveLink(`/${currentLocale}/tag/${tag.name}`)
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
                isActiveLink(`/${currentLocale}/about`)
                  ? "text-white underline underline-offset-8 decoration-white"
                  : "text-gray-300 hover:text-white"
              }`}
              href={`/about`}
            >
              {t(`navbar8`)}
            </Link>
            <Link
              key={7}
              className={`text-sm lg:text-lg ${
                isActiveLink(`/${currentLocale}/contact`)
                  ? "text-white underline underline-offset-8 decoration-white"
                  : "text-gray-300 hover:text-white"
              }`}
              href={`/contact`}
            >
              {t(`navbar9`)}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
