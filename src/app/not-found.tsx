import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NotFoundPage() {
  const t = await getTranslations("not-found");
  return (
    <div className="h-screen flex flex-col items-center justify-center place-content-center text-center">
      <ExclamationCircleIcon className="w-12 h-12 text-red" />
      <h1 className="mt-4 text-2xl font-semibold text-txt" data-testid="not-found-message">{t("message")}</h1>
      <Link
        type="button"
        className="mt-8 rounded-100 bg-blue-soft px-4 py-2 text-xs font-medium text-blue-dark hover:bg-blue-dark hover:text-txt-white transition-colors"
        href="/"
      >
        {t("back-to-home")}
      </Link>
    </div>
  );
}
