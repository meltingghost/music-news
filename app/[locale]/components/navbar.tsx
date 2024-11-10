"use client";

import { Link, routing } from "@/i18n/routing";
import { useState } from "react";
import RandomGradientLogo from "./random-gradient-logo";
import LocalizationDropdown from "./localization-dropdown";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [search, setSearch] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const pathname = usePathname();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", search);
  };

  const currentLocale = pathname.split("/")[1] || "en";

  const isActiveLink = (href: string) => {
    const localizedHref = `/${routing.defaultLocale}${href}`;
    const activeHref = pathname === href || pathname === localizedHref;
    return activeHref;
  };

  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col">
      <nav className="bg-black shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <RandomGradientLogo />
            </div>

            <div className="flex items-center space-x-4">
              {!isSearchVisible && (
                <button
                  onClick={() => setIsSearchVisible(true)}
                  className="text-gray-300 hover:text-white"
                >
                  &#x1F50D;
                </button>
              )}

              {isSearchVisible && (
                <div
                  className={`relative transition-all duration-300 ease-in-out transform ${
                    isSearchVisible
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0"
                  }`}
                >
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

            <div className="flex items-center space-x-4">
              <LocalizationDropdown />
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-slate-400 border-white text-black dark:text-white font-bold py-3 px-8 rounded-full hover:bg-white dark:hover:bg-white dark:hover:text-black duration-200 transition-colors">
                {t("subscribeButton")}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-black shadow-md sticky top-0 z-50 border-t border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="hidden md:flex space-x-8">
              <Link
                className={`text-lg ${
                  isActiveLink(`/${currentLocale}/category/news`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href="/category/news"
              >
                {t("navbar1")}
              </Link>
              <Link
                className={`text-lg ${
                  isActiveLink(`/${currentLocale}/category/reviews`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href="/category/reviews"
              >
                {t("navbar2")}
              </Link>
              <Link
                className={`text-lg ${
                  isActiveLink(`/${currentLocale}/category/new-releases`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href="/category/new-releases"
              >
                {t("navbar3")}
              </Link>
              <Link
                className={`text-lg ${
                  isActiveLink(`/${currentLocale}/category/features`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href="/category/features"
              >
                {t("navbar4")}
              </Link>
              <Link
                className={`text-lg ${
                  isActiveLink(`/${currentLocale}/category/lists`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href="/category/lists"
              >
                {t("navbar5")}
              </Link>
              <Link
                className={`text-lg ${
                  isActiveLink(`/${currentLocale}/category/miscelaneous`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href="/category/miscelaneous"
              >
                {t("navbar6")}
              </Link>
              <Link
                className={`text-lg ${
                  isActiveLink(`/${currentLocale}/category/about`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href="/about"
              >
                {t("navbar7")}
              </Link>
              <Link
                className={`text-lg ${
                  isActiveLink(`/${currentLocale}/category/contact`)
                    ? "text-white underline underline-offset-8 decoration-white"
                    : "text-gray-300 hover:text-white"
                }`}
                href="/contact"
              >
                {t("navbar8")}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
