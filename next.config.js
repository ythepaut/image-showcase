const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    appName: process.env.APP_NAME ?? "Image Showcase",
    appDescription: process.env.APP_DESCRIPTION ?? "An image gallery",
    appKeywords: process.env.APP_KEYWORDS ?? "image, gallery, showcase",
    appUrl: process.env.APP_URL,
    timeZone: process.env.TIMEZONE ?? "UTC"
  },
  reactStrictMode: true,
  swcMinify: true,
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

module.exports = withNextIntl(nextConfig);
