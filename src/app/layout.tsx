import type { Metadata } from "next";
import "./globals.css";
import DefaultNavbar from "../components/common/DefaultNavbar";
import FooterSection from "@/components/common/FooterSection";
import FooterNavbar from "@/components/common/FooterNavbar";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReduxProvider from "@/lib/providers/reduxProvider";

export const metadata: Metadata = {
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
        <script src="https://www.google.com/recaptcha/api.js?render=explicit" />
        <ReduxProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            {/* Toaster */}
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toasterId="default"
              toastOptions={{
                // Define default options
                className: "",
                duration: 5000,
                removeDelay: 1000,
                style: {
                  background: "#ffffff",
                  color: "#000000",
                },

                // Default options for specific types
                success: {
                  duration: 5000,
                  iconTheme: {
                    primary: "green",
                    secondary: "white",
                  },
                },
              }}
            />

            <DefaultNavbar />
            {children}
            <Analytics />
            <FooterSection />
            <FooterNavbar />
          </GoogleOAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
