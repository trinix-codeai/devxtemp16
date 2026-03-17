import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/store/provider";

export const metadata: Metadata = {
  title: "LocalXplore | White-label Travel Platform",
  description: "Warm, premium white-label travel experience for local businesses.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
