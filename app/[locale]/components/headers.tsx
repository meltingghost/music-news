"use client";

import { useRandomGradient } from "@/app/hooks/useRandomGradient";
import { useTranslations } from "next-intl";

export function NewsHeader() {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">
          {t("newsHeader")}
        </h1>
        <h2 className="text-center text-2xl text-slate-100">
          {t("newsSubheader")}
        </h2>
      </div>
    </section>
  );
}

export function ReviewsHeader() {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">
          {t("reviewsHeader")}
        </h1>
        <h2 className="text-center text-2xl text-slate-100">
          {t("reviewsSubheader")}
        </h2>
      </div>
    </section>
  );
}

export function ReleasesHeader() {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">
          {t("newReleasesHeader")}
        </h1>
        <h2 className="text-center text-2xl text-slate-100">
          {t("newReleasesSubheader")}
        </h2>
      </div>
    </section>
  );
}

export function MiscHeader() {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">
          {t("miscelaneousHeader")}
        </h1>
        <h2 className="text-center text-2xl text-slate-100">
          {t("miscelaneousSubheader")}
        </h2>
      </div>
    </section>
  );
}

export function FeaturesHeader() {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">
          {t("featuresHeader")}
        </h1>
        <h2 className="text-center text-2xl text-slate-100">
          {t("featuresSubheader")}
        </h2>
      </div>
    </section>
  );
}

export function ListsHeader() {
  const t = useTranslations("HomePage");
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">
          {t("listsHeader")}
        </h1>
        <h2 className="text-center text-2xl text-slate-100">
          {t("listsSubheader")}
        </h2>
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
