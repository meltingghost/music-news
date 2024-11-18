"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LocalizationDropdown() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] || "en";
  const [language, setLanguage] = useState<string>(currentLocale);
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English (en)" },
    { code: "es", label: "Español (es)" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function handleLanguageChange(code: string) {
    const selectedLocale = code;
    setLanguage(selectedLocale);
    setIsOpen(false);

    let newPath = pathname;

    if (currentLocale === "en" || currentLocale === "es") {
      newPath = pathname.replace(`/${currentLocale}`, `/${selectedLocale}`);
    } else {
      newPath = `/${selectedLocale}${pathname}`;
    }

    router.replace(newPath);
  }

  const t = useTranslations("HomePage");

  return (
    <div className="relative inline-block text-left bg-white rounded-md">
      <div
        className="border border-gray-300 p-2 rounded-md cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        <span>
          {t("dropdown")}({language})
        </span>
        <span className="ml-2">▼</span>
      </div>

      {isOpen && (
        <ul className="absolute mt-1 border border-gray-300 rounded w-full bg-white z-50">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                lang.code === language ? "font-bold" : ""
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
