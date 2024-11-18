import { useTranslations } from "next-intl";

export default function ContactHeader() {
  const t = useTranslations("HomePage");
  return (
    <div className="py-16 px-32">
      <p className="text-2xl">
        <strong>{t("editorName")}</strong>
      </p>
      <a
        href="mailto:emiliodavidcc@gmail.com"
        className="text-xl mt-2 underline hover:no-underline"
      >
        {t("editorEmail")}
      </a>

      <p className="text-xl mt-10">
        <em>{t("contactNotice")}</em>
      </p>
    </div>
  );
}
