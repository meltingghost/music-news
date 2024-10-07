import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Locale = "en" | "es";

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
