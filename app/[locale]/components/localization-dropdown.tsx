"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function LocalizationDropdown() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] || "en";
  const [language, setLanguage] = useState<string>(currentLocale);

  function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedLocale = event.target.value;
    setLanguage(selectedLocale);

    let newPath = pathname;

    if (currentLocale === "en" || currentLocale === "es") {
      newPath = pathname.replace(`/${currentLocale}`, `/${selectedLocale}`);
    } else {
      newPath = `/${selectedLocale}${pathname}`;
    }

    router.replace(newPath);
  }

  return (
    <div className="flex items-center space-x-4">
      <h5>Localization</h5>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="border border-gray-300 rounded p-2"
      >
        <option value="en">English (en)</option>
        <option value="es">Español (es)</option>
      </select>
    </div>
  );
}
