import "../styles/global.css";
import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import React from "react";
import { AppProps } from "next/app";
import getConfig from "next/config";


const { publicRuntimeConfig } = getConfig();

export const metadata: Metadata = {
  metadataBase: new URL(publicRuntimeConfig.appUrl),
  title: publicRuntimeConfig.appName,
  applicationName: publicRuntimeConfig.appName,
  description: publicRuntimeConfig.appDescription,
  authors: [{ name: "Yohann THEPAUT (ythepaut)", url: "https://www.ythepaut.com" }],
  creator: "Yohann THEPAUT (ythepaut)",
  keywords: publicRuntimeConfig.appKeywords,
  openGraph: {
    type: "website",
    url: publicRuntimeConfig.appUrl,
    title: publicRuntimeConfig.appName,
    description: publicRuntimeConfig.appDescription,
    images: ["/assets/banner.png"]
  },
  twitter: {
    card: "summary_large_image",
    site: publicRuntimeConfig.appUrl,
    title: publicRuntimeConfig.appName,
    description: publicRuntimeConfig.appDescription,
    images: ["/assets/banner.png"]
  }
};

export default function App({ Component, pageProps, router }: AppProps) {
  const { publicRuntimeConfig } = getConfig();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone={publicRuntimeConfig.timeZone}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
