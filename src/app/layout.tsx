import "../styles/global.css";
import "../styles/variables.css";
import "bigger-picture/css";
import { NextIntlClientProvider } from "next-intl";
import { ReactElement, ReactNode } from "react";
import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";


export const metadata: Metadata = {
  metadataBase: new URL(process.env.appUrl ?? ""),
  title: process.env.appName,
  applicationName: process.env.appName,
  description: process.env.appDescription,
  authors: [
    { name: "Yohann THEPAUT (ythepaut)", url: "https://www.ythepaut.com" }
  ],
  creator: "Yohann THEPAUT (ythepaut)",
  keywords: process.env.appKeywords,
  openGraph: {
    type: "website",
    url: process.env.appUrl,
    title: process.env.appName,
    description: process.env.appDescription,
    images: ["/assets/banner.png"],
    siteName: process.env.appName
  },
  twitter: {
    card: "summary_large_image",
    site: process.env.appUrl,
    title: process.env.appName,
    description: process.env.appDescription,
    images: ["/assets/banner.png"]
  }
};

interface Props {
  children: ReactNode,
  modal: ReactNode
}

export default async function Layout({ children, modal }: Readonly<Props>): Promise<ReactElement> {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/assets/favicon.svg" />
        <title>{(metadata.title ?? "") as ReactNode}</title>
      </head>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone={process.env.timeZone}
        >
          {children}
          {modal}
          <div id="modal-root" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
