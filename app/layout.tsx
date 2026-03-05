import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "@/public/assets/css/globals.css";
import { ThemeProvider } from "next-themes";
import MacDoc from "@/components/elements/MacDoc";
import Header from "@/components/layout/header/Header";
import SmoothScroll from "@/components/elements/SmoothScroll";
import PreloaderProvider from "@/components/providers/PreloaderProvider";

const GeneralSans = localFont({
  src: [
    {
      path: "../public/assets/fonts/GeneralSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/GeneralSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/GeneralSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/GeneralSans-Bold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamza | Protfolio",
  description: "Muhammad Hamza Protfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeneralSans.variable} ${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system" storageKey="theme">
          <PreloaderProvider>
            <SmoothScroll />
            <Header />
            <div id="smooth-wrapper">
              <div id="smooth-content">{children}</div>
            </div>
            <MacDoc />
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
