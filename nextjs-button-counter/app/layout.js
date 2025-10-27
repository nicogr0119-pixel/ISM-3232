import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load your chosen fonts (keep these if you like them)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Update metadata for your project
export const metadata = {
  title: "Next.js Button Counter",
  description: "A simple, accessible button counter built with Next.js App Router.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
