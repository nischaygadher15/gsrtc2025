import type { Metadata } from "next";
import "./globals.css";
import DefaultNavbar from "../components/common/DefaultNavbar";
import FooterSection from "@/components/common/FooterSection";
import FooterNavbar from "@/components/common/FooterNavbar";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.webp",
  },
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
      <body>
        <DefaultNavbar />
        {children}
        <FooterSection />
        <FooterNavbar />
      </body>
    </html>
  );
}
