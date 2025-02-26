import type { Metadata } from "next";
import { Nunito, Vazirmatn } from "next/font/google";
import { use } from "react";
import { i18n, Locale } from "../../../i18next.config";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "realmehrshad.ir",
  description: "personal blog of mehrshad moradi",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = use(params);
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={` ${vazirmatn.variable} ${nunito.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
