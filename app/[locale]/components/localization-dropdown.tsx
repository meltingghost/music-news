"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Tag = {
  name: string;
  translations: { en: string; es: string };
};

export default function LocalizationDropdown() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] || "en";
  const [language, setLanguage] = useState<string>(currentLocale);
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

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

  const handleLocaleChange = (newLocale: string) => {
    const isTagPage = pathname.includes("/tag/");
    const currentTag = decodeURIComponent(
      pathname.split("/tag/")[1]?.split("/")[0] || ""
    );

    if (isTagPage && currentTag) {
      if (tags.length === 0) {
        console.warn("Tags not loaded yet. Please wait.");
        return;
      }

      const tagTranslation = tags.find(
        (tag) => tag.translations[currentLocale as "en" | "es"] === currentTag
      );

      if (tagTranslation) {
        const newTag = tagTranslation.translations[newLocale as "en" | "es"];
        const encodedCurrentTag = encodeURIComponent(currentTag);
        const newPathname = pathname
          .replace(`/${currentLocale}/`, `/${newLocale}/`)
          .replace(
            `/tag/${encodedCurrentTag}`,
            `/tag/${encodeURIComponent(newTag)}`
          );
        router.push(newPathname);
        console.log("Nuevo Pathname:", newPathname);

        return;
      } else {
        console.error(
          "No matching tag translation found for:",
          currentTag,
          "in locale:",
          currentLocale
        );
      }
    }

    let newPath = pathname;

    if (currentLocale === "en" || currentLocale === "es") {
      newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${pathname}`;
    }

    const searchParamsString = searchParams.toString();
    const newUrl = searchParamsString
      ? `${newPath}?${searchParamsString}`
      : newPath;

    router.replace(newUrl);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const languages = [
    { code: "en", label: "English (en)" },
    { code: "es", label: "Español (es)" },
  ];

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
        <span className="ml-2">▼ 🌐</span>
      </div>

      {isOpen && (
        <ul className="absolute mt-1 border border-gray-300 rounded w-full bg-white z-50">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                lang.code === language ? "font-bold" : ""
              }`}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
                handleLocaleChange(lang.code);
              }}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
