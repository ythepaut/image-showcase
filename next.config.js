const withNextIntl = require("next-intl/plugin")();

/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    appName: process.env.APP_NAME ?? "Image Showcase",
    appDescription: process.env.APP_DESCRIPTION ?? "An image gallery",
    appKeywords: process.env.APP_KEYWORDS ?? "image, gallery, showcase",
    appUrl: process.env.APP_URL,
    imagesUrl: process.env.IMAGES_URL,
    timeZone: process.env.TIMEZONE ?? "UTC"
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: process.env.IMAGE_HOSTNAME_PATTERNS.split(/\s*,\s*/).map(pattern => ({
      protocol: "https",
      hostname: pattern,
      pathname: "/**"
    }))
  }
};

module.exports = withNextIntl(nextConfig);
