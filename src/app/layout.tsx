import type { Metadata } from "next";
import "@/styles/globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { fontIRANYekan } from "@/constants/fonts";
import { siteConfig } from "@/config/site";
import { twMerge } from "tailwind-merge";
import "leaflet/dist/leaflet.css";
import { Toast } from "@/components/element/Toast";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning
        className={twMerge(
          "min-h-screen bg-background font-sans antialiased",
          fontIRANYekan.variable
        )}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toast />
      </body>
    </html>
  );
}
