"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";

type NavbarInteractionsProps = {
  tags: { name: string }[];
  locale: string;
};

export default function NavbarInteractions({
  tags,
  locale,
}: NavbarInteractionsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <button
        className="sm:hidden text-gray-300 text-xl hover:text-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        ☰
      </button>
      {isDropdownOpen && (
        <div className="block sm:hidden space-y-2 py-4">
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
