import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "SoftMind Solutions | AI SaaS & Custom Software Development Company",
  description:
    "Expert AI SaaS development for startups and enterprises. Build secure, scalable AI applications faster. Get a free consultation today.",
  icons: {
    icon: "/images/favicon.svg",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotWidget from "@/components/layout/ChatbotWidget";
import { RouteLoader } from "@/components/customs/routeLoader";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-white selection:bg-green selection:text-white"
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <Navbar />
        <RouteLoader />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
