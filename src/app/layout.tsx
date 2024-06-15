import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Red Planet Quest",
  description:
    "Welcome to RedPlanetQuest, your gateway to the ultimate adventure of a lifetime – a visit to Mars! Our multi-stage application form is designed to gather all the necessary details and preferences from aspiring Martian travelers. Whether you're a seasoned space enthusiast or a curious explorer, RedPlanetQuest offers a seamless and engaging application process to help you prepare for this extraordinary journey. Begin your quest today and take the first step towards exploring the Red Planet!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
