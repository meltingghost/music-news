"use client";

import { useRandomGradient } from "@/app/hooks/useRandomGradient";
import { useTranslations } from "next-intl";

interface TagHeaderProps {
  tag: string | string[];
}

interface QueryHeaderProps {
  query: string;
}

export function TagHeader({ tag }: TagHeaderProps) {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-14 text-white">
        <h1 className="text-center text-6xl text-slate-100 capitalize">
          {t("tagResult")}"
          {decodeURIComponent(Array.isArray(tag) ? tag.join(" ") : tag)}"
        </h1>
      </div>
    </section>
  );
}

export function SearchHeader({ query }: QueryHeaderProps) {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-14 text-white">
        <h1 className="text-slate-100 capitalize text-5xl mb-9 text-center">
          {t("searchResult")}"{query}"
        </h1>
      </div>
    </section>
  );
}

export function AboutHeader() {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">
          {t("aboutHeader")}
        </h1>
        <h2 className="text-center text-2xl text-slate-100">
          {t("aboutSubheader")}
        </h2>
      </div>
    </section>
  );
}

export function ContactHeader() {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">
          {t("contactHeader")}
        </h1>
        <h2 className="text-center text-2xl text-slate-100">
          {t("contactSubheader")}
        </h2>
      </div>
    </section>
  );
}
