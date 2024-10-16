import Container from "./container";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("HomePage");
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-10 flex flex-col lg:flex-row justify-between items-center">
          <div className="text-center lg:text-left lg:w-1/3 mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t("aboutTitle")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{t("about")}</p>
          </div>

          <div className="lg:w-1/3 flex justify-center space-x-6 mb-6 lg:mb-0">
            <a
              href="https://twitter.com/yourprofile"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com/yourprofile"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/yourprofile"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              Instagram
            </a>
          </div>

          <div className="lg:w-1/3 flex justify-center lg:justify-end">
            <a
              href="https://github.com/meltingghost/music-news"
              className="border-solid border-2 border-white font-bold mb-10 hover:bg-white hover:text-black text-white px-5 py-2 rounded-full duration-200 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
