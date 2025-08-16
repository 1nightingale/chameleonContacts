
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import * as React from "react";
import MuiThemeClientProvider from "./MuiThemeClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chemeleon Contacts",
  description: "an idea by Tim Nightingale",
  icons: {
    icon: "/chameleonContacts.svg",
  },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MuiThemeClientProvider>
          {children}
        </MuiThemeClientProvider>
      </body>
    </html>
  );
}
