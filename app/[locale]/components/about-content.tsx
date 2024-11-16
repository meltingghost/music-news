import { useTranslations } from "next-intl";

export default function AboutHeader() {
  const t = useTranslations("HomePage");
  return (
    <div className="py-11">
      <h1 className="text-6xl">{t("aboutPageTitle")}</h1>
      <p className="text-2xl my-8">{t("about1")}</p>
      <p className="text-2xl my-8">{t("about2")}</p>
      <p className="text-2xl my-8">{t("about3")}</p>
      <p className="text-2xl my-8">{t("about4")}</p>
      <p className="text-2xl my-8">{t("about5")}</p>
    </div>
  );
}
