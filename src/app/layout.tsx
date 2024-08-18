import "../styles/global.css";
import "../styles/variables.css";
import "bigger-picture/css";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import getConfig from "next/config";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import Head from "next/head";

const { publicRuntimeConfig } = getConfig();

export const metadata: Metadata = {
  metadataBase: new URL(publicRuntimeConfig.appUrl),
  title: publicRuntimeConfig.appName,
  applicationName: publicRuntimeConfig.appName,
  description: publicRuntimeConfig.appDescription,
  authors: [
    { name: "Yohann THEPAUT (ythepaut)", url: "https://www.ythepaut.com" }
  ],
  creator: "Yohann THEPAUT (ythepaut)",
  keywords: publicRuntimeConfig.appKeywords,
  openGraph: {
    type: "website",
    url: publicRuntimeConfig.appUrl,
    title: publicRuntimeConfig.appName,
    description: publicRuntimeConfig.appDescription,
    images: ["/assets/banner.png"],
    siteName: publicRuntimeConfig.appName
  },
  twitter: {
    card: "summary_large_image",
    site: publicRuntimeConfig.appUrl,
    title: publicRuntimeConfig.appName,
    description: publicRuntimeConfig.appDescription,
    images: ["/assets/banner.png"]
  }
};

export default async function Layout({ children, params: { locale } }: { children: ReactNode, params: { locale: string } }) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <Head>
        <link rel="icon" href="/assets/favicon.svg" />
      </Head>
      <body>
        <NextIntlClientProvider
          locale={publicRuntimeConfig.locale}
          messages={messages}
          timeZone={publicRuntimeConfig.timeZone}
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
