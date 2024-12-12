import { fetchTags } from "@/app/lib/fetches";
import { Locale } from "@/app/[locale]/components/posts-logic";
import LocalizationDropdown from "@/app/[locale]/components/localization-dropdown";
import NavbarInteractions from "@/app/[locale]/components/navbar-logic";
import SubscribeButton from "@/app/[locale]/components/subscribe-button";
import NavbarButtons from "@/app/[locale]/components/navbar-buttons";

type NavbarProps = {
  locale: Locale;
};

export default async function Navbar({ locale }: NavbarProps) {
  const tags = await fetchTags(locale);

  return (
    <div className="flex flex-col">
      <div className="bg-black lg:flex lg:flex-row lg:justify-evenly shadow-md sticky top-0 z-50 gap-4 flex flex-col sm:flex-row items-center px-4 py-2 sm:px-6 lg:px-8">
        <NavbarInteractions tags={tags} locale={locale} />
        <LocalizationDropdown />
        <SubscribeButton />
      </div>

      <nav className="bg-black shadow-md sticky top-0 z-40 border-t border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavbarButtons locale={locale} tags={tags} />
        </div>
      </nav>
    </div>
  );
}
