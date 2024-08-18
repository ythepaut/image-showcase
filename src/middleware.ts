import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["fr", "en"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/:path", "/(en|fr)/:path*"]
};
