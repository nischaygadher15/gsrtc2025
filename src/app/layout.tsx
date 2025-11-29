import type { Metadata } from "next";
import "./globals.css";
import DefaultNavbar from "../components/common/DefaultNavbar";
import FooterSection from "@/components/common/FooterSection";
import FooterNavbar from "@/components/common/FooterNavbar";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

export const metadata: Metadata = {
  // icons: {
  //   icon: "/favicon.webp",
  // },
  title: {
    default: "Gujarat State Road Transport Corporation(GSRTC)",
    template: "%s | GSRTC",
  },
  description: "GSRTC Made in India App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white z-0">
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
        />
        <DefaultNavbar />
        {children}
        <Analytics />
        <FooterSection />
        <FooterNavbar />
      </body>
    </html>
  );
}
