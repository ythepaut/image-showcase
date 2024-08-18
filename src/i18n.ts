import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["fr", "en"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    return notFound();
  }

  return {
    messages: (await import(`../lang/${locale}.json`)).default,
  };
});
