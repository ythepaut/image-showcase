import { ReactNode } from "react";
import { default as RootLayout } from "../layout";

export default async function Layout({ children, params: { locale } }: { children: ReactNode, params: { locale: string } }) {
  return RootLayout({ children, params: { locale } });
}
