"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import RandomGradientLogo from "@/app/[locale]/components/random-gradient-logo";
import { useTranslations } from "next-intl";

type NavbarInteractionsProps = {
  tags: { name: string }[];
  locale: string;
};

export default function NavbarInteractions({
  tags,
  locale,
}: NavbarInteractionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchUrl = `/${locale}/search?query=${encodeURIComponent(search)}`;
    window.location.href = searchUrl;
  };

  const t = useTranslations("HomePage");

  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="mr-32">
          <RandomGradientLogo />
        </div>
        <button
          className="sm:hidden text-gray-300 text-xl hover:text-white"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          ☰
        </button>
        {!isSearchVisible && (
          <button
            onClick={() => setIsSearchVisible(true)}
            className="text-gray-300 hover:text-white"
          >
            &#x1F50D;
          </button>
        )}
        {isSearchVisible && (
          <div className="relative transition-all duration-300 ease-in-out transform ml-20">
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

      {isDropdownOpen && (
        <div className="block sm:hidden space-y-2 py-4 mx-28">
          {tags.map((tag, idx) => (
            <Link
              key={idx}
              className="text-sm lg:text-lg capitalize text-gray-300 hover:text-white"
              href={`/${locale}/tag/${tag.name}`}
            >
              {tag.name}
            </Link>
          ))}
          <Link
            key={6}
            className="block text-lg text-gray-300 hover:text-white"
            href={`/${locale}/about`}
          >
            About
          </Link>
          <Link
            key={7}
            className="block text-lg text-gray-300 hover:text-white"
            href={`/${locale}/contact`}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}
