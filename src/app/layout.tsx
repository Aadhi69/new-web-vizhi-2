import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import CookieConsent from "@/components/CookieConsent";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://vizhi.tech"),
  title: "Vizhi | The Future of Spatial Intelligence",
  description:
    "Vizhi is building a next-generation computing platform where digital intelligence integrates seamlessly with human perception through advanced AR hardware.",
  keywords: [
    "AR",
    "Augmented Reality",
    "Spatial Computing",
    "XR",
    "Artificial Intelligence",
    "Vizhi",
    "Future Tech",
  ],
  authors: [{ name: "Vizhi Team" }],
  openGraph: {
    title: "Vizhi | The Future of Spatial Intelligence",
    description:
      "Experience the next interface for human intelligence. Seamless AR integration for the physical world.",
    url: "https://vizhi.tech",
    siteName: "Vizhi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vizhi XR Glasses - Spatial Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizhi | The Future of Spatial Intelligence",
    description:
      "Turning the world into your interface. The next leap in human-computer interaction.",
    images: ["/og-image.png"],
    creator: "@vizhi_xr",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", "font-sans")}
      suppressHydrationWarning
    >
      <body
        className="antialiased bg-[#050505] text-white selection:bg-[#00e5ff] selection:text-black"
        suppressHydrationWarning
      >
        <SmoothScrolling>{children}</SmoothScrolling>
        <CookieConsent />
      </body>
    </html>
  );
}
