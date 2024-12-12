import { useTranslations } from "next-intl";

export default function SubscribeButton() {
  const t = useTranslations("HomePage");
  return (
    <button className="bg-slate-400 text-black font-bold py-3 px-8 md:mx-20 lg:mx-12 rounded-full hover:bg-white dark:hover:bg-white dark:hover:text-black duration-200 transition-colors mt-2 sm:mt-0">
      {t("subscribeButton")}
    </button>
  );
}
