module.exports = {
  publicRuntimeConfig: {
    appName: process.env.APP_NAME,
    appDescription: process.env.APP_DESCRIPTION,
    appKeywords: process.env.APP_KEYWORDS,
    appUrl: process.env.APP_URL,
    timeZone: process.env.TIMEZONE
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: process.env.DEFAULT_LOCALE
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_HOSTNAME_PATTERN,
        port: "",
        pathname: "/**"
      }
    ]
  }
};
