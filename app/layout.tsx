import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Russo_One } from 'next/font/google'

const russo = Russo_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-russo'
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Team Watch",
  description: "Track your favorite teams' records and upcoming games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${russo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
