import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script'
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bhushan Maheshwari",
  description: "Portfolio of work experience, products of Bhushan Maheshwari",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


        {children}
      </body>
      <GoogleAnalytics gaId="G-NL2MS6T21V" />
    </html>
  );
}
