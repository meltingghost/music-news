"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", search);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              className="text-3xl font-bold text-gray-900 hover:text-gray-700"
              href="/"
            >
              MusicBlog
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              className="text-lg text-gray-800 hover:text-gray-600"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-lg text-gray-800 hover:text-gray-600"
              href="/news"
            >
              News
            </Link>
            <Link
              className="text-lg text-gray-800 hover:text-gray-600"
              href="/reviews"
            >
              Reviews
            </Link>
            <Link
              className="text-lg text-gray-800 hover:text-gray-600"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-lg text-gray-800 hover:text-gray-600"
              href="/contact"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                &#x1F50D;
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
